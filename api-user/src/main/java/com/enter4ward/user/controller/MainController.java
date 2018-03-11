package com.enter4ward.user.controller;


import com.enter4ward.user.security.JwtAuthentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.TreeMap;

//@PreAuthorize("true")
@RestController
@RequestMapping("/api")
public class MainController {

    @RequestMapping("/info")
    public Map<String, Object> version() {
        Map<String, Object> result = new TreeMap<>();
        result.put("version", "1.0");

        JwtAuthentication authentication = (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
        if(authentication!=null){
            result.put("userId", authentication.getUserId());
        }
        return result;
    }
}
