package com.EFP.EFP_Video_Dashboard_Backend.dto;


import com.EFP.EFP_Video_Dashboard_Backend.models.RoleModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class RoleDTO {

    private int id;
    private String role;

    public static RoleDTO of(final RoleModel pRole){
        return new RoleDTO(pRole.getId(),pRole.getRole());
    }


}
