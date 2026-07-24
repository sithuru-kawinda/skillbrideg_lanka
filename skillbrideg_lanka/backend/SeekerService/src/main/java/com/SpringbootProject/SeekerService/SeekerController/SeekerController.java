package com.SpringbootProject.SeekerService.SeekerController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringbootProject.SeekerService.Exception.AuthServiceException;
import com.SpringbootProject.SeekerService.Exception.DuplicateSeekerException;
import com.SpringbootProject.SeekerService.Exception.SeekerNotFoundException;
import com.SpringbootProject.SeekerService.SeekerDTO.SeekerDTO;
import com.SpringbootProject.SeekerService.Service.Serviceimpl;

import jakarta.validation.Valid;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/seekers")
@CrossOrigin(origins = "http://localhost:3000")
public class SeekerController {

    @Autowired
    private Serviceimpl impl;

    @GetMapping("/r")
    public String print() {
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
    public ResponseEntity<?> registerSeeker(@Valid @RequestBody SeekerDTO dto) {
        System.out.println("🎯 REGISTER ENDPOINT CALLED");
        System.out.println("📥 Received seeker registration request: " + dto);

        SeekerDTO result = impl.createSeeker(dto);
        System.out.println("✅ Seeker registration successful: " + result);

        return new ResponseEntity<>(success("Seeker registered successfully", "seeker", result), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllSeekers() {
        List<SeekerDTO> seekers = impl.getAllSeekers();
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", "Seekers retrieved successfully");
        body.put("count", seekers.size());
        body.put("seekers", seekers);
        return ResponseEntity.ok(body);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSeekerById(@PathVariable Long id) {
        return ResponseEntity.ok(success("Seeker retrieved successfully", "seeker", impl.getSeekerById(id)));
    }

    @GetMapping("/authId/{authId}")
    public ResponseEntity<?> getSeekerByAuthId(@PathVariable Long authId) {
        return ResponseEntity.ok(success("Seeker retrieved successfully", "seeker", impl.getSeekerByAuthId(authId)));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getSeekerByEmail(@PathVariable String email) {
        return ResponseEntity.ok(success("Seeker retrieved successfully", "seeker", impl.getSeekerByEmail(email)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSeeker(@PathVariable Long id, @RequestBody SeekerDTO dto) {
        return ResponseEntity.ok(success("Seeker updated successfully", "seeker", impl.updateSeeker(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeeker(@PathVariable Long id) {
        impl.deleteSeeker(id);
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", "Seeker deleted successfully");
        return ResponseEntity.ok(body);
    }

    private Map<String, Object> success(String message, String dataKey, Object data) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", message);
        body.put(dataKey, data);
        return body;
    }

    @ExceptionHandler(SeekerNotFoundException.class)
    public ResponseEntity<?> handleNotFound(SeekerNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
    }

    @ExceptionHandler(DuplicateSeekerException.class)
    public ResponseEntity<?> handleDuplicate(DuplicateSeekerException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: " + e.getMessage());
    }

    @ExceptionHandler(AuthServiceException.class)
    public ResponseEntity<?> handleAuthServiceError(AuthServiceException e) {
        System.err.println("❌ Auth Service error: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Error: " + e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .orElse("Invalid request");
        return ResponseEntity.badRequest().body("Error: " + message);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUnexpected(Exception e) {
        System.err.println("❌ Unexpected error: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
    }
}
