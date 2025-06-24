package com.EFP.EFP_Video_Dashboard_Backend.dto;

import com.EFP.EFP_Video_Dashboard_Backend.models.VerificationTokenModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.UserModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerificationTokenModelDto{

    private int id;
    private String token;
    private LocalDateTime dateExpires;
    private UserModel userModel;

    public static VerificationTokenModelDto of(final VerificationTokenModel pModel){
        return new VerificationTokenModelDto(
                pModel.getId(),
                pModel.getToken(),
                pModel.getDateExpires(),
                pModel.getUser()
        );
    }
}
