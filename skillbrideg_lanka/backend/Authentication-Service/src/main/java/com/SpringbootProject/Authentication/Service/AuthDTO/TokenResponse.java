package com.SpringbootProject.Authentication.Service.AuthDTO;

public class TokenResponse {
    private String message;
    private String token;
    private String role;
    private Long id;

    public TokenResponse() {}

    public TokenResponse(String token, String role, Long id) {
        this.message = "Login successful";
        this.token = token;
        this.role = role;
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
