package com.SpringbootProject.SeekerService.ServiceRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.SpringbootProject.SeekerService.SeekerEntity.SeekerEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface Repo extends JpaRepository<SeekerEntity, Long> {

}
