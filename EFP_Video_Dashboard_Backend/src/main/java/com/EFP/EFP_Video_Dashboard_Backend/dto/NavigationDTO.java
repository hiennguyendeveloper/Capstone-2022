package com.EFP.EFP_Video_Dashboard_Backend.dto;


import com.EFP.EFP_Video_Dashboard_Backend.models.NavigationLinkModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.NavigationLinkTypeModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.val;

import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NavigationDTO {

    private int id;
    private String displayName;
    private String url;
    private int linkType;
    private String className;
    private int objectId;

    public static NavigationDTO of(final NavigationLinkModel pLink){
        return new NavigationDTO(
                pLink.getId(),
                pLink.getDisplayName(),
                pLink.getUrl(),
                pLink.getLinkType().getId(),
                pLink.getClassName(),
                pLink.getObjectId()
        );
    }

    public NavigationLinkModel toModel(final int pid){
        val model = new NavigationLinkModel();
        model.setDisplayName(model.getDisplayName());
        model.setUrl(model.getUrl());
        model.setLinkType(model.getLinkType());
        model.setClassName(model.getClassName());

        return model;
    }

}
