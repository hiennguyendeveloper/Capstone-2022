package com.EFP.EFP_Video_Dashboard_Backend.controller;

import com.EFP.EFP_Video_Dashboard_Backend.dao.GenderSelectionRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.MentorRequestRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.MentorRequestStatusRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dto.MentorRequestDTO;
import com.EFP.EFP_Video_Dashboard_Backend.models.MentorRequestModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/mentor_request")
@Slf4j
@RequiredArgsConstructor
public class MentorRequestController {

    @Autowired
    private MentorRequestRepository mentorRequestRepository;

    @Autowired
    private GenderSelectionRepository genderSelectionRepository;

    @Autowired
    private MentorRequestStatusRepository mentorRequestStatusRepository;


    @GetMapping("/requests")
    public Collection<MentorRequestDTO> userGet(){
        return mentorRequestRepository.findAll().stream()
                .map(MentorRequestDTO::of)
                .collect(Collectors.toList());
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Boolean>> create(@RequestBody final MentorRequestDTO pRequest) {
        try{
            val request = pRequest.toModel(Integer.MAX_VALUE);
            request.setGender(genderSelectionRepository.getById(pRequest.getGender()));
            request.setStatus(mentorRequestStatusRepository.getById(2));

            val result = mentorRequestRepository.save(request);
            if (result.getId()!=null)
                return ResponseEntity.ok().body(Collections.singletonMap("response", true));
            else
                return ResponseEntity.ok().body(Collections.singletonMap("response", false));
        }
        catch (Exception e){
            return ResponseEntity.ok().body(Collections.singletonMap("response", false));
        }
    }


}
