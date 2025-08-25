package com.SpringbootProject.Authentication.Service.AuthController;


import com.SpringbootProject.Authentication.Service.AuthDTO.LoginRequest;
import com.SpringbootProject.Authentication.Service.AuthDTO.RegisterRequest;
import com.SpringbootProject.Authentication.Service.AuthDTO.TokenResponse;
import com.SpringbootProject.Authentication.Service.AuthService.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<Long> registerUser(@RequestBody RegisterRequest request) {
        Long authId = authService.register(request);
        return ResponseEntity.ok(authId);  // return ID instead of a string
    }


    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> loginUser(@RequestBody LoginRequest request) {
        String token = authService.login(request);// Generates the JWT token if credentials are correct
        return ResponseEntity.ok(new TokenResponse(token)); // Return token as JSON response
    }
}
