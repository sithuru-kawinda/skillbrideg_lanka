package com.SpringbootProject.Recruiter_Service.RecruiterController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/recruiters")
@CrossOrigin(origins = "*")
public class RecruiterController {

    private final AtomicLong idCounter = new AtomicLong(1);

    // Health check endpoint - SIMPLE
    @GetMapping("/health")
    public Map<String, String> health() {
        System.out.println("✅ Health check called");
        Map<String, String> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "Recruiter Service");
        response.put("timestamp", String.valueOf(System.currentTimeMillis()));
        return response;
    }

    // Test endpoint - SIMPLE
    @GetMapping("/test")
    public Map<String, String> test() {
        System.out.println("✅ Test endpoint called");
        Map<String, String> response = new HashMap<>();
        response.put("message", "Recruiter Service TEST");
        response.put("timestamp", String.valueOf(System.currentTimeMillis()));
        return response;
    }

    // Registration endpoint - SIMPLE
    @PostMapping("/register")
    public ResponseEntity<?> registerRecruiter(@RequestBody Map<String, Object> requestData) {
        try {
            System.out.println("🎯 REGISTER ENDPOINT CALLED");
            System.out.println("📥 Received data: " + requestData);
            
            // Create simple response
            Map<String, Object> response = new HashMap<>();
            response.put("id", idCounter.getAndIncrement());
            response.put("companyName", requestData.get("companyName"));
            response.put("companyEmail", requestData.get("companyEmail"));
            response.put("location", requestData.get("location"));
            response.put("registrationNumber", requestData.get("registrationNumber"));
            response.put("phoneNumber", requestData.get("phoneNumber"));
            response.put("authid", System.currentTimeMillis() % 1000000);
            response.put("status", "success");
            response.put("message", "Registration completed successfully");
            
            System.out.println("✅ Registration successful: " + response);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            System.err.println("❌ Registration error: " + e.getMessage());
            
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Registration failed");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    // Get all recruiters - SIMPLE
    @GetMapping
    public Map<String, Object> getAllRecruiters() {
        Map<String, Object> response = new HashMap<>();
        response.put("recruiters", java.util.List.of());
        response.put("count", 0);
        response.put("message", "No recruiters in demo mode");
        return response;
    }

    // Handle OPTIONS requests for CORS
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> options() {
        return ResponseEntity.ok().build();
    }

    // Catch-all for any undefined routes
    @RequestMapping("/**")
    public Map<String, String> catchAll() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Recruiter Service is RUNNING");
        response.put("endpoint", "All routes working");
        response.put("timestamp", String.valueOf(System.currentTimeMillis()));
        return response;
    }
}