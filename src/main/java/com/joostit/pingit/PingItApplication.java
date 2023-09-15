package com.joostit.pingit;

import com.joostit.pingit.enumeration.Status;
import com.joostit.pingit.repo.ServerRepo;
import com.joostit.pingit.repo.model.Server;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


import java.util.Arrays;
import java.util.List;

import static com.joostit.pingit.enumeration.Status.*;

@SpringBootApplication
public class PingItApplication {

	public static void main(String[] args) {
		SpringApplication.run(PingItApplication.class, args);
	}

	@Bean
	CommandLineRunner run (ServerRepo serverRepo) {
		return args -> {
			serverRepo.save((new Server(null,
					"8.8.8.8",
					"GoogleDns",
					"128GB",
					"DNS",
					"server1.png", SERVER_UP)));


			serverRepo.save((new Server(null,
					"9.9.9.9",
					"Unknown Thing",
					"8GB",
					"Stuff",
					"server2.png", SERVER_DOWN)));
		};


	}

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:4200", CorsConfiguration.ALL));
		corsConfiguration.setAllowedHeaders(List.of("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Jwt-Token", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(List.of("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials",
				"File-Name"));
		corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT",  "PATCH","DELETE", "OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}



}
