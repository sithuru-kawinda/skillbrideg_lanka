package com.SpringbootProject.Recruiter_Service.RecruiterService.RecruiterServceImpl;

import com.SpringbootProject.Recruiter_Service.Mapper.RecruiterDTOEntityMapper;
import com.SpringbootProject.Recruiter_Service.RecruiterDTO.AuthRegisterRequest;
import com.SpringbootProject.Recruiter_Service.RecruiterDTO.RecruiterDTO;
import com.SpringbootProject.Recruiter_Service.RecruiterEntity.RecruiterEntity;
import com.SpringbootProject.Recruiter_Service.RecruiterRepo.RecruiterRepo;
import com.SpringbootProject.Recruiter_Service.RecruiterService.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class RecruiterServiceImpl implements RecruiterService {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    RecruiterRepo reqrepo;

//    @Override
//    public RecruiterDTO createRecruiter(RecruiterDTO recruiterDTO) {
//        final RecruiterEntity entity= RecruiterDTOEntityMapper.map(recruiterDTO);
//        final RecruiterEntity savedEntity= reqrepo.save(entity);
//        return RecruiterDTOEntityMapper.map(savedEntity);
//
//    }

@Override
public RecruiterDTO createRecruiter(RecruiterDTO recruiterDTO) {
    // 1️⃣ Call AuthService to register credentials
    AuthRegisterRequest authRequest = new AuthRegisterRequest(
            recruiterDTO.getCompanyEmail(),
            recruiterDTO.getPassword()
            , // or get from recruiterDTO if you allow password
            "RECRUITER"
    );

    String authServiceUrl = "http://localhost:8082/api/auth/register";
    ResponseEntity<Long> response = restTemplate.postForEntity(authServiceUrl, authRequest, Long.class);
    Long authId = response.getBody();
    System.out.println(authId);
    // Map DTO → Entity and set authId
    final RecruiterEntity entity = RecruiterDTOEntityMapper.map(recruiterDTO);
    entity.setAuthId(authId);

    // Save recruiter
    final RecruiterEntity savedEntity = reqrepo.save(entity);

    //  Map Entity → DTO and return
    return RecruiterDTOEntityMapper.map(savedEntity);
}


    @Override
    public RecruiterDTO getRecruiterById(Long id) {
        Optional<RecruiterEntity> recruiterEntity = reqrepo.findById(id);

        if (recruiterEntity.isPresent()) {
            return RecruiterDTOEntityMapper.map(recruiterEntity.get());
        } else {
            return null; // or throw exception if recruiter not found
        }


    }

    @Override
    public List<RecruiterDTO> getAllRecruiters() {
        return List.of();
    }

//    @Override
//    public RecruiterDTO updateRecruiter(Long id, RecruiterDTO recruiterDTO) {
//        return null;
//    }
//
//    @Override
//    public void deleteRecruiter(Long id) {
//
//    }
}
