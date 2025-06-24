package com.EFP.EFP_Video_Dashboard_Backend.models;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "navigation_link_type")
public class NavigationLinkTypeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "link_type", nullable = false, length = 256)
    private String linkType;

    @OneToMany(mappedBy = "linkType")
    private Set<NavigationLinkModel> navigationLinks = new LinkedHashSet<>();

    public Set<NavigationLinkModel> getNavigationLinks() {
        return navigationLinks;
    }

    public void setNavigationLinks(Set<NavigationLinkModel> navigationLinks) {
        this.navigationLinks = navigationLinks;
    }


    public String getLinkType() {
        return linkType;
    }

    public void setLinkType(String linkType) {
        this.linkType = linkType;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}