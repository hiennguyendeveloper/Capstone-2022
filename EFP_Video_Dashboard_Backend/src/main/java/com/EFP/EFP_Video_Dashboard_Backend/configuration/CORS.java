package com.EFP.EFP_Video_Dashboard_Backend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class CORS {

    @Autowired
    private Environment env;

    @Bean
    public WebMvcConfigurer getCorsConfiguration(){
        String allowedOrigin = env.getProperty("com.EFP.AllowedOrigin");
        System.out.println("MY SQL PATH =:::::"+allowedOrigin );
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(allowedOrigin)
                        .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }

}
