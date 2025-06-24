package com.EFP.EFP_Video_Dashboard_Backend;

import com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller.GlobalException;
import com.EFP.EFP_Video_Dashboard_Backend.storage.StorageProperties;
import com.EFP.EFP_Video_Dashboard_Backend.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
@EnableJpaRepositories
@Import(GlobalException.class)
@EnableConfigurationProperties(StorageProperties.class)
public class EfpVideoDashboardBackendApplication extends SpringBootServletInitializer {



	public static void main(String[] args) {
		SpringApplication.run(EfpVideoDashboardBackendApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder){

		return builder.sources(EfpVideoDashboardBackendApplication.class);
	}

	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
//			storageService.deleteAll();
			storageService.init();
		};
	}

}
