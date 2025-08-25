package com.SpringbootProject.Authentication.Service.AuthRepo;

import com.SpringbootProject.Authentication.Service.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepo extends JpaRepository<UserEntity,Long> {
    Optional<UserEntity> findByEmail(String email);
}
