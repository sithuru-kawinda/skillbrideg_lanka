package com.SpringbootProject.Authentication.Service.AuthService.AuthServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.SpringbootProject.Authentication.Service.AuthDTO.LoginRequest;
import com.SpringbootProject.Authentication.Service.AuthDTO.RegisterRequest;
import com.SpringbootProject.Authentication.Service.AuthDTO.TokenResponse;
import com.SpringbootProject.Authentication.Service.AuthRepo.AuthRepo;
import com.SpringbootProject.Authentication.Service.AuthService.AuthService;
import com.SpringbootProject.Authentication.Service.Entity.UserEntity;
import com.SpringbootProject.Authentication.Service.JWTUtill.JWTUtill;
import org.springframework.security.core.GrantedAuthority;

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
        System.out.println("🎯 AUTH SERVICE: Registering user - " + request.getEmail());

        String email = request.getEmail().trim().toLowerCase();

        // Check if email already exists
        if (repo.findByEmail(email).isPresent()) {
            System.out.println("❌ AUTH SERVICE: Email already taken - " + email);
            throw new RuntimeException("Email already taken");
        }

        // Create new user
        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        try {
            UserEntity savedUser = repo.save(user);
            System.out.println("✅ AUTH SERVICE: User registered successfully - ID: " + savedUser.getId());
            return savedUser.getId();
        } catch (DataIntegrityViolationException e) {
            // Two concurrent registrations raced past the findByEmail check above.
            System.err.println("❌ AUTH SERVICE: Duplicate email on save - " + email);
            throw new RuntimeException("Email already taken");
        }
    }

    @Override
    public TokenResponse login(LoginRequest loginRequest) {
        System.out.println("🎯 AUTH SERVICE: Login attempt - " + loginRequest.getEmail());

        try {
            String email = loginRequest.getEmail().trim().toLowerCase();
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, loginRequest.getPassword())
            );

            UserEntity user = repo.findByEmail(email)
                    .orElseThrow(() -> new IllegalStateException("Authenticated user vanished: " + email));

            String token = jwtUtil.generateToken(authentication, user.getId());
            String role = authentication.getAuthorities().stream()
                    .findFirst()
                    .map(GrantedAuthority::getAuthority)
                    .map(a -> a.startsWith("ROLE_") ? a.substring(5) : a)
                    .orElse(null);

            System.out.println("✅ AUTH SERVICE: Login successful - " + loginRequest.getEmail());

            return new TokenResponse(token, role, user.getId());
        } catch (AuthenticationException e) {
            System.err.println("💥 AUTH SERVICE: Login failed - " + e.getMessage());
            throw e;
        }
    }
}