package com.enter4ward.user.controller;


import com.enter4ward.user.model.Address;
import com.enter4ward.user.service.AddressService;
import com.enter4ward.user.service.CredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@PreAuthorize("isAuthenticated()")

@RestController
@RequestMapping("/api")
public class PrivateController {

    @Autowired
    private AddressService addressService;

    @RequestMapping(value = "/address", method = RequestMethod.GET)
    public List<Address> getAddresses(){
        return addressService.getAddresses();
    }
}
