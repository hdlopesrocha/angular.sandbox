package com.enter4ward.common.commands;

import java.util.Map;
import java.util.TreeMap;

public class CommandResult<T> {

    private T result;
    private Map<String, String> errors = new TreeMap<String,String>();

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(final Map<String, String> errors) {
        this.errors = errors;
    }

    public T getResult() {
        return result;
    }

    public void setResult(final T result) {
        this.result = result;
    }
}
