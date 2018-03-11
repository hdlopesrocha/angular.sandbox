package com.enter4ward.user.security;

import java.util.UUID;

public class JwtUser {
    private UUID id;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
