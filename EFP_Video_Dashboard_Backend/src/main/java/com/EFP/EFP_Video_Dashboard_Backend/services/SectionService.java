package com.EFP.EFP_Video_Dashboard_Backend.services;

import com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller.SectionDeleteException;
import com.EFP.EFP_Video_Dashboard_Backend.dao.LessonRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.ModuleRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.SectionRepository;
import com.EFP.EFP_Video_Dashboard_Backend.models.ModuleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.SectionModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SectionService {

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private ModuleService moduleService;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LessonService lessonService;

    @Autowired
    private NavigationService navigationService;

    public SectionModel saveSection(SectionModel section) {
        return sectionRepository.save(section);
    }

    public boolean deleteSection(int id) {
        try {
            val model = sectionRepository.getById(id);
            val modules = moduleRepository.findAllChildren(model.getId());
            for (ModuleModel module: modules) {
                val lessons = lessonRepository.findAllChildren(module.getId());
                lessonService.DeleteLessons(lessons);
            }

            model.setDtmDeleted(LocalDateTime.now());
            sectionRepository.save(model);
            moduleService.DeleteModules(modules);
            navigationService.PopulateNavLinks();
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    public void undoDeleteSection(int id) {
        try {
            val section = sectionRepository.getById(id);
            section.setDtmDeleted(null);
            sectionRepository.save(section);

            navigationService.PopulateNavLinks();
        }
        catch (Exception e){
            log.error("Section Service -- undo delete");
        }
    }

    public void foreverDeleteSection(int id) {
        try {
            val section = sectionRepository.getById(id);
            val modules = moduleRepository.findAllChildren(section.getId());
            //forever delete all lessons
            for (ModuleModel module: modules) {
                val lessons = lessonRepository.findAllChildren(module.getId());
                lessonRepository.deleteAll(lessons);
            }

            //forever delete all modules
            moduleRepository.deleteAll(modules);
            //forever delete section
            sectionRepository.delete(section);

            navigationService.PopulateNavLinks();

        }
        catch (EntityNotFoundException e) {
            throw new SectionDeleteException(HttpStatus.BAD_REQUEST, String.format("Failed To forever delete section with id {%d}", id));
        }
        catch (Exception e){
            log.error("Section Service -- foreverDeleteSection");
        }


    }

}
