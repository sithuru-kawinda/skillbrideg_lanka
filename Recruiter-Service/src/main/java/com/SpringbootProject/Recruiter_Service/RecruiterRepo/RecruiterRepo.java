package com.SpringbootProject.Recruiter_Service.RecruiterRepo;

import com.SpringbootProject.Recruiter_Service.RecruiterEntity.RecruiterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterRepo extends JpaRepository<RecruiterEntity, Long> {
}
