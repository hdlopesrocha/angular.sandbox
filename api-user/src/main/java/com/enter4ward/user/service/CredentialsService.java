package com.enter4ward.user.service;

import com.enter4ward.user.model.Credentials;
import com.enter4ward.user.model.CredentialsType;
import com.enter4ward.user.repository.CredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Random;
import java.util.UUID;

@Service
public class CredentialsService {

    private Random random = new Random();
    private static final int SALT_SIZE = 32;

    @Autowired
    private CredentialsRepository credentialsRepository;

    public void createCredentialsFromEmailPassword(
            final UUID uuid,
            final String email, final String password) throws IOException, NoSuchAlgorithmException {

        byte[] salt = new byte[SALT_SIZE];
        random.nextBytes(salt);
        byte[] hash = getHash(salt, password.getBytes(StandardCharsets.UTF_8));

        Credentials credentials = new Credentials(uuid);
        credentials.getData().put("email", email);
        credentials.getData().put("salt", salt);
        credentials.getData().put("hash", hash);
        credentials.setType(CredentialsType.EMAIL);
        credentialsRepository.save(credentials);
    }

    public boolean existsCredentialsWithEmail(final String email){
        Credentials credentials = credentialsRepository.findByTypeAndData(CredentialsType.EMAIL, "data.email", email);
        return credentials != null;
    }

    public boolean authenticateWithEmail(final String email, final String password) throws IOException, NoSuchAlgorithmException {
        Credentials credentials = credentialsRepository.findByTypeAndData(CredentialsType.EMAIL, "data.email", email);
        byte[] salt = (byte[]) credentials.getData().get("salt");
        byte[] hash = (byte[]) credentials.getData().get("hash");
        return Arrays.equals(hash, getHash(salt, password.getBytes(StandardCharsets.UTF_8)));
    }

    private byte [] getSha256(byte [] data) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        return digest.digest(data);
    }

    private byte [] getHash(byte [] salt, byte [] data) throws IOException, NoSuchAlgorithmException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream( );
        outputStream.write(salt);
        outputStream.write(data);
        return getSha256(outputStream.toByteArray());
    }

}