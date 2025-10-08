package com.SpringbootProject.SeekerService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class SeekerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeekerServiceApplication.class, args);
        System.out.println("🚀 Seeker Service Started on PORT 8086");
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}