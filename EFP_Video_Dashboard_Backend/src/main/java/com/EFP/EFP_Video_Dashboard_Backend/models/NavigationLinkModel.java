package com.EFP.EFP_Video_Dashboard_Backend.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "navigation_links")
@Getter
@Setter
@ToString
public class NavigationLinkModel {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "display_name", length = 256)
    private String displayName;

    @Column(name = "url", length = 256)
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "link_type")
    private NavigationLinkTypeModel linkType;

    @Column(name = "class_name", length = 256)
    private String className;

    @Column(name = "object_id", nullable = false)
    private Integer objectId;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getClassName(){ return className;}

    public void serClassName(String classname){ this.className = classname;}
}