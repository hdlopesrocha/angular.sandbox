package com.enter4ward.user.changelog;

import com.enter4ward.user.utility.Utils;
import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
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
        DBCollection addressCollection = db.getCollection("address");

        // admin setup
        credentialsCollection.save( new BasicDBObject() {{
            put("_id", UUID.fromString("5448f260-5cd0-26fb-82e5-136500befd88"));
            put("owner", UUID.fromString("a5ae8468-df6d-48bb-a0e0-f1b3f6b21831"));
            put("type", "EMAIL");
            put("data", new Document() {{
                put("email", "hdlopesrocha91@gmail.com");
                put("hash", Base64.getDecoder().decode("ZFdrSGB1DxnbQ0e8WohOhu/WuEl0HLx1+X56RWLTLpk="));
                put("salt", Base64.getDecoder().decode("R2t3a0pmzJWt+vhbvOhWH2mvyzRPDVw8w7fn47ejnKg="));
            }});
        }});

        // address #01
        addressCollection.save(new BasicDBObject() {{
            put("_id", UUID.fromString("38c2dfcd-6737-4998-be43-8944a3bd6b52"));
            put("owner", UUID.fromString("a5ae8468-df6d-48bb-a0e0-f1b3f6b21831"));
            put("country", "FR");
            put("city", "Ferney-Voltaire");
            put("phone", "00351938781922");
            put("postalCode", "01210");
            put("addressLine1", "40 Chemin de la planche brulee");
            put("addressLine2", "Appartement 385");
            put("comment", "S'il vous plaît sonner la cloche, je ne connais pas le code d'accès");
        }});

        // product #01
        productsCollection.save( new BasicDBObject() {{
            put("_id", UUID.fromString("71e7f4f2-46ce-4ef0-abdb-bfbb3391ae47"));
            put("attachments", Arrays.asList(
                    saveResource(gridFS, "img1.jpg"),
                    saveResource(gridFS, "img2.jpg"),
                    saveResource(gridFS, "img3.jpg")
            ));
            put("price", new Document("EUR", 10));
            put("title", new BasicDBObject("EN", "Product 1"));
            put("description", new BasicDBObject("EN", "Description 1"));
        }});

        // product #02
        productsCollection.save( new BasicDBObject() {{
            put("_id", UUID.fromString("e2174c61-5ea3-4f54-ac2a-985229dd45da"));
            put("attachments", Arrays.asList(
                    saveResource(gridFS, "img2.jpg"),
                    saveResource(gridFS, "img3.jpg"),
                    saveResource(gridFS, "img1.jpg")
            ));
            put("price", new Document("EUR", 20));
            put("title", new BasicDBObject("EN", "Product 2"));
            put("description", new BasicDBObject("EN", "Description 2"));
        }});

        // product #03
        productsCollection.save( new BasicDBObject() {{
            put("_id", UUID.fromString("f13aa72e-c728-4593-8a55-f4325d5718b3"));
            put("attachments", Arrays.asList(
                    saveResource(gridFS, "img3.jpg"),
                    saveResource(gridFS, "img1.jpg"),
                    saveResource(gridFS, "img2.jpg")
            ));
            put("price", new Document("EUR", 30));
            put("title", new BasicDBObject("EN", "Product 3"));
            put("description", new BasicDBObject("EN", "Description 3"));
        }});

        // product #04
        productsCollection.save( new BasicDBObject() {{
            put("_id", UUID.fromString("e01e088a-bc88-4265-a351-a5bb719c24c3"));
            put("attachments", Arrays.asList(
                    saveResource(gridFS, "img1.jpg"),
                    saveResource(gridFS, "img3.jpg"),
                    saveResource(gridFS, "img2.jpg")
            ));
            put("price", new Document("EUR", 40));
            put("title", new BasicDBObject("EN", "Product 4"));
            put("description", new BasicDBObject("EN", "Description 4"));
        }});
    }


}