package com.SpringbootProject.Job_Service.JobService;

import com.SpringbootProject.Job_Service.JobDTO.JobDTO;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface JobService {

    public JobDTO createjob(JobDTO jobdto) ;

    List<JobDTO> getJobsByLevel(String level);

    List<JobDTO> getAllJobs(List<String> jobname,List<String> level);

    List<JobDTO> getAllJobs();

    Optional<JobDTO> findByID(long id);
}
