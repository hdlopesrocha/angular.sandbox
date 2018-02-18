package com.enter4ward.user.repository;

import com.enter4ward.user.model.Credentials;
import com.enter4ward.user.model.CredentialsType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


import java.util.Map;
import java.util.UUID;

public interface CredentialsRepository extends MongoRepository<Credentials, UUID> {

    @Query("{'type': ?0, ?1:?2 })")
    Credentials findByTypeAndData(final CredentialsType type, final String key, final String value);

    @Query("{type: ?0, data: ?1 })")
    Credentials findByTypeAndData(final CredentialsType type, final Map<String,String> data);

}
