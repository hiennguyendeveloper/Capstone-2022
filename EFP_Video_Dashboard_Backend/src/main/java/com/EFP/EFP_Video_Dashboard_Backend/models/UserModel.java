package com.EFP.EFP_Video_Dashboard_Backend.models;


import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "user_details")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "first_name", length = 252)
    private String firstName;

    @Column(name = "email", nullable = false, length = 252)
    private String email;

    @Column(name = "dtm_created", nullable = false)
    private LocalDate dtmCreated;

    @Column(name = "user_password", nullable = false, length = 1025)
    private String userPassword;

    @Column(name = "last_name", length = 252)
    private String lastName;

    @Column(name = "dtm_updated", nullable = false)
    private LocalDate dtmUpdated;

    @Column(name = "dtm_last_login")
    private LocalDateTime dtmLastLogin;

    @Column(name = "user_picture", length = 1024)
    private String userPicture;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status")
    private StatusModel status;

    @Column(name = "progress")
    private Integer progress;

    @ManyToOne(fetch = FetchType.EAGER, optional = false,cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_role", nullable = false)
    private RoleModel userRole;

    @Column(name = "enabled")
    private boolean enabled;


    @Column(name = "dtm_deleted")
    private LocalDateTime dtmDeleted;

    public LocalDateTime getDtmDeleted() {
        return dtmDeleted;
    }

    public void setDtmDeleted(LocalDateTime dtmDeleted) {
        this.dtmDeleted = dtmDeleted;
    }

    public UserModel() {
        super();
        this.enabled=false;
    }

    public void setUserRole(RoleModel userRole) {
        this.userRole = userRole;
    }

    public RoleModel getUserRole() { return userRole; }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public StatusModel getStatus() {
        return status;
    }

    public void setStatus(StatusModel status) {
        this.status = status;
    }

    public String getUserPicture() {
        return userPicture;
    }

    public void setUserPicture(String userPicture) {
        this.userPicture = userPicture;
    }

    public LocalDateTime getDtmLastLogin() {
        return dtmLastLogin;
    }

    public void setDtmLastLogin(LocalDateTime dtmLastLogin) {
        this.dtmLastLogin = dtmLastLogin;
    }

    public LocalDate getDtmUpdated() {
        return dtmUpdated;
    }

    public void setDtmUpdated(LocalDate dtmUpdated) {
        this.dtmUpdated = dtmUpdated;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public LocalDate getDtmCreated() {
        return dtmCreated;
    }

    public void setDtmCreated(LocalDate dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean getEnabled(){ return this.enabled;    }

    public void setEnabled(boolean enabled){ this.enabled = enabled;}


}