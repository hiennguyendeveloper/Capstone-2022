package com.EFP.EFP_Video_Dashboard_Backend.configuration;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.MimeMappings;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.stereotype.Component;

@Component
public class ServletConfiguration implements WebServerFactoryCustomizer<TomcatServletWebServerFactory> {

    @Override
    public void customize(TomcatServletWebServerFactory factory) {
        MimeMappings mappings = new MimeMappings(MimeMappings.DEFAULT);
        mappings.add("webm", "video/webm");
        mappings.add("mp4", "video/mp4");
        mappings.add("video/mp4", "video/mp4");
        factory.setMimeMappings(mappings);
    }
}


