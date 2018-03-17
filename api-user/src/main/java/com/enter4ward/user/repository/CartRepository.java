package com.enter4ward.user.repository;

import com.enter4ward.user.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface CartRepository extends MongoRepository<Cart, UUID> {

}
