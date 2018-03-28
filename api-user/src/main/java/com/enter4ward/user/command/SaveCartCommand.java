package com.enter4ward.user.command;

import com.enter4ward.common.commands.Command;
import com.enter4ward.user.model.Cart;

public class SaveCartCommand extends Command {

    private Cart cart;

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}
