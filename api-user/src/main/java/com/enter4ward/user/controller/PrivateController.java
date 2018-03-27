package com.enter4ward.user.controller;


import com.enter4ward.user.command.CreateOrderCommand;
import com.enter4ward.user.command.SaveAddressCommand;
import com.enter4ward.user.command.SaveCartCommand;
import com.enter4ward.user.model.Address;
import com.enter4ward.user.model.Cart;
import com.enter4ward.user.repository.EntityDataRepository;
import com.enter4ward.user.service.AddressService;
import com.enter4ward.user.service.CredentialsService;
import com.enter4ward.user.service.OrderService;
import com.enter4ward.user.service.ProductService;
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
    private OrderService orderService;
    @Autowired
    private CredentialsService credentialsService;
    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/address", method = RequestMethod.GET)
    public List<Address> getAddresses(){
        return addressService.getAddresses();
    }

    @RequestMapping(value = "/address", method = RequestMethod.PUT)
    public Address saveAddress(@RequestBody SaveAddressCommand command) {
        return addressService.setAddress(command);
    }

    @RequestMapping(value = "/address/{uuid}", method = RequestMethod.DELETE)
    public void deleteAddress(@PathVariable UUID uuid) {
        addressService.deleteAddress(uuid);
    }

    @RequestMapping(value = "/order", method = RequestMethod.PUT)
    public void createOrder(@RequestBody final CreateOrderCommand command) {
        orderService.createOrder(command);
    }

    @RequestMapping(value = "/cart", method = RequestMethod.GET)
    public Cart getCart() {
        return productService.getCart(credentialsService.getCurrentEntityId());
    }

    @RequestMapping(value = "/cart", method = RequestMethod.POST)
    public void setCart(@RequestBody SaveCartCommand command) {
        UUID currentEntity = credentialsService.getCurrentEntityId();
        if(command.getCart() != null && currentEntity != null) {
            command.getCart().setId(currentEntity);
            productService.setCart(command.getCart());
        }
    }
}
