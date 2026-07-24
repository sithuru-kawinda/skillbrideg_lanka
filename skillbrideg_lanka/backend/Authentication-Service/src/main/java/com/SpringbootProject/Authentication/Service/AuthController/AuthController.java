package com.SpringbootProject.Authentication.Service.AuthController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;

import jakarta.validation.Valid;

import java.util.LinkedHashMap;
import java.util.Map;

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
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        try {
            System.out.println("🎯 REGISTER ENDPOINT HIT - Email: " + request.getEmail());
            Long authId = authService.register(request);

            Map<String, Object> body = new LinkedHashMap<>();
            body.put("message", "User registered successfully");
            body.put("authId", authId);
            return ResponseEntity.ok(body);
        } catch (DataIntegrityViolationException e) {
            System.err.println("❌ REGISTER ERROR (duplicate): " + e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Email already taken");
        } catch (RuntimeException e) {
            System.err.println("❌ REGISTER ERROR: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("❌ REGISTER ERROR (unexpected): " + e.getMessage());
            return ResponseEntity.internalServerError().body("Error: Registration failed");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest request) {
        try {
            System.out.println("🎯 LOGIN ENDPOINT HIT - Email: " + request.getEmail());
            TokenResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            System.err.println("❌ LOGIN ERROR (bad credentials): " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid email or password");
        } catch (Exception e) {
            System.err.println("❌ LOGIN ERROR (unexpected): " + e.getMessage());
            return ResponseEntity.internalServerError().body("Error: Login failed");
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .orElse("Invalid request");
        return ResponseEntity.badRequest().body("Error: " + message);
    }
}