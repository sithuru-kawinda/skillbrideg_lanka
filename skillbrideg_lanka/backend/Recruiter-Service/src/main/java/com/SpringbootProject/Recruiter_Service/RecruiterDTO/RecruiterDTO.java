package com.SpringbootProject.Recruiter_Service.RecruiterDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RecruiterDTO {
    private Long id;
    private String companyName;
    private String location;
    private String companyEmail;
    private String registrationNumber;
    private Long authid;
    private String password;
    private String phoneNumber;

    // Explicitly define getters if Lombok isn't working
    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getLocation() {
        return location;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Long getAuthid() {
        return authid;
    }

    public String getPassword() {
        return password;
    }

    // Setters (Lombok should handle these, but define explicitly if needed)
    public void setId(Long id) {
        this.id = id;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAuthid(Long authid) {
        this.authid = authid;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}