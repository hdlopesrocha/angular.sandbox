package com.enter4ward.user.model;

import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

public class Cart extends Entity {

    private Map<UUID,Integer> amounts = new TreeMap<>();

    public Cart() {
        super(null);
    }

    public Cart(final UUID id) {
        super(id);
    }

    public Map<UUID, Integer> getAmounts() {
        return amounts;
    }

    public void setAmounts(final Map<UUID, Integer> amounts) {
        this.amounts = amounts;
    }
}
