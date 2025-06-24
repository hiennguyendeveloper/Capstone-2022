package com.EFP.EFP_Video_Dashboard_Backend.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "verification_tokens")
public class VerificationTokenModel {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "token", nullable = false, length = 256)
    private String token;

    @Column(name = "date_expires", nullable = false)
    private LocalDateTime dateExpires;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public LocalDateTime getDateExpires() {
        return dateExpires;
    }

    public void setDateExpires(LocalDateTime dateExpires) {
        this.dateExpires = dateExpires;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}