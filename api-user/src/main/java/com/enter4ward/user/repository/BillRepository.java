package com.enter4ward.user.repository;

import com.enter4ward.user.model.Bill;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface BillRepository extends MongoRepository<Bill, UUID> {

    List<Bill> findByOwner(final UUID owner);
}
