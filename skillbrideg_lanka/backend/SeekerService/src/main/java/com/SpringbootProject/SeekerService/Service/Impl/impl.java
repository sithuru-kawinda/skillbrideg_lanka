package com.SpringbootProject.SeekerService.Service.Impl;

import com.SpringbootProject.SeekerService.Exception.AuthServiceException;
import com.SpringbootProject.SeekerService.Exception.DuplicateSeekerException;
import com.SpringbootProject.SeekerService.Exception.SeekerNotFoundException;
import com.SpringbootProject.SeekerService.Mapper.SeekerDTOEntityMapper;
import com.SpringbootProject.SeekerService.SeekerDTO.AuthRegRequest;
import com.SpringbootProject.SeekerService.SeekerDTO.SeekerDTO;
import com.SpringbootProject.SeekerService.SeekerEntity.SeekerEntity;
import com.SpringbootProject.SeekerService.Service.Serviceimpl;
import com.SpringbootProject.SeekerService.ServiceRepo.Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class impl implements Serviceimpl {
    
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    Repo reqrepo;

    @Override
    public SeekerDTO createSeeker(SeekerDTO seekerDTO) {
        System.out.println("=== STARTING SEEKER REGISTRATION ===");
        System.out.println("Seeker DTO received: " + seekerDTO);

        // 0️⃣ Reject local duplicates before touching Authentication-Service, so a
        // duplicate nic/email never leaves an orphaned auth account behind.
        if (reqrepo.findByEmail(seekerDTO.getEmail()).isPresent()) {
            throw new DuplicateSeekerException("Email already registered: " + seekerDTO.getEmail());
        }
        if (reqrepo.findByNic(seekerDTO.getNic()).isPresent()) {
            throw new DuplicateSeekerException("NIC already registered: " + seekerDTO.getNic());
        }

        // 1️⃣ Call AuthService to register credentials in auth database
        AuthRegRequest authRequest = new AuthRegRequest(
            seekerDTO.getEmail(),
            seekerDTO.getPassword(),
            "SEEKER"
        );

        System.out.println("Auth request: " + authRequest);

        String authServiceUrl = "http://localhost:8082/api/auth/register";
        System.out.println("Calling Auth Service: " + authServiceUrl);

        Long authId;
        try {
            ResponseEntity<Long> response = restTemplate.postForEntity(authServiceUrl, authRequest, Long.class);
            authId = response.getBody();
            System.out.println("Auth Service Response - Status: " + response.getStatusCode());
            System.out.println("Auth Service Response - Auth ID: " + authId);
        } catch (HttpStatusCodeException e) {
            // Surface Auth-Service's real error text (e.g. "Email already taken")
            // instead of a generic RestTemplate message.
            System.err.println("Auth Service rejected registration: " + e.getResponseBodyAsString());
            throw new AuthServiceException(e.getResponseBodyAsString(), e);
        } catch (ResourceAccessException e) {
            System.err.println("Auth Service unreachable: " + e.getMessage());
            throw new AuthServiceException("Authentication service is unavailable", e);
        }

        if (authId == null) {
            throw new AuthServiceException("Failed to get Auth ID from authentication service");
        }

        // 2️⃣ Map DTO → Entity and set authId
        SeekerEntity entity = SeekerDTOEntityMapper.map(seekerDTO);
        entity.setAuthID(authId);

        System.out.println("Seeker Entity before save: " + entity);

        // 3️⃣ Save seeker profile in SeekerService database
        SeekerEntity savedEntity;
        try {
            savedEntity = reqrepo.save(entity);
        } catch (DataIntegrityViolationException e) {
            // A concurrent request raced past the checks above. The auth account
            // at authId is now orphaned (no compensating delete endpoint exists
            // on Authentication-Service to clean it up).
            System.err.println("Duplicate seeker race for authId " + authId + ": " + e.getMessage());
            throw new DuplicateSeekerException("Email or NIC already registered");
        }

        System.out.println("Seeker Entity after save: " + savedEntity);
        System.out.println("Seeker saved successfully with ID: " + savedEntity.getId());

        // 4️⃣ Map Entity → DTO and return
        SeekerDTO result = SeekerDTOEntityMapper.map(savedEntity);
        System.out.println("Final DTO to return: " + result);
        System.out.println("=== SEEKER REGISTRATION COMPLETED ===");

        return result;
    }

    @Override
    public SeekerDTO getSeekerById(Long id) {
        System.out.println("Fetching seeker by ID: " + id);
        SeekerEntity seekerEntity = reqrepo.findById(id)
                .orElseThrow(() -> new SeekerNotFoundException("Seeker not found with id: " + id));
        return SeekerDTOEntityMapper.map(seekerEntity);
    }

    @Override
    public List<SeekerDTO> getAllSeekers() {
        List<SeekerEntity> entities = reqrepo.findAll();
        System.out.println("Found " + entities.size() + " seekers in database");
        return entities.stream()
                .map(SeekerDTOEntityMapper::map)
                .toList();
    }

    @Override
    public SeekerDTO getSeekerByAuthId(Long authId) {
        System.out.println("Fetching seeker by Auth ID: " + authId);
        SeekerEntity seekerEntity = reqrepo.findByAuthID(authId)
                .orElseThrow(() -> new SeekerNotFoundException("Seeker not found with auth ID: " + authId));
        return SeekerDTOEntityMapper.map(seekerEntity);
    }

    @Override
    public SeekerDTO updateSeeker(Long id, SeekerDTO seekerDTO) {
        System.out.println("Updating seeker with ID: " + id);
        System.out.println("Update data: " + seekerDTO);

        SeekerEntity entity = reqrepo.findById(id)
                .orElseThrow(() -> new SeekerNotFoundException("Seeker not found with id: " + id));

        if (seekerDTO.getFullName() != null) {
            entity.setFullName(seekerDTO.getFullName());
        }
        if (seekerDTO.getEmail() != null) {
            entity.setEmail(seekerDTO.getEmail());
        }
        if (seekerDTO.getNic() != null) {
            entity.setNic(seekerDTO.getNic());
        }
        if (seekerDTO.getPhoneNumber() != null) {
            entity.setPhoneNumber(seekerDTO.getPhoneNumber());
        }
        if (seekerDTO.getQualification() != null) {
            entity.setQualification(seekerDTO.getQualification());
        }

        try {
            SeekerEntity updatedEntity = reqrepo.save(entity);
            SeekerDTO result = SeekerDTOEntityMapper.map(updatedEntity);
            System.out.println("Seeker updated successfully: " + result);
            return result;
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateSeekerException("Email or NIC already registered to another seeker");
        }
    }

    @Override
    public void deleteSeeker(Long id) {
        System.out.println("Deleting seeker with ID: " + id);
        if (!reqrepo.existsById(id)) {
            throw new SeekerNotFoundException("Seeker not found with id: " + id);
        }
        reqrepo.deleteById(id);
        System.out.println("Seeker deleted successfully with ID: " + id);
    }

    @Override
    public SeekerDTO getSeekerByEmail(String email) {
        System.out.println("Fetching seeker by email: " + email);
        SeekerEntity seekerEntity = reqrepo.findByEmail(email)
                .orElseThrow(() -> new SeekerNotFoundException("Seeker not found with email: " + email));
        return SeekerDTOEntityMapper.map(seekerEntity);
    }
}