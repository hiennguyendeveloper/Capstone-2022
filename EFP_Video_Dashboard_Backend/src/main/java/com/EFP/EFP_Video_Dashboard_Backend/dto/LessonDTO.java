package com.EFP.EFP_Video_Dashboard_Backend.dto;

import com.EFP.EFP_Video_Dashboard_Backend.models.LessonModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.VideoModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.Workbook;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.val;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonDTO {
    private long id;
    private String LessonName;
    private LocalDateTime dtmCreated;
    private LocalDateTime dtmUpdated;
    private LocalDateTime dtmDeleted;
    private int module;
    private VideoModel video;
    private Workbook workbook;
    private String picture;


    public static LessonDTO of(final LessonModel pLessonModel){

       return new LessonDTO(
                pLessonModel.getId(),
                pLessonModel.getLessonName(),
                pLessonModel.getDtmCreated(),
                pLessonModel.getDtmUpdated(),
                pLessonModel.getDtmDeleted(),
                pLessonModel.getModule().getId(),
                pLessonModel.getVideo(),
                pLessonModel.getWorkbook(),
               pLessonModel.getPicture()
        );
    }

    public LessonModel toModel(final int pId){
        val model = new LessonModel();
        model.setLessonName(getLessonName());
        model.setDtmCreated(getDtmCreated());
        model.setDtmUpdated(getDtmUpdated());
        model.setDtmDeleted(getDtmDeleted());
        model.setModule(model.getModule());
        model.setVideo(model.getVideo());
        model.setWorkbook(model.getWorkbook());
        model.setPicture(model.getPicture());

        return model;
    }

}
