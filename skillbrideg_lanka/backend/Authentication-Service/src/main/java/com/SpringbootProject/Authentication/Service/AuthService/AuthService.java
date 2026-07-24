package com.SpringbootProject.Authentication.Service.AuthService;

import com.SpringbootProject.Authentication.Service.AuthDTO.LoginRequest;
import com.SpringbootProject.Authentication.Service.AuthDTO.RegisterRequest;
import com.SpringbootProject.Authentication.Service.AuthDTO.TokenResponse;

public interface AuthService {
    long register(RegisterRequest request);

    TokenResponse login(LoginRequest request);
}
