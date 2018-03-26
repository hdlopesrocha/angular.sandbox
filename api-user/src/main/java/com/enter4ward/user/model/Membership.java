package com.enter4ward.user.model;

import java.util.UUID;

public class Membership extends Entity {
    private UUID to;
    private UUID from;

    public Membership(final UUID from, final UUID to) {
        super();
        this.from = from;
        this.to = to;
    }

    public UUID getTo() {
        return to;
    }

    public UUID getFrom() {
        return from;
    }
}
