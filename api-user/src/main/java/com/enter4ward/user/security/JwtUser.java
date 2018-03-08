package com.enter4ward.user.security;

import java.util.UUID;

public class JwtUser {
    private UUID id;

    public void setId(UUID id) {
        this.id = id;
    }

    public String getRole() {
        return "ADMIN";
    }

    public UUID getId() {
        return id;
    }
}
