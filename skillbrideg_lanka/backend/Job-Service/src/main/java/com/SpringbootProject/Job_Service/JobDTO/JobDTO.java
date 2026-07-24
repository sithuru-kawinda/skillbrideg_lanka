package com.SpringbootProject.Job_Service.JobDTO;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;


@Getter
@Setter
public class JobDTO {
    private long jobId;

    @NotBlank
    private String jobName;

    @NotBlank
    private String jobDescription;

    @NotBlank
    private String jobStatus;

    @NotNull
    @PositiveOrZero
    private Integer durationinmonths;

    @NotNull
    @PositiveOrZero
    private Long salary;

    @NotNull
    private Long recruiterID;

    public Long getRecruiterID() {
        return recruiterID;
    }

    public void setRecruiterID(Long recruiterID) {
        this.recruiterID = recruiterID;
    }

    public Integer getDurationinmonths() {
        return durationinmonths;
    }

    public void setDurationinmonths(Integer durationinmonths) {
        this.durationinmonths = durationinmonths;
    }

    public Long getSalary() {
        return salary;
    }

    public void setSalary(Long salary) {
        this.salary = salary;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    private String level;

    public long getJobId() {
        return jobId;
    }

    public void setJobId(long jobId) {
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
}

