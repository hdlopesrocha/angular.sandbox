package com.enter4ward.user.model;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class Product extends Entity {

    private List<String> attachments;
    private Map<Currency, Double> price;
    private Map<Lang,String> title;
    private Map<Lang,String> description;

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

    public Map<Lang, String> getTitle() {
        return title;
    }

    public void setTitle(final Map<Lang, String> title) {
        this.title = title;
    }

    public Map<Lang, String> getDescription() {
        return description;
    }

    public void setDescription(final Map<Lang, String> description) {
        this.description = description;
    }
}
