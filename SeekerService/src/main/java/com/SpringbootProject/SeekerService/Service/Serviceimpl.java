package com.SpringbootProject.SeekerService.Service;

import com.SpringbootProject.SeekerService.SeekerDTO.SeekerDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface Serviceimpl {
   SeekerDTO createSeeker(SeekerDTO recruiterDTO);

    SeekerDTO getSeekerById(Long id);

    List<SeekerDTO> getAllSeekers();
}
