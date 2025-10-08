package com.SpringbootProject.SeekerService.ServiceRepo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.SpringbootProject.SeekerService.SeekerEntity.SeekerEntity;

@Repository
public interface Repo extends JpaRepository<SeekerEntity, Long> {
    
    @Query("SELECT s FROM SeekerEntity s WHERE s.authID = :authID")
    Optional<SeekerEntity> findByAuthID(@Param("authID") Long authID);
    
    Optional<SeekerEntity> findByEmail(String email);
    Optional<SeekerEntity> findByNic(String nic);
}