package com.enter4ward.user.model;

import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

public class Credentials extends Entity {

    private CredentialsType type;

    private Map<String, Object> data = new TreeMap<>();

    public Credentials(final UUID id) {
        super(id);
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
}
