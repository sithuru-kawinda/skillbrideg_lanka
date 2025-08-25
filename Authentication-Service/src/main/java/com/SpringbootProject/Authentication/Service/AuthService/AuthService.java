package com.SpringbootProject.Authentication.Service.AuthService;

import com.SpringbootProject.Authentication.Service.AuthDTO.LoginRequest;
import com.SpringbootProject.Authentication.Service.AuthDTO.RegisterRequest;

public interface AuthService {
    long register(RegisterRequest request);

    String login(LoginRequest request);


}
