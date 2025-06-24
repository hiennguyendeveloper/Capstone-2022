package com.EFP.EFP_Video_Dashboard_Backend.controller;


import com.EFP.EFP_Video_Dashboard_Backend.dao.LessonRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.ModuleRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.SectionRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dto.ModuleDTO;
import com.EFP.EFP_Video_Dashboard_Backend.dto.SectionDTO;
import com.EFP.EFP_Video_Dashboard_Backend.models.ModuleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.SectionModel;
import com.EFP.EFP_Video_Dashboard_Backend.services.LessonService;
import com.EFP.EFP_Video_Dashboard_Backend.services.ModuleService;
import com.EFP.EFP_Video_Dashboard_Backend.services.NavigationService;
import com.EFP.EFP_Video_Dashboard_Backend.services.SectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/v1/section")
@Slf4j
@RequiredArgsConstructor

public class SectionController {

    @Autowired
    private SectionService sectionService;

    @Autowired
    private SectionRepository sectionRepository;


    @PostMapping("/create-section")
    public SectionDTO create(@RequestBody final SectionDTO pSection) {
        val model = pSection.toModel(Integer.MIN_VALUE);

        SectionModel response = sectionService.saveSection(model);
        return SectionDTO.of(response);
    }

    @GetMapping("/read-section")
    public SectionDTO read(@RequestBody final int pId) {
        SectionModel model = sectionRepository.findById(pId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "A section with that ID does not exist"));
        if (model.getDtmDeleted() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This section has been deleted");
        }
        return SectionDTO.of(model);
    }

    @PostMapping("/update-section")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public SectionDTO update(@RequestBody final SectionDTO pSection) {
        SectionModel model = sectionRepository.findById((int) pSection.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "A section with that ID does not exist"));
        Date input = new Date();
        LocalDateTime date = input.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        model.setDtmUpdated(date);
        model.setSectionName(pSection.getSectionName());
        if (pSection.getDtmDeleted() != null) {
            model.setDtmDeleted(date);
        }

        SectionModel response = sectionService.saveSection(model);
        return SectionDTO.of(response);
    }

    @GetMapping("/delete-section/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSection(@PathVariable("id") int id) {
        try {
            val result = sectionService.deleteSection(id);
            if (result)
                return ResponseEntity.ok().body(Collections.singletonMap("result", true));
            else
                return ResponseEntity.ok().body(Collections.singletonMap("result", false));
        }
        catch (Exception e){
            return ResponseEntity.ok().body(Collections.singletonMap("result", false));
        }

    }

    @GetMapping("/list-sections")
    public Collection<SectionDTO> getSections() {
        return sectionRepository.findByDtmDeletedIsNotNullOrderBySectionName().stream().map(SectionDTO::of).collect(Collectors.toList());
    }


    @GetMapping("/get-sections/{id}")
    public SectionDTO getSections(@PathVariable("id") int id) {
        try {
            val model = sectionRepository.getById(id);
            if (model.getDtmDeleted() != null){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This section has been deleted");
            }
            return SectionDTO.of(model);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This section has been deleted");
        }
    }


}
