package com.EFP.EFP_Video_Dashboard_Backend.dao;

import com.EFP.EFP_Video_Dashboard_Backend.models.VideoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<VideoModel, Integer> {
}
