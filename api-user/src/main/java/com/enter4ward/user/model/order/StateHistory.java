package com.enter4ward.user.model.order;

import java.util.Date;

public class StateHistory {
    private State state;
    private Date date;

    public StateHistory(State state, Date date) {
        this.state = state;
        this.date = date;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}