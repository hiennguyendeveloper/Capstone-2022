package com.EFP.EFP_Video_Dashboard_Backend.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "section")
public class SectionModel {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "section_name", length = 256)
    private String sectionName;

    @Column(name = "dtm_created")
    private LocalDate dtmCreated;

    @Column(name = "dtm_updated")
    private LocalDateTime dtmUpdated;

    @Column(name = "dtm_deleted")
    private LocalDateTime dtmDeleted;

    public LocalDateTime getDtmDeleted() {
        return dtmDeleted;
    }

    public void setDtmDeleted(LocalDateTime dtmDeleted) {
        this.dtmDeleted = dtmDeleted;
    }

    public LocalDateTime getDtmUpdated() {
        return dtmUpdated;
    }

    public void setDtmUpdated(LocalDateTime dtmUpdated) {
        this.dtmUpdated = dtmUpdated;
    }

    public LocalDate getDtmCreated() {
        return dtmCreated;
    }

    public void setDtmCreated(LocalDate dtmCreated) {
        this.dtmCreated = dtmCreated;
    }


    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}