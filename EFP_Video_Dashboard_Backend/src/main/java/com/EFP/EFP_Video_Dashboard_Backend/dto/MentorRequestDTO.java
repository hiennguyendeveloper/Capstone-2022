package com.EFP.EFP_Video_Dashboard_Backend.dto;


import com.EFP.EFP_Video_Dashboard_Backend.models.GenderSelectionModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.MentorRequestModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.MentorRequestStatusModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.val;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MentorRequestDTO {

    private Integer id;
    private LocalDateTime dtmCreated;
    private LocalDateTime dtmUpdated;
    private LocalDateTime dtmDeleted;
    private String name;
    private Integer gender;
    private String description;
    private Integer status;

    public static MentorRequestDTO of(final MentorRequestModel pModule) {
        return new MentorRequestDTO(
                pModule.getId(),
                pModule.getDtmCreated(),
                pModule.getDtmUpdated(),
                pModule.getDtmDeleted(),
                pModule.getName(),
                pModule.getGender().getId(),
                pModule.getDescription(),
                pModule.getStatus().getId()
        );

    }

    public MentorRequestModel toModel(final int pId){
        val model = new MentorRequestModel();
        model.setDtmCreated(LocalDateTime.now());
        model.setDtmUpdated(LocalDateTime.now());
        model.setDtmDeleted(null);
        model.setName(getName());
        model.setDescription(getDescription());
        return model;
    }


}