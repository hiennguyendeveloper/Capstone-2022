package com.EFP.EFP_Video_Dashboard_Backend.models;

import com.EFP.EFP_Video_Dashboard_Backend.models.SectionModel;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "module")
public class ModuleModel {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "module_name", length = 256)
    private String moduleName;

    @Column(name = "module_description", length = 1024)
    private String moduleDescription;

    @Column(name = "dtm_created")
    private LocalDateTime dtmCreated;

    @Column(name = "dtm_updated")
    private LocalDateTime dtmUpdated;

    @Column(name = "dtm_deleted")
    private LocalDateTime dtmDeleted;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "section_id", nullable = false)
    private SectionModel section;

    @Column(name = "picture")
    private String picture;

    public String getPicture(){ return picture; }

    public void setPicture(String picture){ this.picture = picture; }

    public SectionModel getSection() {
        return section;
    }

    public void setSection(SectionModel section) {
        this.section = section;
    }

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

    public LocalDateTime getDtmCreated() {
        return dtmCreated;
    }

    public void setDtmCreated(LocalDateTime dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getModuleDescription() {
        return moduleDescription;
    }

    public void setModuleDescription(String moduleDescription) {
        this.moduleDescription = moduleDescription;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}