package com.enter4ward.user.model;

import java.util.Date;

public class BillStateHistory {
    private BillState state;
    private Date date;

    public BillStateHistory(BillState state, Date date) {
        this.state = state;
        this.date = date;
    }

    public BillState getState() {
        return state;
    }

    public void setState(BillState state) {
        this.state = state;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
