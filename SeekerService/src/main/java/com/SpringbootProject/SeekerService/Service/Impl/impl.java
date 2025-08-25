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

@Service
public class impl implements Serviceimpl {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    Repo reqrepo;

    @Override
    public SeekerDTO createSeeker(SeekerDTO seekerDTO) {
        AuthRegRequest authRequest = new AuthRegRequest(
                seekerDTO.getEmail(),
                seekerDTO.getPassword()
                , // or get from recruiterDTO if you allow password
                "SEEKER"
        );

        String authServiceUrl = "http://localhost:8082/api/auth/register";
        ResponseEntity<Long> response = restTemplate.postForEntity(authServiceUrl, authRequest, Long.class);
        System.out.println("AuthService URL: " + authServiceUrl);
        System.out.println("Auth request: " + authRequest);
        System.out.println("Response status: " + response.getStatusCode());
        System.out.println("Response body: " + response.getBody());
        Long authId = response.getBody();
        System.out.println("Auth ID returned: " + authId);


        // Map DTO → Entity and set authId
        final SeekerEntity entity = SeekerDTOEntityMapper.map(seekerDTO);
        entity.setAuthID(authId);

        // Save recruiter
        final SeekerEntity savedEntity = reqrepo.save(entity);

        //  Map Entity → DTO and return
        return SeekerDTOEntityMapper.map(savedEntity);
    }

    @Override
    public SeekerDTO getSeekerById(Long id) {
        return null;
    }

    @Override
    public List<SeekerDTO> getAllSeekers() {
        return List.of();
    }




    }

