package com.enter4ward.user.changelog;

import com.enter4ward.user.utility.Utils;
import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSInputFile;
import org.bson.Document;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Base64;
import java.util.UUID;

@ChangeLog
public class DatabaseChangelog {

    private String saveResource(GridFS gridFS, String filename) throws IOException {
        InputStream resource = new ClassPathResource(filename).getURL().openStream();
        UUID id = UUID.randomUUID();
        GridFSInputFile file = gridFS.createFile(resource, filename);
        file.setId(id.toString());
        file.setContentType(Utils.guessContentType(filename));
        file.save();
        return id.toString();
    }

    @ChangeSet(order = "0001", id = "initialSetup", author = "hdlopesrocha")
    public void initialSetup(final DB db) throws IOException {
        db.dropDatabase();
        GridFS gridFS = new GridFS(db);

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
            product.put("attachments", Arrays.asList(
                    saveResource(gridFS, "img1.jpg"),
                    saveResource(gridFS, "img2.jpg"),
                    saveResource(gridFS, "img3.jpg")
            ));
            product.put("price", new Document("EUR", 10));
            product.put("title", "product01.title");
            product.put("description", "product01.description");
            productsCollection.save(product);
        }
        // product #02
        {
            DBObject product = new BasicDBObject();
            product.put("_id", UUID.fromString("e2174c61-5ea3-4f54-ac2a-985229dd45da"));
            product.put("attachments", Arrays.asList(
                    saveResource(gridFS, "img2.jpg"),
                    saveResource(gridFS, "img3.jpg"),
                    saveResource(gridFS, "img1.jpg")
            ));
            product.put("price", new Document("EUR", 20));
            product.put("title", "product02.title");
            product.put("description", "product02.description");
            productsCollection.save(product);
        }
        // product #03
        {
            DBObject product = new BasicDBObject();
            product.put("_id", UUID.fromString("f13aa72e-c728-4593-8a55-f4325d5718b3"));
            product.put("attachments", Arrays.asList(
                    saveResource(gridFS, "img3.jpg"),
                    saveResource(gridFS, "img1.jpg"),
                    saveResource(gridFS, "img2.jpg")
            ));
            product.put("price", new Document("EUR", 20));
            product.put("title", "product03.title");
            product.put("description", "product03.description");
            productsCollection.save(product);
        }
    }


}