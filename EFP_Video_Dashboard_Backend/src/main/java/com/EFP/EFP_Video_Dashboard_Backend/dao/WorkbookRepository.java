package com.EFP.EFP_Video_Dashboard_Backend.dao;

import com.EFP.EFP_Video_Dashboard_Backend.models.Workbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkbookRepository extends JpaRepository<Workbook,Integer> {
}
