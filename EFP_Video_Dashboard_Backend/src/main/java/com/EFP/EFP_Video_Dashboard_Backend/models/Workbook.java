package com.EFP.EFP_Video_Dashboard_Backend.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "workbook")
public class Workbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workbook_id", nullable = false)
    private Integer id;

    @Column(name = "workbook_name", length = 1024)
    private String workbookName;

    @Column(name = "workbook_path", length = 1024)
    private String workbookPath;

    @Column(name = "dtm_created")
    private LocalDate dtmCreated;

    @Column(name = "dtm_updated")
    private LocalDate dtmUpdated;

    @Column(name = "dtm_deleted")
    private LocalDate dtmDeleted;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lesson_id")
    private LessonModel lesson;

    public LessonModel getLesson() {
        return lesson;
    }

    public void setLesson(LessonModel lesson) {
        this.lesson = lesson;
    }

    public LocalDate getDtmDeleted() {
        return dtmDeleted;
    }

    public void setDtmDeleted(LocalDate dtmDeleted) {
        this.dtmDeleted = dtmDeleted;
    }

    public LocalDate getDtmUpdated() {
        return dtmUpdated;
    }

    public void setDtmUpdated(LocalDate dtmUpdated) {
        this.dtmUpdated = dtmUpdated;
    }

    public LocalDate getDtmCreated() {
        return dtmCreated;
    }

    public void setDtmCreated(LocalDate dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public String getWorkbookPath() {
        return workbookPath;
    }

    public void setWorkbookPath(String workbookPath) {
        this.workbookPath = workbookPath;
    }

    public String getWorkbookName() {
        return workbookName;
    }

    public void setWorkbookName(String workbookName) {
        this.workbookName = workbookName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}