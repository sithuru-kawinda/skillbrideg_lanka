package com.SpringbootProject.Authentication.Service.AuthService.AuthServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.SpringbootProject.Authentication.Service.AuthDTO.LoginRequest;
import com.SpringbootProject.Authentication.Service.AuthDTO.RegisterRequest;
import com.SpringbootProject.Authentication.Service.AuthRepo.AuthRepo;
import com.SpringbootProject.Authentication.Service.AuthService.AuthService;
import com.SpringbootProject.Authentication.Service.Entity.UserEntity;
import com.SpringbootProject.Authentication.Service.JWTUtill.JWTUtill;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthRepo repo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtill jwtUtil;

    @Override
    public long register(RegisterRequest request) {
        try {
            System.out.println("🎯 AUTH SERVICE: Registering user - " + request.getEmail());
            
            // Check if email already exists
            if (repo.findByEmail(request.getEmail()).isPresent()) {
                System.out.println("❌ AUTH SERVICE: Email already taken - " + request.getEmail());
                throw new RuntimeException("Email already taken");
            }
            
            // Create new user
            UserEntity user = new UserEntity();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(request.getRole());
            
            UserEntity savedUser = repo.save(user);
            System.out.println("✅ AUTH SERVICE: User registered successfully - ID: " + savedUser.getId());
            
            return savedUser.getId();
            
        } catch (Exception e) {
            System.err.println("💥 AUTH SERVICE: Registration failed - " + e.getMessage());
            throw e;
        }
    }

    @Override
    public String login(LoginRequest loginRequest) {
        try {
            System.out.println("🎯 AUTH SERVICE: Login attempt - " + loginRequest.getEmail());
            
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            
            String token = jwtUtil.generateToken(authentication);
            System.out.println("✅ AUTH SERVICE: Login successful - " + loginRequest.getEmail());
            
            return token;
            
        } catch (Exception e) {
            System.err.println("💥 AUTH SERVICE: Login failed - " + e.getMessage());
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }
}