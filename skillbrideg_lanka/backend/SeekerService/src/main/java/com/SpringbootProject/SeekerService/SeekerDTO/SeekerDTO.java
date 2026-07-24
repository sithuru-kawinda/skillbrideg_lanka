package com.SpringbootProject.SeekerService.SeekerDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SeekerDTO {
    private long id;

    @NotBlank
    private String fullName;

    private long authID;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String nic;

    @NotBlank
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String qualification;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public long getAuthID() {
        return authID;
    }

    public void setAuthID(long authID) {
        this.authID = authID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }
}
