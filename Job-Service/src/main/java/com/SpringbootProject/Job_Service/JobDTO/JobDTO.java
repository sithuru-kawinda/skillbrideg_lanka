package com.SpringbootProject.Job_Service.JobDTO;
import lombok.*;


@Getter
@Setter
public class JobDTO {
    private long jobId;
    private String jobName;
    private String jobDescription;
    private String jobStatus;
    private int durationinmonths;
    private long salary;
    private long recruiterID;

    public long getRecruiterID() {
        return recruiterID;
    }

    public void setRecruiterID(long recruiterID) {
        this.recruiterID = recruiterID;
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

