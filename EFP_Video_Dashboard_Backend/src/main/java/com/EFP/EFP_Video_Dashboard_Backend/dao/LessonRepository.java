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
public interface LessonRepository extends JpaRepository<LessonModel,Integer> {
    @Query( value = "SELECT * FROM lesson ORDER BY lesson_name",
            nativeQuery = true )
    List<LessonModel> byName();

    List<LessonModel> getAllByModuleAndDtmDeletedIsNullOrderByLessonName(ModuleModel moduleModel);

    List<LessonModel> getAllByDtmDeletedIsNullOrderByLessonName();



    @Query( value = "SELECT * FROM lesson WHERE module_id = :PModuleID", nativeQuery = true)
    List<LessonModel> findAllChildren(@Param("PModuleID") int PModuleID);

    //get deleted
    List<LessonModel> getAllByDtmDeletedIsNotNullOrderByDtmDeletedDesc();
}
