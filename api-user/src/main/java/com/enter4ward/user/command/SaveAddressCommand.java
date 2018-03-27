package com.enter4ward.user.command;

import com.enter4ward.common.commands.Command;
import com.enter4ward.user.model.Address;

public class SaveAddressCommand extends Command {

    private Address address;

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
