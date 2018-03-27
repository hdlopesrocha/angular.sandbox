package com.enter4ward.user.repository;

import com.enter4ward.user.model.order.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface BillRepository extends MongoRepository<Order, UUID> {

    List<Order> findByOwner(final UUID owner);
}
