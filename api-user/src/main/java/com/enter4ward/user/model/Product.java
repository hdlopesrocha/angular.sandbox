package com.enter4ward.user.model;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class Product extends Entity {

    private List<String> attachments;
    private Map<Currency, Double> price;
    private String title;
    private String description;

    public Product(final UUID id) {
        super(id);
    }

    public List<String> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<String> attachments) {
        this.attachments = attachments;
    }

    public Map<Currency, Double> getPrice() {
        return price;
    }

    public void setPrice(final Map<Currency, Double> price) {
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }
}
