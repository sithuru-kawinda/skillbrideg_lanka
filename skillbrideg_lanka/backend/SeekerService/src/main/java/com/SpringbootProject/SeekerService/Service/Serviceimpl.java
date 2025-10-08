package com.SpringbootProject.SeekerService.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.SpringbootProject.SeekerService.SeekerDTO.SeekerDTO;

@Service
public interface Serviceimpl {
   SeekerDTO createSeeker(SeekerDTO seekerDTO);
   SeekerDTO getSeekerById(Long id);
   SeekerDTO getSeekerByAuthId(Long authId);
   SeekerDTO getSeekerByEmail(String email);
   List<SeekerDTO> getAllSeekers();
   SeekerDTO updateSeeker(Long id, SeekerDTO seekerDTO);
   void deleteSeeker(Long id);
}