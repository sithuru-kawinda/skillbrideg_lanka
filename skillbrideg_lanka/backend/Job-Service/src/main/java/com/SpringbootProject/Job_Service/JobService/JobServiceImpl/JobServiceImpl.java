package com.SpringbootProject.Job_Service.JobService.JobServiceImpl;

import com.SpringbootProject.Job_Service.JobDTO.JobDTO;
import com.SpringbootProject.Job_Service.JobEntity.JobEntity;
import com.SpringbootProject.Job_Service.JobRepo.JobRepo;
import com.SpringbootProject.Job_Service.JobService.JobService;
import com.SpringbootProject.Job_Service.Mapper.JobDTOEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepo jobrepo;

    @Override
    public JobDTO createjob(JobDTO jobdto) {
        JobEntity entity = JobDTOEntityMapper.map(jobdto);
        JobEntity savedEntity = jobrepo.save(entity);
        return JobDTOEntityMapper.map(savedEntity);
    }

    @Override
    public List<JobDTO> getJobsByLevel(String level) {
        List<JobEntity> jobs = jobrepo.findByLevel(level);
        return jobs.stream().map(JobDTOEntityMapper::map).collect(Collectors.toList());
    }

    @Override
    public List<JobDTO> getAllJobs(List<String> jobnames, List<String> levels) {
        List<JobEntity> jobEntities = jobrepo.findAll();
        return jobEntities.stream()
                .filter(job -> jobnames == null || jobnames.contains(job.getJobName().toLowerCase()))
                .filter(job -> levels == null || levels.contains(job.getLevel().toLowerCase()))
                .map(JobDTOEntityMapper::map)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobDTO> getAllJobs() {
        List<JobEntity> jobEntities = jobrepo.findAll();
        return jobEntities.stream()
                .map(JobDTOEntityMapper::map)
                .collect(Collectors.toList());
    }


    @Override
    public Optional<JobDTO> findByID(long id) {
        return jobrepo.findById(id).map(JobDTOEntityMapper::map);
    }
}
