package com.EFP.EFP_Video_Dashboard_Backend.dto;

import com.EFP.EFP_Video_Dashboard_Backend.models.ModuleModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.val;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModuleDTO {
    private long id;
    private String moduleName;
    private String moduleDescription;
    private LocalDateTime dtmCreated;
    private LocalDateTime dtmUpdated;
    private LocalDateTime dtmDeleted;
    private int section;
    private String picture;



    public static ModuleDTO of(final ModuleModel pModule){
        return new ModuleDTO(
                pModule.getId(),
                pModule.getModuleName(),
                pModule.getModuleDescription(),
                pModule.getDtmCreated(),
                pModule.getDtmUpdated(),
                pModule.getDtmDeleted(),
                pModule.getSection().getId(),
                pModule.getPicture()
        );
    }

    public ModuleModel toModel(final int pId){
        val model = new ModuleModel();
        model.setModuleName(getModuleName());
        model.setModuleDescription(getModuleDescription());
        model.setDtmCreated(getDtmCreated());
        model.setDtmUpdated(getDtmUpdated());
        model.setDtmDeleted(getDtmDeleted());
        model.setSection(model.getSection());

        return model;
    }
}
