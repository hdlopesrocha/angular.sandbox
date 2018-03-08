package com.enter4ward.user.security;

import com.enter4ward.user.config.SecurityConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtValidator {
    public JwtUser read(String token) {
        Claims body = Jwts.parser()
                .setSigningKey(SecurityConstants.SECRET)
                .parseClaimsJwt(token)
                .getBody();
        JwtUser user = new JwtUser();
        user.setId(UUID.fromString((String) body.get("userId")));
        return user;
    }

    public String write(JwtUser user){
        Claims claims = Jwts.claims();
        claims.put("userId", user.getId().toString());

        return Jwts.builder()
                .setExpiration(new Date(new Date().getTime() + SecurityConstants.EXPIRATION_TIME))
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET).compact();
    }
}
