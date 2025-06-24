package com.EFP.EFP_Video_Dashboard_Backend.models;

import com.EFP.EFP_Video_Dashboard_Backend.models.MentorRequestModel;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "mentor_request_status")
public class MentorRequestStatusModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "status", nullable = false, length = 30)
    private String status;

    @OneToMany(mappedBy = "status")
    private Set<MentorRequestModel> mentorRequests = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<MentorRequestModel> getMentorRequests() {
        return mentorRequests;
    }

    public void setMentorRequests(Set<MentorRequestModel> mentorRequests) {
        this.mentorRequests = mentorRequests;
    }

}