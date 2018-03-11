package com.enter4ward.common.commands;

import java.util.Map;
import java.util.TreeMap;

public class CommandResult<T> {

    private T result;
    private Map<String, Error> errors = new TreeMap<String,Error>();

    public Map<String, Error> getErrors() {
        return errors;
    }

    public void setErrors(final Map<String, Error> errors) {
        this.errors = errors;
    }

    public T getResult() {
        return result;
    }

    public void setResult(final T result) {
        this.result = result;
    }
}
