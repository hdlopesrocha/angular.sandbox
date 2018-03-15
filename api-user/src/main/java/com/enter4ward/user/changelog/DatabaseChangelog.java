package com.enter4ward.user.changelog;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import org.bson.Document;

import java.util.*;

@ChangeLog
public class DatabaseChangelog {

    @ChangeSet(order = "0001", id = "initialSetup", author = "hdlopesrocha")
    public void initialSetup(final DB db) {
        db.dropDatabase();
        DBCollection credentialsCollection = db.getCollection("credentials");
        DBCollection productsCollection = db.getCollection("product");

        // admin setup
        {
            DBObject adminCredentials = new BasicDBObject();
            adminCredentials.put("_id", UUID.fromString("5448f260-5cd0-26fb-82e5-136500befd88"));
            adminCredentials.put("_class", "com.enter4ward.user.model.Credentials");
            adminCredentials.put("type", "EMAIL");
            Document data = new Document();
            data.put("email", "hdlopesrocha91@gmail.com");
            data.put("hash", Base64.getDecoder().decode("ZFdrSGB1DxnbQ0e8WohOhu/WuEl0HLx1+X56RWLTLpk="));
            data.put("salt", Base64.getDecoder().decode("R2t3a0pmzJWt+vhbvOhWH2mvyzRPDVw8w7fn47ejnKg="));
            adminCredentials.put("data", data);
            credentialsCollection.save(adminCredentials);
        }
        // product #01
        {
            DBObject product = new BasicDBObject();
            product.put("_id", UUID.fromString("71e7f4f2-46ce-4ef0-abdb-bfbb3391ae47"));
            product.put("attachments", Arrays.asList("url1", "url2", "url3"));
            product.put("price", new Document("EUR", 10));
            product.put("title","product01.title");
            product.put("description","product01.description");
            productsCollection.save(product);
        }
        // product #02
        {
            DBObject product = new BasicDBObject();
            product.put("_id", UUID.fromString("e2174c61-5ea3-4f54-ac2a-985229dd45da"));
            product.put("attachments", Arrays.asList("url1", "url2", "url3"));
            product.put("price", new Document("EUR", 20));
            product.put("title","product02.title");
            product.put("description","product02.description");
            productsCollection.save(product);
        }
        // product #03
        {
            DBObject product = new BasicDBObject();
            product.put("_id", UUID.fromString("f13aa72e-c728-4593-8a55-f4325d5718b3"));
            product.put("attachments", Arrays.asList("url1", "url2", "url3"));
            product.put("price", new Document("EUR", 20));
            product.put("title","product03.title");
            product.put("description","product03.description");
            productsCollection.save(product);
        }
    }


}