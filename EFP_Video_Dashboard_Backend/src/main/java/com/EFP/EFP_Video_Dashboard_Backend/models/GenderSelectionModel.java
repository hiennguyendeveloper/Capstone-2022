package com.EFP.EFP_Video_Dashboard_Backend.models;

import com.EFP.EFP_Video_Dashboard_Backend.models.MentorRequestModel;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "gender_selection")
public class GenderSelectionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "gender", nullable = false, length = 30)
    private String gender;

    @OneToMany(mappedBy = "gender")
    private Set<MentorRequestModel> mentorRequests = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Set<MentorRequestModel> getMentorRequests() {
        return mentorRequests;
    }

    public void setMentorRequests(Set<MentorRequestModel> mentorRequests) {
        this.mentorRequests = mentorRequests;
    }

}