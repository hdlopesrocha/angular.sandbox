package com.enter4ward.user.service;

import com.enter4ward.user.model.*;
import com.enter4ward.user.repository.BillRepository;
import com.enter4ward.user.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;
    @Autowired
    private CredentialsService credentialsService;
    @Autowired
    private ProductRepository productRepository;

    public void createBill(final Bill receivedBill) {
        UUID user = credentialsService.getCurrentEntityId();
        if(user!= null && (receivedBill.getId() == null || !billRepository.exists(receivedBill.getId())) &&
                receivedBill!=null && receivedBill.getAddress()!=null && receivedBill.getCart()!=null &&
                !receivedBill.getCart().getAmounts().isEmpty()){

            Bill newBill = new Bill();
            newBill.setAddress(receivedBill.getAddress());
            newBill.getBillHistory().add(new BillStateHistory(BillState.CREATED, new Date()));
            newBill.setCurrency(receivedBill.getCurrency());
            receivedBill.getCart().getAmounts().keySet().forEach( key -> {
                Product product = productRepository.findOne(key);
                if(product!=null){
                    newBill.getPrices().put(key,product.getPrice().get(receivedBill.getCurrency()));
                }
            });
            newBill.setCart(receivedBill.getCart());
            newBill.setState(BillState.CREATED);
            newBill.setOwner(user);
            billRepository.save(newBill);
        }
    }


}
