package com.enter4ward.user.repository;

import com.enter4ward.user.model.Address;
import com.enter4ward.user.model.Credentials;
import com.enter4ward.user.model.CredentialsType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface AddressRepository extends MongoRepository<Address, UUID> {

    List<Address> findByOwner(final UUID owner);

}
