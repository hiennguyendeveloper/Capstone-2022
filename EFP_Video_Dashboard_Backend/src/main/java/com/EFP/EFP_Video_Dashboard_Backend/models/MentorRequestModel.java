package com.EFP.EFP_Video_Dashboard_Backend.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "mentor_request")
public class MentorRequestModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "dtm_created")
    private LocalDateTime dtmCreated;

    @Column(name = "dtm_updated")
    private LocalDateTime dtmUpdated;

    @Column(name = "dtm_deleted")
    private LocalDateTime dtmDeleted;

    @Column(name = "name", length = 100)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, optional = false, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "gender", nullable = false)
    private GenderSelectionModel gender;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.EAGER, optional = false, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "status", nullable = false)
    private MentorRequestStatusModel status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getDtmCreated() {
        return dtmCreated;
    }

    public void setDtmCreated(LocalDateTime dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public LocalDateTime getDtmUpdated() {
        return dtmUpdated;
    }

    public void setDtmUpdated(LocalDateTime dtmUpdated) {
        this.dtmUpdated = dtmUpdated;
    }

    public LocalDateTime getDtmDeleted() {
        return dtmDeleted;
    }

    public void setDtmDeleted(LocalDateTime dtmDeleted) {
        this.dtmDeleted = dtmDeleted;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public GenderSelectionModel getGender() {
        return gender;
    }

    public void setGender(GenderSelectionModel gender) {
        this.gender = gender;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MentorRequestStatusModel getStatus() {
        return status;
    }

    public void setStatus(MentorRequestStatusModel status) {
        this.status = status;
    }

}