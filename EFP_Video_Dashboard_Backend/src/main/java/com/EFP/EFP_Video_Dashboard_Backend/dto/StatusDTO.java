package com.EFP.EFP_Video_Dashboard_Backend.dto;

import com.EFP.EFP_Video_Dashboard_Backend.models.RoleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.StatusModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatusDTO {

    private int id;
    private String status;

    public static StatusDTO of(final StatusModel pStatus){
        return new StatusDTO(pStatus.getId(),pStatus.getStatus());
    }

}
