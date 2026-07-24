package com.SpringbootProject.Job_Service.JobController;

import com.SpringbootProject.Job_Service.JobDTO.JobDTO;
import com.SpringbootProject.Job_Service.JobDTO.JobRecruiterResponseDTO;
import com.SpringbootProject.Job_Service.JobService.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/job")
public class JobController {

    @Autowired
    private JobService jobservice;

    private final RestTemplate restTemplate = buildRestTemplate();

    private final String RECRUITER_SERVICE_URL = "http://localhost:8081/api/recruiters/";

    private static RestTemplate buildRestTemplate() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(3000);
        factory.setReadTimeout(3000);
        return new RestTemplate(factory);
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createJob(@Valid @RequestBody JobDTO jobdto) {
        JobDTO dto = jobservice.createjob(jobdto);
        return new ResponseEntity<>(success("Job created successfully", "job", dto), HttpStatus.CREATED);
    }

    @GetMapping("/{level}")
    public ResponseEntity<Map<String, Object>> getJobsByLevel(@PathVariable String level) {
        List<JobDTO> jobs = jobservice.getJobsByLevel(level);
        return ResponseEntity.ok(listResponse("Jobs retrieved successfully", jobs));
    }

    @GetMapping("/byall")
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(required = false) List<String> jobnames,
            @RequestParam(required = false) List<String> levels) {
        List<JobDTO> jobDTOS = jobservice.getAllJobs(jobnames, levels);
        return ResponseEntity.ok(listResponse("Jobs retrieved successfully", jobDTOS));
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAll() {
        List<JobDTO> jobDTOS = jobservice.getAllJobs();
        return ResponseEntity.ok(listResponse("Jobs retrieved successfully", jobDTOS));
    }

    @GetMapping("/withRecruiter/{id}")
    public ResponseEntity<Map<String, Object>> getJobWithRecruiter(@PathVariable long id) {
        Optional<JobDTO> jobOpt = jobservice.findByID(id);
        if (!jobOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "Job not found"));
        }
        JobDTO job = jobOpt.get();

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("message", "Job retrieved successfully");
        result.put("job", job);

        try {
            JobRecruiterResponseDTO recruiter = restTemplate.getForObject(
                RECRUITER_SERVICE_URL + job.getRecruiterID(),
                JobRecruiterResponseDTO.class
            );
            result.put("recruiter", recruiter);
            result.put("recruiterAvailable", true);
        } catch (Exception e) {
            result.put("recruiter", null);
            result.put("recruiterAvailable", false);
        }
        return ResponseEntity.ok(result);
    }

    private Map<String, Object> success(String message, String dataKey, Object data) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", message);
        body.put(dataKey, data);
        return body;
    }

    private Map<String, Object> listResponse(String message, List<JobDTO> jobs) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", message);
        body.put("count", jobs.size());
        body.put("jobs", jobs);
        return body;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .orElse("Invalid request");
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", message));
    }

    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityViolation(org.springframework.dao.DataIntegrityViolationException e) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid job data"));
    }
}