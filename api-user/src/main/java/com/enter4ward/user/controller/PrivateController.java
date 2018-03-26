package com.enter4ward.user.controller;


import com.enter4ward.user.model.Address;
import com.enter4ward.user.model.Bill;
import com.enter4ward.user.service.AddressService;
import com.enter4ward.user.service.BillService;
import com.enter4ward.user.service.CredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@PreAuthorize("isAuthenticated()")

@RestController
@RequestMapping("/api")
public class PrivateController {

    @Autowired
    private AddressService addressService;
    @Autowired
    private BillService billService;


    @RequestMapping(value = "/address", method = RequestMethod.GET)
    public List<Address> getAddresses(){
        return addressService.getAddresses();
    }

    @RequestMapping(value = "/address", method = RequestMethod.PUT)
    public Address saveAddress(@RequestBody Address address) {
        return addressService.setAddress(address);
    }

    @RequestMapping(value = "/address/{uuid}", method = RequestMethod.DELETE)
    public void deleteAddress(@PathVariable UUID uuid) {
        addressService.deleteAddress(uuid);
    }

    @RequestMapping(value = "/bill", method = RequestMethod.PUT)
    public void createBill(@RequestBody final Bill bill) {
        billService.createBill(bill);
    }
}
