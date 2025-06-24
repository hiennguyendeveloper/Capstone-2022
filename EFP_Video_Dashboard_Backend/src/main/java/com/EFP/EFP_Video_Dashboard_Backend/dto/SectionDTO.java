package com.EFP.EFP_Video_Dashboard_Backend.dto;

import com.EFP.EFP_Video_Dashboard_Backend.models.SectionModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.val;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectionDTO {

    private long id;
    private String sectionName;
    private LocalDate dtmCreated;
    private LocalDateTime dtmUpdated;
    private LocalDateTime dtmDeleted;



    public static SectionDTO of(final SectionModel pSection){
        return new SectionDTO(
                pSection.getId(),
                pSection.getSectionName(),
                pSection.getDtmCreated(),
                pSection.getDtmUpdated(),
                pSection.getDtmDeleted()
        );
    }

    public SectionModel toModel(final int pId){
        val model = new SectionModel();
        model.setSectionName(getSectionName());
        model.setDtmCreated(getDtmCreated());
        model.setDtmUpdated(getDtmUpdated());
        model.setDtmDeleted(getDtmDeleted());

        return model;
    }
}
