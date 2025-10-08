package com.SpringbootProject.Authentication.Service.AuthController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SpringbootProject.Authentication.Service.AuthDTO.LoginRequest;
import com.SpringbootProject.Authentication.Service.AuthDTO.RegisterRequest;
import com.SpringbootProject.Authentication.Service.AuthDTO.TokenResponse;
import com.SpringbootProject.Authentication.Service.AuthService.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/test")
    public String test() {
        return "✅ Authentication Service WORKING - " + System.currentTimeMillis();
    }

    @GetMapping("/health")
    public String health() {
        return "🟢 Auth Service Healthy - " + System.currentTimeMillis();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        try {
            System.out.println("🎯 REGISTER ENDPOINT HIT - Email: " + request.getEmail());
            Long authId = authService.register(request);
            return ResponseEntity.ok(authId);
        } catch (Exception e) {
            System.err.println("❌ REGISTER ERROR: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        try {
            System.out.println("🎯 LOGIN ENDPOINT HIT - Email: " + request.getEmail());
            String token = authService.login(request);
            return ResponseEntity.ok(new TokenResponse(token));
        } catch (Exception e) {
            System.err.println("❌ LOGIN ERROR: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    } 
}