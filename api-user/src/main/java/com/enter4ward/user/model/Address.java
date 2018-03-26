package com.enter4ward.user.model;


import java.util.UUID;

/*
    I am not following any standard, I am not being paid
    I have to do this quickly, fuck this shit, I don't care
*/

public class Address extends Entity {


    private UUID owner;
    private Country country;
    private String city;
    private String postalCode;
    private String addressLine1;
    private String addressLine2;
    private String comment;
    private String phone;

    public Address() {
        super();
    }

    public UUID getOwner() {
        return owner;
    }

    public void setOwner(final UUID owner) {
        this.owner = owner;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(final Country country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(final String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(final String postalCode) {
        this.postalCode = postalCode;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(final String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(final String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getComment() {
        return comment;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(final String phone) {
        this.phone = phone;
    }

    public void setComment(final String comment) {
        this.comment = comment;
    }
}
