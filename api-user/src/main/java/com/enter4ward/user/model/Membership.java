package com.enter4ward.user.model;

import java.util.UUID;

public class Membership extends Entity {
    private UUID to;

    public Membership(final UUID id, final UUID to) {
        super(id);
        this.to = to;
    }

    public UUID getTo() {
        return to;
    }
}
