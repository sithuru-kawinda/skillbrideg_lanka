package com.SpringbootProject.SeekerService.Service.Impl;

import com.SpringbootProject.SeekerService.Mapper.SeekerDTOEntityMapper;
import com.SpringbootProject.SeekerService.SeekerDTO.AuthRegRequest;
import com.SpringbootProject.SeekerService.SeekerDTO.SeekerDTO;
import com.SpringbootProject.SeekerService.SeekerEntity.SeekerEntity;
import com.SpringbootProject.SeekerService.Service.Serviceimpl;
import com.SpringbootProject.SeekerService.ServiceRepo.Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class impl implements Serviceimpl {
    
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    Repo reqrepo;

    @Override
    public SeekerDTO createSeeker(SeekerDTO seekerDTO) {
        try {
            System.out.println("=== STARTING SEEKER REGISTRATION ===");
            System.out.println("Seeker DTO received: " + seekerDTO);
            
            // 1️⃣ Call AuthService to register credentials in auth database
            AuthRegRequest authRequest = new AuthRegRequest(
                seekerDTO.getEmail(),
                seekerDTO.getPassword(),
                "SEEKER"
            );

            System.out.println("Auth request: " + authRequest);
            
            String authServiceUrl = "http://localhost:8082/api/auth/register";
            System.out.println("Calling Auth Service: " + authServiceUrl);
            
            ResponseEntity<Long> response = restTemplate.postForEntity(authServiceUrl, authRequest, Long.class);
            Long authId = response.getBody();
            
            System.out.println("Auth Service Response - Status: " + response.getStatusCode());
            System.out.println("Auth Service Response - Auth ID: " + authId);

            if (authId == null) {
                throw new RuntimeException("Failed to get Auth ID from authentication service");
            }

            // 2️⃣ Map DTO → Entity and set authId
            SeekerEntity entity = SeekerDTOEntityMapper.map(seekerDTO);
            entity.setAuthID(authId);
            
            System.out.println("Seeker Entity before save: " + entity);

            // 3️⃣ Save seeker profile in SeekerService database
            SeekerEntity savedEntity = reqrepo.save(entity);
            
            System.out.println("Seeker Entity after save: " + savedEntity);
            System.out.println("Seeker saved successfully with ID: " + savedEntity.getId());

            // 4️⃣ Map Entity → DTO and return
            SeekerDTO result = SeekerDTOEntityMapper.map(savedEntity);
            System.out.println("Final DTO to return: " + result);
            System.out.println("=== SEEKER REGISTRATION COMPLETED ===");
            
            return result;

        } catch (Exception e) {
            System.err.println("=== SEEKER REGISTRATION FAILED ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Seeker registration failed: " + e.getMessage());
        }
    }

    @Override
    public SeekerDTO getSeekerById(Long id) {
        try {
            System.out.println("Fetching seeker by ID: " + id);
            Optional<SeekerEntity> seekerEntity = reqrepo.findById(id);

            if (seekerEntity.isPresent()) {
                SeekerDTO result = SeekerDTOEntityMapper.map(seekerEntity.get());
                System.out.println("Seeker found: " + result);
                return result;
            } else {
                System.err.println("Seeker not found with id: " + id);
                throw new RuntimeException("Seeker not found with id: " + id);
            }
        } catch (Exception e) {
            System.err.println("Error fetching seeker by ID: " + e.getMessage());
            throw new RuntimeException("Error fetching seeker: " + e.getMessage());
        }
    }

    @Override
    public List<SeekerDTO> getAllSeekers() {
        try {
            List<SeekerEntity> entities = reqrepo.findAll();
            System.out.println("Found " + entities.size() + " seekers in database");
            
            List<SeekerDTO> result = entities.stream()
                    .map(SeekerDTOEntityMapper::map)
                    .toList();
            
            System.out.println("Returning " + result.size() + " seekers");
            return result;
        } catch (Exception e) {
            System.err.println("Error fetching all seekers: " + e.getMessage());
            throw new RuntimeException("Error fetching seekers: " + e.getMessage());
        }
    }

    @Override
    public SeekerDTO getSeekerByAuthId(Long authId) {
        try {
            System.out.println("Fetching seeker by Auth ID: " + authId);
            Optional<SeekerEntity> seekerEntity = reqrepo.findByAuthID(authId);

            if (seekerEntity.isPresent()) {
                SeekerDTO result = SeekerDTOEntityMapper.map(seekerEntity.get());
                System.out.println("Seeker found by auth ID: " + result);
                return result;
            } else {
                System.err.println("Seeker not found with auth ID: " + authId);
                throw new RuntimeException("Seeker not found with auth ID: " + authId);
            }
        } catch (Exception e) {
            System.err.println("Error fetching seeker by auth ID: " + e.getMessage());
            throw new RuntimeException("Error fetching seeker: " + e.getMessage());
        }
    }

    @Override
    public SeekerDTO updateSeeker(Long id, SeekerDTO seekerDTO) {
        try {
            System.out.println("Updating seeker with ID: " + id);
            System.out.println("Update data: " + seekerDTO);
            
            Optional<SeekerEntity> existingSeeker = reqrepo.findById(id);
            
            if (existingSeeker.isPresent()) {
                SeekerEntity entity = existingSeeker.get();
                
                // Update fields
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
                
                SeekerEntity updatedEntity = reqrepo.save(entity);
                SeekerDTO result = SeekerDTOEntityMapper.map(updatedEntity);
                
                System.out.println("Seeker updated successfully: " + result);
                return result;
            } else {
                System.err.println("Seeker not found for update with id: " + id);
                throw new RuntimeException("Seeker not found with id: " + id);
            }
        } catch (Exception e) {
            System.err.println("Error updating seeker: " + e.getMessage());
            throw new RuntimeException("Error updating seeker: " + e.getMessage());
        }
    }

    @Override
    public void deleteSeeker(Long id) {
        try {
            System.out.println("Deleting seeker with ID: " + id);
            
            if (reqrepo.existsById(id)) {
                reqrepo.deleteById(id);
                System.out.println("Seeker deleted successfully with ID: " + id);
            } else {
                System.err.println("Seeker not found for deletion with id: " + id);
                throw new RuntimeException("Seeker not found with id: " + id);
            }
        } catch (Exception e) {
            System.err.println("Error deleting seeker: " + e.getMessage());
            throw new RuntimeException("Error deleting seeker: " + e.getMessage());
        }
    }

    @Override
    public SeekerDTO getSeekerByEmail(String email) {
        try {
            System.out.println("Fetching seeker by email: " + email);
            Optional<SeekerEntity> seekerEntity = reqrepo.findByEmail(email);

            if (seekerEntity.isPresent()) {
                SeekerDTO result = SeekerDTOEntityMapper.map(seekerEntity.get());
                System.out.println("Seeker found by email: " + result);
                return result;
            } else {
                System.err.println("Seeker not found with email: " + email);
                throw new RuntimeException("Seeker not found with email: " + email);
            }
        } catch (Exception e) {
            System.err.println("Error fetching seeker by email: " + e.getMessage());
            throw new RuntimeException("Error fetching seeker: " + e.getMessage());
        }
    }
}