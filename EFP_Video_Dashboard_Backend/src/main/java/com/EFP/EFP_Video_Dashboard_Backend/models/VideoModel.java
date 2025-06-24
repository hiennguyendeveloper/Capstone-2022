package com.EFP.EFP_Video_Dashboard_Backend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.content.commons.annotations.ContentId;
import org.springframework.content.commons.annotations.ContentLength;
import org.springframework.content.commons.annotations.MimeType;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "videos")
public class VideoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_id", nullable = false)
    private Integer id;

    @Column(name = "video_name", length = 256)
    private String videoName;

    @Column(name = "video_description", length = 1024)
    private String videoDescription;

    @Column(name = "video_path", length = 1024)
    private String videoPath;

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

    public String getVideoPath() {
        return videoPath;
    }

    public void setVideoPath(String videoPath) {
        this.videoPath = videoPath;
    }

    public String getVideoDescription() {
        return videoDescription;
    }

    public void setVideoDescription(String videoDescription) {
        this.videoDescription = videoDescription;
    }

    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}