package com.SpringbootProject.SeekerService.Mapper;


import com.SpringbootProject.SeekerService.SeekerDTO.SeekerDTO;
import com.SpringbootProject.SeekerService.SeekerEntity.SeekerEntity;

public class SeekerDTOEntityMapper {

        // Entity → DTO
        public static SeekerDTO map(SeekerEntity entity) {
            if (entity == null) {
                return null;
            }
            SeekerDTO dto = new SeekerDTO();
            dto.setId(entity.getId());
            dto.setFullName(entity.getFullName());
            dto.setAuthID(entity.getAuthID());
            dto.setEmail(entity.getEmail());
            dto.setNic(entity.getNic());
            dto.setPhoneNumber(entity.getPhoneNumber());
            dto.setQualification(entity.getQualification());
            return dto;
        }

        // DTO → Entity
        public static SeekerEntity map(SeekerDTO dto) {
            if (dto == null) {
                return null;
            }
            SeekerEntity entity = new SeekerEntity();
            entity.setFullName(dto.getFullName());
            entity.setAuthID(dto.getAuthID());
            entity.setEmail(dto.getEmail());
            entity.setNic(dto.getNic());
            entity.setPhoneNumber(dto.getPhoneNumber());
            entity.setQualification(dto.getQualification());
            return entity;
        }
    }





