package com.enter4ward.user.command;

import com.enter4ward.common.commands.Command;
import com.enter4ward.user.model.Address;
import com.enter4ward.user.model.Cart;
import com.enter4ward.user.model.Currency;

public class CreateOrderCommand extends Command {

    private Address address;
    private Currency currency;
    private Cart cart;

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}
