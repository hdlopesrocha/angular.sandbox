package com.enter4ward.user.model.order;

import com.enter4ward.user.model.Address;
import com.enter4ward.user.model.Cart;
import com.enter4ward.user.model.Currency;
import com.enter4ward.user.model.Entity;

import java.util.*;

public class Order extends Entity {

    private Address address;
    private UUID owner;
    private State state;
    private List<StateHistory> history = new ArrayList<>();
    private String trackingNumber;
    private Currency currency;
    private Cart cart;
    private Map<UUID, Double> prices = new TreeMap<>();

    public Order() {
        super();
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(final Address address) {
        this.address = address;
    }

    public UUID getOwner() {
        return owner;
    }

    public void setOwner(final UUID owner) {
        this.owner = owner;
    }

    public State getState() {
        return state;
    }

    public void setState(final State state) {
        this.state = state;
    }

    public List<StateHistory> getHistory() {
        return history;
    }

    public void setHistory(final List<StateHistory> history) {
        this.history = history;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(final String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(final Currency currency) {
        this.currency = currency;
    }

    public Map<UUID, Double> getPrices() {
        return prices;
    }

    public void setPrices(Map<UUID, Double> prices) {
        this.prices = prices;
    }
}
