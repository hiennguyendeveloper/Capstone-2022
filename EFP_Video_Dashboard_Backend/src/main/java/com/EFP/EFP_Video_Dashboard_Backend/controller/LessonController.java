package com.EFP.EFP_Video_Dashboard_Backend.controller;

import com.EFP.EFP_Video_Dashboard_Backend.dao.LessonRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.ModuleRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.VideoRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.WorkbookRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dto.LessonDTO;
import com.EFP.EFP_Video_Dashboard_Backend.dto.ModuleDTO;
import com.EFP.EFP_Video_Dashboard_Backend.models.LessonModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.ModuleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.VideoModel;
import com.EFP.EFP_Video_Dashboard_Backend.services.LessonService;
import com.EFP.EFP_Video_Dashboard_Backend.services.NavigationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
@RequestMapping("/api/v1/lesson")
@Slf4j
@RequiredArgsConstructor
public class LessonController {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LessonService lessonService;

    @Autowired
    private ModuleRepository moduleRepo;

    @Autowired
    private NavigationService navigationService;

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private WorkbookRepository workbookRepository;

    @PostMapping("/create-lesson")
    public Collection<LessonDTO> create(@RequestBody final LessonDTO pLesson) {
        val model = pLesson.toModel(Integer.MIN_VALUE);
        ModuleModel moduleModel = moduleRepo.findById(pLesson.getModule()).orElseThrow();
        model.setModule(moduleModel);
        LessonModel response = lessonService.saveLesson(model);

        return lessonRepository.getAllByModuleAndDtmDeletedIsNullOrderByLessonName(response.getModule()).stream().map(LessonDTO::of).collect(Collectors.toList());
    }

    @GetMapping("/read-lesson")
    public LessonDTO read(@RequestBody final int pId) {
        LessonModel model = lessonRepository.findById(pId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "A lesson with that ID does not exist"));
        if (model.getDtmDeleted() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This module has been deleted");
        }
        return LessonDTO.of(model);
    }

    @PostMapping("/update-lesson")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @Transactional
    public LessonDTO update(@RequestBody final LessonDTO pLesson) {
        LessonModel model = lessonRepository.findById((int) pLesson.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "A module with that ID does not exist"));
        Date input = new Date();
        LocalDateTime date = input.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        model.setDtmUpdated(date);

        if (pLesson.getLessonName() != null)
            model.setLessonName(pLesson.getLessonName());

        if (pLesson.getVideo() != null) {
            val videos = videoRepository.save(pLesson.getVideo());
            model.setVideo(videos);
        }

        if (pLesson.getWorkbook() != null) {
            val workbook = workbookRepository.save(pLesson.getWorkbook());
            model.setWorkbook(workbook);
        }

        if (pLesson.getPicture() != null)
            model.setPicture(pLesson.getPicture());


        LessonModel response = lessonService.saveLesson(model);
        return LessonDTO.of(response);
    }

    @GetMapping("/delete-lesson/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteLesson(@PathVariable("id") int id) throws Exception {

        val model = lessonRepository.getById(id);
        model.setDtmDeleted(LocalDateTime.now());
        lessonRepository.save(model);
        navigationService.PopulateNavLinks();
        return ResponseEntity.ok().body(Collections.singletonMap("result", true));
    }

    @GetMapping("/list-lesson")
    public Collection<LessonDTO> getLessons() {
        return lessonRepository.getAllByDtmDeletedIsNullOrderByLessonName().stream().map(LessonDTO::of).collect(Collectors.toList());
    }

    @GetMapping("/list-lesson/{id}")
    public Collection<LessonDTO> getLessonsForModule(@PathVariable("id") int id){
        log.warn("LessonController -- list-lesson w/id: {}",id);
        val module = moduleRepo.getById(id);
        Collection<LessonDTO> lessons = lessonRepository.getAllByModuleAndDtmDeletedIsNullOrderByLessonName(module).stream().map(LessonDTO::of).toList();
        lessons.forEach(lesson -> log.error(String.valueOf(lesson)));
        return lessons;
    }

    @GetMapping("/get_lesson_details/{id}")
    public LessonDTO getLessonDetails(@PathVariable("id") int id){
        log.warn("ModuleController -- getModuleDetails -- {}",id);
        val model = lessonRepository.getById(id);
        if(model.getId()==null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This lesson does not exist!");
        }
        if(model.getDtmDeleted() != null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This lesson has been deleted");
        }
        return LessonDTO.of(model);
    }


}
