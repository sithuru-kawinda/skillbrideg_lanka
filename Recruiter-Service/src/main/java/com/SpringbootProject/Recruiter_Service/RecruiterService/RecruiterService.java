package com.SpringbootProject.Recruiter_Service.RecruiterService;

import com.SpringbootProject.Recruiter_Service.RecruiterDTO.RecruiterDTO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface RecruiterService {


    RecruiterDTO createRecruiter(RecruiterDTO recruiterDTO);

    RecruiterDTO getRecruiterById(Long id);

    List<RecruiterDTO> getAllRecruiters();

//    RecruiterDTO updateRecruiter(Long id, RecruiterDTO recruiterDTO);
//
//    void deleteRecruiter(Long id);
}
