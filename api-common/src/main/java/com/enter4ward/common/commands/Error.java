package com.enter4ward.common.commands;


public class Error {
    private String message;
    private Object [] args;

    public Error(String message, Object ... args) {
        this.message = message;
        this.args = args;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getArgs() {
        return args;
    }

    public void setArgs(Object ... args) {
        this.args = args;
    }
}
