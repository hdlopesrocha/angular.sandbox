package com.enter4ward.user.service;

import com.enter4ward.user.model.Cart;
import com.enter4ward.user.model.Product;
import com.enter4ward.user.repository.CartRepository;
import com.enter4ward.user.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Cart getCart(final UUID entityId) {
        if (entityId == null) {
            return new Cart(null);
        } else {
            Cart cart = cartRepository.findOne(entityId);
            return cart != null ? cart : new Cart(entityId);
        }
    }

    public void setCart(final Cart cart) {
        cartRepository.save(cart);
    }
}
