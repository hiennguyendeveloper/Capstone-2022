package com.EFP.EFP_Video_Dashboard_Backend.services;


import com.EFP.EFP_Video_Dashboard_Backend.dao.*;
import com.EFP.EFP_Video_Dashboard_Backend.models.LessonModel;
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
public class LessonService {

        @Autowired
        private  LessonRepository lessonRepository;

        @Autowired
        private ModuleRepository moduleRepository;

        @Autowired
        private SectionRepository sectionRepository;


        public LessonModel saveLesson(LessonModel lesson) {return lessonRepository.save(lesson); }


        public void DeleteLessons(List<LessonModel> lesson){
                for (LessonModel model : lesson) {
                        model.setDtmDeleted(LocalDateTime.now());
                        lessonRepository.save(model);
                }
        }

        public void undoDeleteLessons(List<LessonModel> lessons){
                for (LessonModel lesson : lessons) {
                        lesson.setDtmDeleted(null);
                        lessonRepository.save(lesson);
                }
        }

        public void undoDeleteLesson(int id){
                val lesson = lessonRepository.getById(id);
                val module = moduleRepository.getById(lesson.getModule().getId());
                val section = sectionRepository.getById(module.getSection().getId());

                //undo section
                section.setDtmDeleted(null);
                sectionRepository.save(section);

                //undo module deletion
                module.setDtmDeleted(null);
                moduleRepository.save(module);

                //undo lesson
                lesson.setDtmDeleted(null);
                lessonRepository.save(lesson);

        }

        public void foreverDeleteLesson(int id){
                val lesson = lessonRepository.getById(id);
                lessonRepository.delete(lesson);
        }

}