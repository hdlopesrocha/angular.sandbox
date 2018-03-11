package com.enter4ward.user.repository;

import com.enter4ward.user.model.EntityData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface EntityDataRepository extends MongoRepository<EntityData, UUID> {

}
