package com.SpringbootProject.Job_Service.JobRepo;


import com.SpringbootProject.Job_Service.JobEntity.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<JobEntity, Long> {
    List<JobEntity> findByLevel(String level);

}
