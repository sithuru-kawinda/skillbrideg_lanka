package com.SpringbootProject.SeekerService.SeekerController;

import com.SpringbootProject.SeekerService.SeekerDTO.SeekerDTO;
import com.SpringbootProject.SeekerService.Service.Serviceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;



@RestController
@RequestMapping("/seekers")
public class SeekerController {



        @Autowired
        private Serviceimpl impl;


        @PostMapping("/r")
        public String print(){
            return "Good";
        }



        @PostMapping("/register")
        public ResponseEntity<SeekerDTO> registerSeeker(@RequestBody SeekerDTO dto) {
           SeekerDTO dto1 = impl.createSeeker(dto);
            return new ResponseEntity<SeekerDTO>(dto1, HttpStatus.OK);
        }


    // Get seeker by ID

        @GetMapping("/{id}")
        public SeekerDTO getSeeker(@PathVariable Long id) {
            return impl.getSeekerById(id);
        }

        // Get all seekers
        @GetMapping
        public List<SeekerDTO> getAllSeekers() {
            return impl.getAllSeekers();
        }



}








//        // Update recruiter
//        @PutMapping("/{id}")
//        public RecruiterDTO updateRecruiter(@PathVariable Long id, @RequestBody RecruiterDTO recruiterDTO) {
//            return recruiterService.updateRecruiter(id, recruiterDTO);
//        }
//
//        // Delete recruiter
//        @DeleteMapping("/{id}")
//        public String deleteRecruiter(@PathVariable Long id) {
//            recruiterService.deleteRecruiter(id);
//            return "Recruiter deleted successfully.";
//        }



