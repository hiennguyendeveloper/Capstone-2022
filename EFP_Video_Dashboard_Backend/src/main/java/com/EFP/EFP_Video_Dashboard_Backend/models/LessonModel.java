package com.EFP.EFP_Video_Dashboard_Backend.models;

import com.EFP.EFP_Video_Dashboard_Backend.models.ModuleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.VideoModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.Workbook;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "lesson")
public class LessonModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "lesson_name", length = 256)
    private String lessonName;

    @Column(name = "dtm_created")
    private LocalDateTime dtmCreated;

    @Column(name = "dtm_updated")
    private LocalDateTime dtmUpdated;

    @Column(name = "dtm_deleted")
    private LocalDateTime dtmDeleted;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "module_id", nullable = false)
    private ModuleModel module;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "workbook_id")
    private Workbook workbook;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "video_id")
    private VideoModel video;

    @Column(name = "picture")
    private String picture;

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public VideoModel getVideo() {
        return video;
    }

    public void setVideo(VideoModel video) {
        this.video = video;
    }

    public Workbook getWorkbook() {
        return workbook;
    }

    public void setWorkbook(Workbook workbook) {
        this.workbook = workbook;
    }

    public ModuleModel getModule() {
        return module;
    }

    public void setModule(ModuleModel module) {
        this.module = module;
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

    public String getLessonName() {
        return lessonName;
    }

    public void setLessonName(String lessonName) {
        this.lessonName = lessonName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}