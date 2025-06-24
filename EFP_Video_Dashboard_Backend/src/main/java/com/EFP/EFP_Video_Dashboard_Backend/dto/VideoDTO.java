package com.EFP.EFP_Video_Dashboard_Backend.dto;

import com.EFP.EFP_Video_Dashboard_Backend.models.VideoModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.val;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoDTO {
    private long id;
    private String videoName;
    private String videoDescription;
    private String video_path;
    private LocalDate dtmCreated;
    private LocalDate dtmUpdated;
    private LocalDate dtmDeleted;

    public static VideoDTO of(final VideoModel pVideo){
        return new VideoDTO(
                pVideo.getId(),
                pVideo.getVideoName(),
                pVideo.getVideoDescription(),
                pVideo.getVideoPath(),
                pVideo.getDtmCreated(),
                pVideo.getDtmUpdated(),
                pVideo.getDtmDeleted()
        );
    }

    public VideoModel toModel(final int pId){
        val model = new VideoModel();
        model.setVideoName(getVideoName());
        model.setVideoDescription(getVideoDescription());
        model.setVideoPath(getVideo_path());
        model.setDtmCreated(getDtmCreated());
        model.setDtmUpdated(getDtmUpdated());
        model.setDtmDeleted(getDtmDeleted());

        return model;
    }

}
