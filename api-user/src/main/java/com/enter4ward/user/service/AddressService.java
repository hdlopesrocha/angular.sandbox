package com.enter4ward.user.service;

import com.enter4ward.user.model.Address;
import com.enter4ward.user.model.Credentials;
import com.enter4ward.user.model.CredentialsType;
import com.enter4ward.user.repository.AddressRepository;
import com.enter4ward.user.repository.CredentialsRepository;
import com.enter4ward.user.security.JwtAuthentication;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CredentialsService credentialsService;

    public List<Address> getAddresses() {
        return addressRepository.findByOwner(credentialsService.getCurrentEntityId());
    }

    public Address setAddress(final Address address) {
        address.setOwner(credentialsService.getCurrentEntityId());
        return addressRepository.save(address);
    }

    public void deleteAddress(final UUID uuid) {
        Address address = addressRepository.findOne(uuid);
        if (address != null && address.getOwner().equals(credentialsService.getCurrentEntityId())) {
            addressRepository.delete(address);
        }
    }
}
