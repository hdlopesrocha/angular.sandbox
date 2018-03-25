package com.enter4ward.user.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClaims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class JwtValidator {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private Long expiration;


    public JwtUser read(final String token) {
        try {
            DefaultClaims jwt = (DefaultClaims) Jwts.parser()
                    .setSigningKey(secret)
                    .parse(token).getBody();
            JwtUser user = new JwtUser();
            user.setId(UUID.fromString(jwt.getSubject()));
            return user;
        } catch (Exception e){
            return null;
        }
    }

    public String write(final JwtUser user) {
        Date now = new Date();
        return Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(calculateExpirationDate(now))
                .setSubject(user.getId().toString())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    private Date calculateExpirationDate(final Date createdDate) {
        return new Date(createdDate.getTime() + expiration * 1000);
    }
}
