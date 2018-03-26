package com.enter4ward.user.model;

import org.springframework.data.annotation.Id;

import java.util.UUID;

public abstract class Entity {

    @Id
    private UUID id;

    public Entity() {
        this.id = UUID.randomUUID();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
