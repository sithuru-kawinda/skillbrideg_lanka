package com.SpringbootProject.SeekerService.SeekerEntity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

    @Getter
    @Setter
    @Entity
    @Table(name = "seekers")
    public class SeekerEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment primary key
        private Long id;

        @Column(name = "auth_id", nullable = false, unique = true)
        private Long authID;

        @Column(name = "full_name", nullable = false)
        private String fullName;

        @Column(name = "email", nullable = false, unique = true)
        private String email;

        @Column(name = "nic", nullable = false, unique = true)
        private String nic;


        @Column(name = "phone_number", nullable = false)
        private String phoneNumber;

        @Column(name = "qualification", nullable = false)
        private String qualification;

        // Constructors
        public SeekerEntity() {
        }

        public SeekerEntity(Long id, Long authID, String fullName, String email, String nic,
                            String phoneNumber, String qualification) {
            this.id = id;
            this.authID = authID;
            this.fullName = fullName;
            this.email = email;
            this.nic = nic;
            this.phoneNumber = phoneNumber;
            this.qualification = qualification;
        }

        // Getters and Setters (if not using Lombok)
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Long getAuthID() {
            return authID;
        }

        public void setAuthID(Long authID) {
            this.authID = authID;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
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


