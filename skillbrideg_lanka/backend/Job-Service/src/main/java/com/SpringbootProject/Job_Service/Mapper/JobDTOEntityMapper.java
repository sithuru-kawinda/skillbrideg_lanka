package com.SpringbootProject.Job_Service.Mapper;

import com.SpringbootProject.Job_Service.JobDTO.JobDTO;
import com.SpringbootProject.Job_Service.JobEntity.JobEntity;

public class JobDTOEntityMapper {
    public static JobEntity map(JobDTO dto) {
        JobEntity entity = new JobEntity();
        entity.setJobName(dto.getJobName());
        entity.setJobDescription(dto.getJobDescription());
        entity.setJobStatus(dto.getJobStatus());
        entity.setLevel(dto.getLevel());
        entity.setDurationinmonths(dto.getDurationinmonths());
        entity.setSalary(dto.getSalary());
        entity.setRecruiterID(dto.getRecruiterID());
        return entity;
    }

    public static JobDTO map(JobEntity entity) {
        JobDTO dto = new JobDTO();
        dto.setJobId(entity.getJobId());
        dto.setJobName(entity.getJobName());
        dto.setJobDescription(entity.getJobDescription());
        dto.setJobStatus(entity.getJobStatus());
        dto.setLevel(entity.getLevel());
        dto.setDurationinmonths(entity.getDurationinmonths());
        dto.setSalary(entity.getSalary());
        dto.setRecruiterID(entity.getRecruiterID());
        return dto;
    }
}
