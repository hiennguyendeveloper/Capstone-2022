package com.EFP.EFP_Video_Dashboard_Backend.dao;

import com.EFP.EFP_Video_Dashboard_Backend.models.StatusModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<StatusModel,Integer> {

    @Query( value = "SELECT * FROM status ORDER BY status", nativeQuery = true  )
    List<StatusModel> byStatus();

}
