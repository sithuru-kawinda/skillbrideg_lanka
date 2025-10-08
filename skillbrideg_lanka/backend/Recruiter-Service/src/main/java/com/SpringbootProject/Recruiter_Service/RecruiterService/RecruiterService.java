package com.SpringbootProject.Recruiter_Service.RecruiterService;

import com.SpringbootProject.Recruiter_Service.RecruiterDTO.RecruiterDTO;
import java.util.List;

public interface RecruiterService {
    RecruiterDTO createRecruiter(RecruiterDTO recruiterDTO);
    RecruiterDTO getRecruiterById(Long id);
    List<RecruiterDTO> getAllRecruiters();
}