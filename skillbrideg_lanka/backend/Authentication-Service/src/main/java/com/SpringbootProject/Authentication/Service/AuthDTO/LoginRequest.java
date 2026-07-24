package com.SpringbootProject.Authentication.Service.AuthDTO;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String username) {
        this.email = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @NotBlank
    private String password;
}
