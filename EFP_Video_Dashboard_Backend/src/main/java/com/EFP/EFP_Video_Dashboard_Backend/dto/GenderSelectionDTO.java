package com.EFP.EFP_Video_Dashboard_Backend.dto;


import com.EFP.EFP_Video_Dashboard_Backend.models.GenderSelectionModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GenderSelectionDTO {
    private Integer id;
    private String gender;

    public static GenderSelectionDTO of(final GenderSelectionModel pModel){
        return new GenderSelectionDTO(
                pModel.getId(),
                pModel.getGender()
        );
    }
}
