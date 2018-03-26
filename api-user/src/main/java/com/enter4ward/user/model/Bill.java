package com.enter4ward.user.model;

import java.util.*;

public class Bill extends Entity {

    private Address address;
    private UUID owner;
    private BillState state;
    private List<BillStateHistory> billHistory = new ArrayList<>();
    private String trackingNumber;
    private Currency currency;
    private Cart cart;
    private Map<UUID, Double> prices = new TreeMap<>();

    public Bill() {
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

    public BillState getState() {
        return state;
    }

    public void setState(final BillState state) {
        this.state = state;
    }

    public List<BillStateHistory> getBillHistory() {
        return billHistory;
    }

    public void setBillHistory(final List<BillStateHistory> billHistory) {
        this.billHistory = billHistory;
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
