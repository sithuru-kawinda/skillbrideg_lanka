package com.SpringbootProject.Job_Service.JobController;

import com.SpringbootProject.Job_Service.JobDTO.JobDTO;
import com.SpringbootProject.Job_Service.JobDTO.JobRecruiterResponseDTO;
import com.SpringbootProject.Job_Service.JobService.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/job")
public class JobController {

    @Autowired
    private JobService jobservice;

    private final RestTemplate restTemplate = new RestTemplate();

    private final String RECRUITER_SERVICE_URL = "http://localhost:8081/api/recruiters/";

    @PreAuthorize("hasRole('RECRUITER')")
    @PostMapping("/create")
    public ResponseEntity<JobDTO> createJob(@RequestBody JobDTO jobdto) {
        JobDTO dto = jobservice.createjob(jobdto);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/{level}")
    public ResponseEntity<List<JobDTO>> getJobsByLevel(@PathVariable String level) {
        List<JobDTO> jobs = jobservice.getJobsByLevel(level);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping
    public ResponseEntity<List<JobDTO>> getAll(
            @RequestParam(required = false) List<String> jobnames,
            @RequestParam(required = false) List<String> levels) {
        List<JobDTO> jobDTOS = jobservice.getAllJobs(jobnames, levels);
        return new ResponseEntity<>(jobDTOS, HttpStatus.OK);
    }

    @GetMapping("/withRecruiter/{id}")
    public ResponseEntity<Map<String, Object>> getJobWithRecruiter(@PathVariable long id) {
        Optional<JobDTO> jobOpt = jobservice.findByID(id);
        if (jobOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Job not found"));
        }
        JobDTO job = jobOpt.get();

        Map<String, Object> result = new HashMap<>();
        result.put("job", job);

        try {
            JobRecruiterResponseDTO recruiter = restTemplate.getForObject(RECRUITER_SERVICE_URL + job.getRecruiterID(),JobRecruiterResponseDTO .class);
            result.put("recruiter", recruiter);

        } catch (Exception e) {
            result.put("recruiter", "Recruiter service unavailable or recruiter not found");
        }
        return ResponseEntity.ok(result);
    }
}
