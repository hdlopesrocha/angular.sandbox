package com.enter4ward.user.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MainController {

  @RequestMapping("/version")
  public String version() {
    return "Hello, world!";
  }
}
