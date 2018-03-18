package com.enter4ward.user.model;

import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

public class Credentials extends Entity {

    private UUID owner;

    private CredentialsType type;

    private Map<String, Object> data = new TreeMap<>();

    public Credentials(final UUID id, final  UUID owner) {
        super(id);
        this.owner = owner;
    }

    public CredentialsType getType() {
        return type;
    }

    public void setType(final CredentialsType type) {
        this.type = type;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(final Map<String, Object> data) {
        this.data = data;
    }

    public void setOwner(final UUID owner) {
        this.owner = owner;
    }

    public UUID getOwner() {
        return owner;
    }
}
