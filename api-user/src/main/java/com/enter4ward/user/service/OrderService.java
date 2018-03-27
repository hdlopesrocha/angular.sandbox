package com.enter4ward.user.service;

import com.enter4ward.user.command.CreateOrderCommand;
import com.enter4ward.user.model.Product;
import com.enter4ward.user.model.order.Order;
import com.enter4ward.user.model.order.State;
import com.enter4ward.user.model.order.StateHistory;
import com.enter4ward.user.repository.BillRepository;
import com.enter4ward.user.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private BillRepository billRepository;
    @Autowired
    private CredentialsService credentialsService;
    @Autowired
    private ProductRepository productRepository;

    public void createOrder(final CreateOrderCommand command) {
        UUID user = credentialsService.getCurrentEntityId();
        if (user != null && command.getAddress() != null && command.getCart() != null &&
                !command.getCart().getAmounts().isEmpty()) {
            Order newOrder = new Order();
            newOrder.setAddress(command.getAddress());
            newOrder.getHistory().add(new StateHistory(State.CREATED, new Date()));
            newOrder.setCurrency(command.getCurrency());
            command.getCart().getAmounts().keySet().forEach(key -> {
                Product product = productRepository.findOne(key);
                if (product != null) {
                    newOrder.getPrices().put(key, product.getPrice().get(command.getCurrency()));
                }
            });
            newOrder.setCart(command.getCart());
            newOrder.setState(State.CREATED);
            newOrder.setOwner(user);
            billRepository.save(newOrder);
        }
    }
}
