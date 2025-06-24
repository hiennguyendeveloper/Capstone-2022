package com.EFP.EFP_Video_Dashboard_Backend.dao;

import com.EFP.EFP_Video_Dashboard_Backend.models.ModuleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.SectionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionRepository extends JpaRepository<SectionModel, Integer> {

    @Query( value = "SELECT * FROM section ORDER BY section_name",
            nativeQuery = true )

    List<SectionModel> byName();

    @Query( value = "SELECT * FROM section WHERE dtm_deleted is NULL ORDER BY section_name", nativeQuery = true)
    List<SectionModel> NotDeleted();

    List<SectionModel> findByDtmDeletedIsNotNullOrderBySectionName();

    List<SectionModel> findAllByDtmDeletedIsNotNullOrderByDtmDeletedDesc();


}
