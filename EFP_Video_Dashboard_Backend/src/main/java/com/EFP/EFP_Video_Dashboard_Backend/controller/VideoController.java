package com.EFP.EFP_Video_Dashboard_Backend.controller;

import com.EFP.EFP_Video_Dashboard_Backend.dao.VideoRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dto.VideoDTO;
import com.EFP.EFP_Video_Dashboard_Backend.models.VideoModel;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/video")
@Slf4j
public class VideoController {
    @Autowired
    private VideoRepository videoRepository;
    @GetMapping("/getVideoModel/{id}")

    public VideoDTO getModel(@PathVariable("id") int id){
        try {
            val model = videoRepository.getById(id);
            return VideoDTO.of(model);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This video does not exists");
        }

    }
}
