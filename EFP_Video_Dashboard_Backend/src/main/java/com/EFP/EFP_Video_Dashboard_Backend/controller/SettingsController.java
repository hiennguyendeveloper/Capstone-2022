package com.EFP.EFP_Video_Dashboard_Backend.controller;

import com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller.LessonDeleteException;
import com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller.ModuleDeleteException;
import com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller.SectionDeleteException;
import com.EFP.EFP_Video_Dashboard_Backend.models.LessonModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.ModuleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.SectionModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.UserModel;
import com.EFP.EFP_Video_Dashboard_Backend.services.SettingsService;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;

@RestController
@RequestMapping("/api/v1/settings")
@Slf4j
public class SettingsController {

    @Autowired
    private SettingsService settingsService;





    @GetMapping("/get-deleted-history/users")
    public Collection<UserModel> users(){
        return  settingsService.getDeletedUsers();
    }

    @GetMapping("/get-deleted-history/sections")
    public Collection<SectionModel> sections(){
       return settingsService.getDeletedSections();
    }

    @GetMapping("/get-deleted-history/modules")
    public Collection<ModuleModel> modules(){
        return settingsService.getDeletedModules();
    }

    @GetMapping("/get-deleted-history/lessons")
    public Collection<LessonModel> lessons(){
        return settingsService.getDeletedLessons();
    }


    //============================== Undo ===============================================
    @GetMapping("/undo-deleted-history/user/{id}")
    public Collection<UserModel> undoDeleteUser(@PathVariable("id") int id) {
        val result = settingsService.undoDeleteUser(id);
        if (!result)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("Failed To delete user with id {%d}",id));

     return settingsService.getDeletedUsers();
    }

    @GetMapping("/undo-deleted-history/section/{id}")
    public Collection<SectionModel> undoDeleteSection(@PathVariable("id") int id) throws SectionDeleteException {
        val result = settingsService.undoDeleteSection(id);
        if (!result)
            throw new SectionDeleteException(HttpStatus.BAD_REQUEST, String.format("Failed To delete user with id {%d}",id));

        return settingsService.getDeletedSections();
    }

    @GetMapping("/undo-deleted-history/module/{id}")
    public Collection<ModuleModel> undoDeleteModule(@PathVariable("id") int id) throws ModuleDeleteException {
        val result = settingsService.undoDeleteModule(id);
        if (!result)
            throw new ModuleDeleteException(HttpStatus.BAD_REQUEST, String.format("Failed To delete user with id {%d}",id));

        return settingsService.getDeletedModules();
    }

    @GetMapping("/undo-deleted-history/lesson/{id}")
    public Collection<LessonModel> undoDeleteLesson(@PathVariable("id") int id) throws LessonDeleteException {
        val result = settingsService.undoDeleteLesson(id);
        if (!result)
            throw new LessonDeleteException(HttpStatus.BAD_REQUEST, String.format("Failed To delete user with id {%d}",id));

        return settingsService.getDeletedLessons();
    }

    //============================== Forever Delete ===============================================
    @GetMapping("/forever-deleted-history/user/{id}")
    public Collection<UserModel> foreverDeleteUser(@PathVariable("id") int id) {
        val result = settingsService.foreverDeleteUser(id);
        if (!result)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("Failed To forever delete user with id {%d}",id));

        return settingsService.getDeletedUsers();
    }

    @GetMapping("/forever-deleted-history/section/{id}")
    public Collection<SectionModel> foreverDeleteSection(@PathVariable("id") int id) throws SectionDeleteException {
        val result = settingsService.foreverDeleteSection(id);
        if (!result)
            throw new SectionDeleteException(HttpStatus.BAD_REQUEST, String.format("Failed To forever delete section with id {%d}",id));

        return settingsService.getDeletedSections();
    }

    @GetMapping("/forever-deleted-history/module/{id}")
    public Collection<ModuleModel> foreverDeleteModule(@PathVariable("id") int id) throws ModuleDeleteException {
        val result = settingsService.foreverDeleteModule(id);
        if (!result)
            throw new ModuleDeleteException(HttpStatus.BAD_REQUEST, String.format("Failed To forever delete module with id {%d}",id));

        return settingsService.getDeletedModules();
    }

    @GetMapping("/forever-deleted-history/lesson/{id}")
    public Collection<LessonModel> foreverDeleteLesson(@PathVariable("id") int id) throws LessonDeleteException {
        val result = settingsService.foreverDeleteLesson(id);
        if (!result)
            throw new LessonDeleteException(HttpStatus.BAD_REQUEST, String.format("Failed To forever delete lesson with id {%d}",id));

        return settingsService.getDeletedLessons();
    }



}
