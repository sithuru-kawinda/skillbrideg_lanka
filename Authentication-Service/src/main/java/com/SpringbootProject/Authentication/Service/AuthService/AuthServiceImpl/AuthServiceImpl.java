package com.SpringbootProject.Authentication.Service.AuthService.AuthServiceImpl;

import com.SpringbootProject.Authentication.Service.AuthDTO.LoginRequest;
import com.SpringbootProject.Authentication.Service.AuthDTO.RegisterRequest;
import com.SpringbootProject.Authentication.Service.AuthRepo.AuthRepo;
import com.SpringbootProject.Authentication.Service.AuthService.AuthService;
import com.SpringbootProject.Authentication.Service.Entity.UserEntity;
import com.SpringbootProject.Authentication.Service.JWTUtill.JWTUtill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
        if (repo.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already taken");
        }
        UserEntity user = new UserEntity();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        repo.save(user);
        return user.getId();
    }

    @Override
    public String login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            return jwtUtil.generateToken(authentication);
        } catch (Exception e) {
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }
}
