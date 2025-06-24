package com.EFP.EFP_Video_Dashboard_Backend.services;

import com.EFP.EFP_Video_Dashboard_Backend.dao.LessonRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.ModuleRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.SectionRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.UserRepository;
import com.EFP.EFP_Video_Dashboard_Backend.models.LessonModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.ModuleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.SectionModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.UserModel;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collection;


@Service
@Slf4j
public class SettingsService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private SectionService sectionService;

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

    public Collection<UserModel> getDeletedUsers(){
        try {
            val users = userRepository.findAllByDtmDeletedIsNotNullOrderByDtmDeletedDesc();
            return new ArrayList<>(users);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There are no deleted items.");
        }
    }

    public Collection<SectionModel> getDeletedSections(){
        try {
            val sections = sectionRepository.findAllByDtmDeletedIsNotNullOrderByDtmDeletedDesc();
            return new ArrayList<>(sections);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There are no deleted items.");
        }
    }

    public Collection<ModuleModel> getDeletedModules(){
        try {
            val modules = moduleRepository.getAllByDtmDeletedIsNotNullOrderByDtmDeletedDesc();
            return new ArrayList<>(modules);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There are no deleted items.");
        }
    }

    public Collection<LessonModel> getDeletedLessons(){
        try {
            val lessons = lessonRepository.getAllByDtmDeletedIsNotNullOrderByDtmDeletedDesc();
            return new ArrayList<>(lessons);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There are no deleted items.");
        }
    }

    
//    ================================================ UNDO =================================
    public boolean undoDeleteUser(int id){
        try {
            userService.undoDeleteUser(id);
            return true;
        }
        catch (Exception e){
            log.error("Setting Service -- undoDeleteUser -- could not delete user with id: {}",id);
            return false;
        }
    }

    public boolean undoDeleteSection(int id){
        try {
            sectionService.undoDeleteSection(id);
            this.navigationService.PopulateNavLinks();
            return true;
        }
        catch (Exception e){
            log.error("Setting Service -- undoDeleteSection -- could not delete section with id: {}",id);
            return false;
        }
    }

    public boolean undoDeleteModule(int id) {
        try {
            moduleService.undoDeleteModule(id);
            this.navigationService.PopulateNavLinks();
            return true;
        }
        catch (Exception e){
            log.error("Setting Service -- undoDeleteSection -- could not delete section with id: {}",id);
            return false;
        }
    }

    public boolean undoDeleteLesson(int id) {
        try {
            lessonService.undoDeleteLesson(id);
            this.navigationService.PopulateNavLinks();
            return true;
        }
        catch (Exception e){
            log.error("Setting Service -- undoDeleteSection -- could not delete section with id: {}",id);
            return false;
        }
    }

    //    ================================================ Forever Delete  =================================
    public boolean foreverDeleteUser(int id){
        try {
            userService.foreverDeleteUser(id);
            return true;
        }
        catch (Exception e){
            log.error("Setting Service -- undoDeleteUser -- could not delete user with id: {}",id);
            return false;
        }
    }

    public boolean foreverDeleteSection(int id){
        try {
            sectionService.foreverDeleteSection(id);
            return true;
        }
        catch (Exception e){
            log.error("Setting Service -- undoDeleteUser -- could not delete section with id: {}",id);
            return false;
        }
    }
    
    public boolean foreverDeleteModule(int id){
        try {
            moduleService.foreverDeleteModule(id);
            return true;
        }
        catch (Exception e){
            log.error("Setting Service -- undoDeleteUser -- could not delete module with id: {}",id);
            return false;
        }
    }

    public boolean foreverDeleteLesson(int id){
        try {
            lessonService.foreverDeleteLesson(id);
            return true;
        }
        catch (Exception e){
            log.error("Setting Service -- undoDeleteUser -- could not delete lesson with id: {}",id);
            return false;
        }
    }


  

   
}
