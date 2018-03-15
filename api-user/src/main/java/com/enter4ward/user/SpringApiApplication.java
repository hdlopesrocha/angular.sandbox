package com.enter4ward.user;

import com.github.mongobee.Mongobee;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@SpringBootApplication
public class SpringApiApplication {

    @Bean
    public Mongobee mongobee(){
        Mongobee runner = new Mongobee("mongodb://localhost:27017/sandbox");
        runner.setDbName("sandbox");
        runner.setChangeLogsScanPackage("com.enter4ward.user.changelog");
        return runner;
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringApiApplication.class, args);
    }


}
