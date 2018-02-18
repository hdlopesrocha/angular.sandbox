package com.enter4ward.user.model;

import org.springframework.data.annotation.Id;

import java.util.UUID;

public abstract class Entity {

    @Id
    private UUID id;

    public Entity(final UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }
}
