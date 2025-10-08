package com.SpringbootProject.Job_Service.JobEntity;

import javax.persistence.*;

@Entity
@Table(name = "jobs")
public class JobEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    @Column(name = "job_name", nullable = false)
    private String jobName;

    @Column(name = "job_description", nullable = false, length = 1000)
    private String jobDescription;

    @Column(name = "job_status", nullable = false)
    private String jobStatus;

    @Column(name = "level", nullable = false)
    private String level;

    @Column(name = "duration_month", nullable = false)
    private int durationinmonths;

    @Column(name = "salary", nullable = false)
    private long salary;

    @Column(name = "recruiter_id", nullable = false)
    private long recruiterID;

    public JobEntity() {
    }

    public JobEntity(long recruiterID, long salary, int durationinmonths, String level, String jobStatus, String jobDescription, String jobName, Long jobId) {
        this.recruiterID = recruiterID;
        this.salary = salary;
        this.durationinmonths = durationinmonths;
        this.level = level;
        this.jobStatus = jobStatus;
        this.jobDescription = jobDescription;
        this.jobName = jobName;
        this.jobId = jobId;
    }

    // Getters and Setters
    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public int getDurationinmonths() {
        return durationinmonths;
    }

    public void setDurationinmonths(int durationinmonths) {
        this.durationinmonths = durationinmonths;
    }

    public long getSalary() {
        return salary;
    }

    public void setSalary(long salary) {
        this.salary = salary;
    }

    public long getRecruiterID() {
        return recruiterID;
    }

    public void setRecruiterID(long recruiterID) {
        this.recruiterID = recruiterID;
    }
}