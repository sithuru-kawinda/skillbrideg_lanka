package com.SpringbootProject.Recruiter_Service.Mapper;

import com.SpringbootProject.Recruiter_Service.RecruiterDTO.RecruiterDTO;
import com.SpringbootProject.Recruiter_Service.RecruiterEntity.RecruiterEntity;

public class RecruiterDTOEntityMapper {



        // Entity → DTO
        public static RecruiterDTO map(RecruiterEntity entity) {
            if (entity == null) {
                return null;
            }
            RecruiterDTO dto = new RecruiterDTO();
            dto.setId(entity.getId());
            dto.setCompanyName(entity.getCompanyName());
            dto.setLocation(entity.getLocation());
            dto.setCompanyEmail(entity.getCompanyEmail());
            dto.setRegistrationNumber(entity.getRegistrationNumber());
            dto.setPhoneNumber(entity.getPhoneNumber());
            return dto;
        }

        // DTO → Entity
        public static RecruiterEntity map(RecruiterDTO dto) {
            if (dto == null) {
                return null;
            }
            RecruiterEntity entity = new RecruiterEntity();
            entity.setId(dto.getId());
            entity.setCompanyName(dto.getCompanyName());
            entity.setLocation(dto.getLocation());
            entity.setCompanyEmail(dto.getCompanyEmail());
            entity.setRegistrationNumber(dto.getRegistrationNumber());
            entity.setPhoneNumber(dto.getPhoneNumber());
            entity.setAuthId(dto.getAuthid());
            return entity;
        }
    }


