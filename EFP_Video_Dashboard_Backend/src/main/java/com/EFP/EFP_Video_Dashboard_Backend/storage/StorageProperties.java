package com.EFP.EFP_Video_Dashboard_Backend.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class StorageProperties {
    private String location;

    public String getLocation() {
        System.out.println("MY STORAGE PATH =:::::"+location );
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
