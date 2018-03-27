package com.enter4ward.user.service;

import com.enter4ward.user.model.Credentials;
import com.enter4ward.user.model.CredentialsType;
import com.enter4ward.user.repository.CredentialsRepository;
import com.enter4ward.user.security.JwtAuthentication;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class CredentialsService {

    private static final int SALT_SIZE = 32;
    private Random random = new Random();
    @Autowired
    private CredentialsRepository credentialsRepository;
    @Autowired
    private MailService mailService;

    public Credentials createCredentialsFromEmailPassword(
            final UUID owner,
            final String email,
            final String password) throws IOException, NoSuchAlgorithmException {

        byte[] salt = new byte[SALT_SIZE];
        random.nextBytes(salt);
        byte[] hash = getHash(salt, password.getBytes(StandardCharsets.UTF_8));
        String activation = RandomStringUtils.randomAlphanumeric(32);

        Credentials credentials = new Credentials(owner) {{
            getData().put("email", email);
            getData().put("salt", salt);
            getData().put("hash", hash);
            getData().put("activation",activation);
            setType(CredentialsType.EMAIL);
        }};

        credentialsRepository.save(credentials);

        return credentials;
    }

    public void sendActivationEmail(String host, Credentials credentials){
        String activation = (String) credentials.getData().get("activation");
        String email = (String) credentials.getData().get("email");
        Map<String, String> params = new TreeMap<>();
        params.put("message", host + "/api/public/activate/"+activation);

        mailService.sendHtmlMessage(
                email,
                "API test",
                "registerMail",
                params,
                null);
    }

    public boolean activateEmailCredentials(final String activation) {
        Credentials credentials = credentialsRepository.findByTypeAndData(
                CredentialsType.EMAIL, "data.activation", activation);
        if(credentials!= null){
            credentials.getData().remove("activation");
            credentialsRepository.save(credentials);
            return true;
        }
        return false;
    }

    public UUID getCurrentEntityId(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null && auth instanceof JwtAuthentication){
            JwtAuthentication jwtAuth = (JwtAuthentication) auth ;
            return jwtAuth.getEntityId();
        }
        return null;
    }

    public boolean existsCredentialsWithEmail(final String email) {
        Credentials credentials = credentialsRepository.findByTypeAndData(CredentialsType.EMAIL, "data.email", email);
        return credentials != null;
    }

    public UUID authenticateWithEmail(final String email,
                                      final String password) throws IOException, NoSuchAlgorithmException {
        Credentials credentials = credentialsRepository.findByTypeAndData(CredentialsType.EMAIL, "data.email", email);
        if(!credentials.getData().containsKey("activation")) {
            byte[] salt = (byte[]) credentials.getData().get("salt");
            byte[] hash = (byte[]) credentials.getData().get("hash");
            if (Arrays.equals(hash, getHash(salt, password.getBytes(StandardCharsets.UTF_8)))) {
                return credentials.getOwner();
            }
        }
        return null;
    }

    private byte[] getSha256(byte[] data) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        return digest.digest(data);
    }

    private byte[] getHash(byte[] salt, byte[] data) throws IOException, NoSuchAlgorithmException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        outputStream.write(salt);
        outputStream.write(data);
        return getSha256(outputStream.toByteArray());
    }

}
