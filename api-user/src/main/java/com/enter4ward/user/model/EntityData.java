package com.enter4ward.user.model;

import java.util.Map;
import java.util.UUID;

public class EntityData extends Entity {

    private Map<String, Object> data;

    public EntityData(final Map<String, Object> data) {
        super();
        this.data = data;
    }

    public Map<String, Object> getData() {
        return data;
    }
}
