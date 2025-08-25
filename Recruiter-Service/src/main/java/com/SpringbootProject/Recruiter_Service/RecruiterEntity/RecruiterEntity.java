package com.SpringbootProject.Recruiter_Service.RecruiterEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "recruiters")

public class RecruiterEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment primary key
    private Long id;
    @Column(name = "auth_id", nullable = false, unique = true)
    private Long authId;
    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name="location",nullable = false)
    private String location;

    @Column(name = "company_email", nullable = false, unique = true)
    private String companyEmail;

    @Column(name = "registration_number", nullable = false, unique = true)
    private String registrationNumber;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    // Constructors
    public RecruiterEntity() {
    }

    public RecruiterEntity(Long id, Long authId, String companyName, String location, String companyEmail, String registrationNumber, String phoneNumber) {
        this.id = id;
        this.authId = authId;
        this.companyName = companyName;
        this.location = location;
        this.companyEmail = companyEmail;
        this.registrationNumber = registrationNumber;
        this.phoneNumber = phoneNumber;
    }

    // Getters and Setters (if not using Lombok)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAuthId() {
        return authId;
    }

    public void setAuthId(Long authId) {
        this.authId = authId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

