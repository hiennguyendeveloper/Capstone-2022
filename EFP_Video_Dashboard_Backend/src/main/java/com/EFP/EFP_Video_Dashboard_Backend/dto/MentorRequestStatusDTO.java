package com.EFP.EFP_Video_Dashboard_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MentorRequestStatusDTO {
    private Integer id;
    private Integer status;

    public static MentorRequestStatusDTO of(final MentorRequestStatusDTO pModel){
        return new MentorRequestStatusDTO(
                pModel.getId(),
                pModel.getStatus()
        );
    }
}
