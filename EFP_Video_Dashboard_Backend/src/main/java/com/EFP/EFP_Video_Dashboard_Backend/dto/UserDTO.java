package com.EFP.EFP_Video_Dashboard_Backend.dto;

import com.EFP.EFP_Video_Dashboard_Backend.models.RoleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.StatusModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.UserModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.val;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
public class UserDTO {

    private int id;
    private String first_name;
    private String last_name;
    private String email;
    private String picture;
    private String password;
    private RoleModel role;
    private StatusModel status;
    private int progress;
    private LocalDate dtm_created;
    private LocalDate dtm_updated;
    private LocalDateTime dtm_last_login;


    public UserModel toModel(final int pId){
        val model = new UserModel();
        model.setFirstName(getFirst_name());
        model.setLastName(getLast_name());
        model.setEmail(getEmail());
        model.setUserPicture(getPicture());
        model.setUserPassword(getPassword());
        model.setUserRole(getRole());
        model.setStatus(getStatus());
        model.setProgress(getProgress());
        model.setDtmCreated(getDtm_created());
        model.setDtmUpdated(getDtm_updated());
        model.setDtmLastLogin(getDtm_last_login());

        return model;
    }

    public static UserDTO of(final UserModel model){
        return new UserDTO(
                model.getId(),
                model.getFirstName(),
                model.getLastName(),
                model.getEmail(),
                model.getUserPicture(),
                model.getUserPassword(),
                model.getUserRole(),
                model.getStatus(),
                model.getProgress(),
                model.getDtmCreated(),
                model.getDtmUpdated(),
                model.getDtmLastLogin()

        );
    }

    public UserModel toModelCreateSubSubscriber(final int pId){
        val model = new UserModel();
        model.setFirstName(getFirst_name());
        model.setLastName(getLast_name());
        model.setEmail(getEmail());
        model.setUserPassword(getPassword());
        model.setDtmCreated(getDtm_created());
        model.setDtmUpdated(getDtm_updated());
        return model;
    }

}
