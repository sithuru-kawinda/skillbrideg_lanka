package com.SpringbootProject.Recruiter_Service.RecruiterController;

import com.SpringbootProject.Recruiter_Service.RecruiterDTO.RecruiterDTO;
import com.SpringbootProject.Recruiter_Service.RecruiterService.RecruiterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;




@RestController
@RequestMapping("/api/recruiters")
public class RecruiterController {

    @Autowired
    private RecruiterService recruiterService;

    @PostMapping("/r")
    public String print(){
        return "Good";
    }



    @PostMapping("/register")
    public ResponseEntity<RecruiterDTO> registerRecruiter(@RequestBody RecruiterDTO dto) {
        RecruiterDTO dto1 = recruiterService.createRecruiter(dto);
        return new ResponseEntity<RecruiterDTO>(dto1, HttpStatus.OK);
    }

    // Get recruiter by ID
//    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/{id}")
    public RecruiterDTO getRecruiter(@PathVariable Long id) {
        return recruiterService.getRecruiterById(id);
        }

        // Get all recruiters
        @GetMapping
        public List<RecruiterDTO> getAllRecruiters() {
            return recruiterService.getAllRecruiters();
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
}

