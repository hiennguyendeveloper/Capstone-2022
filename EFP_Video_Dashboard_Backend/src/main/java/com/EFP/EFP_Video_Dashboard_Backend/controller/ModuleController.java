package com.EFP.EFP_Video_Dashboard_Backend.controller;


import com.EFP.EFP_Video_Dashboard_Backend.dao.LessonRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.ModuleRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.SectionRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dto.ModuleDTO;
import com.EFP.EFP_Video_Dashboard_Backend.models.ModuleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.SectionModel;
import com.EFP.EFP_Video_Dashboard_Backend.services.LessonService;
import com.EFP.EFP_Video_Dashboard_Backend.services.ModuleService;
import com.EFP.EFP_Video_Dashboard_Backend.services.NavigationService;
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
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/module")
@Slf4j
@RequiredArgsConstructor
public class ModuleController {

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private ModuleService moduleService;

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private LessonService lessonService;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private NavigationService navigationService;


    @PostMapping("/create-module")
    public Collection<ModuleDTO> create(@RequestBody final ModuleDTO pModule) {
        val model = pModule.toModel(Integer.MIN_VALUE);
        SectionModel sectionModel = sectionRepository.findById(pModule.getSection()).orElseThrow();
        model.setSection(sectionModel);

        ModuleModel response = moduleService.saveModule(model);
        return moduleRepository.getAllBySectionAndDtmDeletedIsNullOrderByModuleName(response.getSection()).stream().map(ModuleDTO::of).collect(Collectors.toList());
    }

    @GetMapping("/read-module")
    public ModuleDTO read(@RequestBody final int pId) {
        ModuleModel model = moduleRepository.findById(pId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "A module with that ID does not exist"));
        if (model.getDtmDeleted() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This module has been deleted");
        }
        return ModuleDTO.of(model);
    }

    @PostMapping("/update-module")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public ModuleDTO update(@RequestBody final ModuleDTO pModule) {
        ModuleModel model = moduleRepository.findById((int) pModule.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "A module with that ID does not exist"));
        Date input = new Date();
        LocalDateTime date = input.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        model.setDtmUpdated(date);
        model.setModuleName(pModule.getModuleName());
        if (pModule.getDtmDeleted() != null) {
            model.setDtmDeleted(date);
        }
        if (pModule.getPicture() != null){
            model.setPicture(pModule.getPicture());
        }
        if (pModule.getModuleDescription() != null){
            model.setModuleDescription(pModule.getModuleDescription());
        }

        ModuleModel response = moduleService.saveModule(model);
        return ModuleDTO.of(response);
    }

    @GetMapping("/delete-module/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteModule(@PathVariable("id") int id) {

        val result = moduleService.DeleteModule(id);
        if (result)
            return ResponseEntity.ok().body(Collections.singletonMap("result", true));
        else
            return ResponseEntity.ok().body(Collections.singletonMap("result", false));
    }

    @GetMapping("/list-module")
    public Collection<ModuleDTO> getModules() {
        return moduleRepository.getAllByDtmDeletedIsNullOrderByModuleName().stream().map(ModuleDTO::of).toList();
    }

    @GetMapping("/list-module/{id}")
    public Collection<ModuleDTO> getModulesForSection(@PathVariable("id") int id){
        val section = sectionRepository.getById(id);
        Collection<ModuleDTO> modules = moduleRepository.getAllBySectionAndDtmDeletedIsNullOrderByModuleName(section).stream().map(ModuleDTO::of).toList();
        log.warn("ModuleController -- list-module w/id: {} -- {}",id,modules);
        return modules;
    }

    @GetMapping("/get_module_details/{id}")
    public ModuleDTO getModuleDetails(@PathVariable("id") int id){
        try {
            log.warn("ModuleController -- getModuleDetails -- {}",id);
            val model = moduleRepository.getById(id);
            if (model.getDtmDeleted() != null){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This module has been deleted");
            }
            return ModuleDTO.of(model);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This module has been deleted");
        }


    }

}
