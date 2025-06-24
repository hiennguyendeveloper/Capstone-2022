package com.EFP.EFP_Video_Dashboard_Backend.services;


import com.EFP.EFP_Video_Dashboard_Backend.dao.LessonRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.ModuleRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.SectionRepository;
import com.EFP.EFP_Video_Dashboard_Backend.models.ModuleModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ModuleService {

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LessonService lessonService;


    public ModuleModel saveModule(ModuleModel module) {
        return moduleRepository.save(module);
    }

    public void DeleteModules(List<ModuleModel> modules){
        for (ModuleModel module :modules) {
            module.setDtmDeleted(LocalDateTime.now());
            moduleRepository.save(module);
        }
    }

    public boolean DeleteModule(int id){
        try {
            val model = moduleRepository.getById(id);
            val lessons = lessonRepository.findAllChildren(model.getId());
            lessonService.DeleteLessons(lessons);

            model.setDtmDeleted(LocalDateTime.now());
            moduleRepository.save(model);
            return true;
        }
        catch (Exception e){
            return false;
        }

    }

    public void undoDeleteModules(List<ModuleModel> modules){
        for (ModuleModel module :modules) {
            module.setDtmDeleted(null);
            moduleRepository.save(module);
        }
    }

    public void undoDeleteModule(int id){
            val module = moduleRepository.getById(id);
            val section = module.getSection();
            val lessons = lessonRepository.findAllChildren(module.getId());

            //undo section
            section.setDtmDeleted(null);
            sectionRepository.save(section);

            //undo module
            module.setDtmDeleted(null);
            moduleRepository.save(module);

    }

    public void foreverDeleteModule(int id){
        val model = moduleRepository.getById(id);
        val lessons = lessonRepository.findAllChildren(model.getId());
        lessonRepository.deleteAll(lessons);
        moduleRepository.delete(model);
    }

}
