package com.SpringbootProject.SeekerService.SeekerController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringbootProject.SeekerService.SeekerDTO.SeekerDTO;
import com.SpringbootProject.SeekerService.Service.Serviceimpl;

@RestController
@RequestMapping("/seekers")
@CrossOrigin(origins = "http://localhost:3000")
public class SeekerController {

    @Autowired
    private Serviceimpl impl;

    // Change this from POST to GET
    @GetMapping("/r")
    public String print(){
        return "Good";
    }

    @GetMapping("/test")
    public String test() {
        return "✅ Seeker Service is WORKING on port 8086! - " + System.currentTimeMillis();
    }

    @GetMapping("/health")
    public String health() {
        return "Seeker Service Healthy - " + System.currentTimeMillis();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerSeeker(@RequestBody SeekerDTO dto) {
        try {
            System.out.println("🎯 REGISTER ENDPOINT CALLED");
            System.out.println("📥 Received seeker registration request: " + dto);
            
            SeekerDTO dto1 = impl.createSeeker(dto);
            System.out.println("✅ Seeker registration successful: " + dto1);
            
            return new ResponseEntity<>(dto1, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("❌ Error in seeker registration: " + e.getMessage());
            e.printStackTrace();
            
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}