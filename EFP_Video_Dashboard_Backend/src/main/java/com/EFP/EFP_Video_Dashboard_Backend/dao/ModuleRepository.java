package com.EFP.EFP_Video_Dashboard_Backend.dao;


import com.EFP.EFP_Video_Dashboard_Backend.dto.LessonDTO;
import com.EFP.EFP_Video_Dashboard_Backend.models.LessonModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.ModuleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.SectionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<ModuleModel, Integer>{

    @Query( value = "SELECT * FROM module ORDER BY module_name",
            nativeQuery = true )

    List<ModuleModel> byName();


    List<ModuleModel> getAllBySection(SectionModel section);


    @Query( value = "SELECT * FROM module WHERE dtm_deleted is NULL ORDER BY module_name", nativeQuery = true)
    List<ModuleModel> NotDeleted();

    List<ModuleModel> getAllBySectionAndDtmDeletedIsNullOrderByModuleName(SectionModel sectionModel);

    List<ModuleModel> getAllByDtmDeletedIsNullOrderByModuleName();



    @Query( value = "SELECT * FROM module WHERE module.section_id = :pSectionID", nativeQuery = true)
    List<ModuleModel> findAllChildren(@Param("pSectionID") int pSectionID);

    //get deleted
    List<ModuleModel> getAllByDtmDeletedIsNotNullOrderByDtmDeletedDesc();

}
