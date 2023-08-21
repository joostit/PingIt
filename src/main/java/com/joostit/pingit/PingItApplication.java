package com.joostit.pingit;

import com.joostit.pingit.enumeration.Status;
import com.joostit.pingit.repo.ServerRepo;
import com.joostit.pingit.repo.model.Server;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.joostit.pingit.enumeration.Status.*;

@SpringBootApplication
public class PingItApplication {

	public static void main(String[] args) {
		SpringApplication.run(PingItApplication.class, args);
	}

	@Bean
	CommandLineRunner run (ServerRepo serverRepo){
		return args ->{
			serverRepo.save((new Server(null,
					"8.8.8.8",
					"GoogleDns",
					"128GB",
					"DNS",
					"http://localhost:8080/server/image/server1.png", SERVER_UP)));


			serverRepo.save((new Server(null,
					"9.9.9.9",
					"Unknown Thing",
					"8GB",
					"Stuff",
					"http://localhost:8080/server/image/server2.png", SERVER_DOWN)));
	};
	}

}
