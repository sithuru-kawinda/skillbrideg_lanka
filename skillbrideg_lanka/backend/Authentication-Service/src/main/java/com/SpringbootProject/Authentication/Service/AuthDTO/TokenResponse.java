package com.SpringbootProject.Authentication.Service.AuthDTO;

public class TokenResponse {
    private String token;

    // ADD DEFAULT CONSTRUCTOR
    public TokenResponse() {}

    public TokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
}