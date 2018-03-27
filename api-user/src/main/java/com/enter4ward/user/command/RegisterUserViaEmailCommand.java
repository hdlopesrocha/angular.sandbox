package com.enter4ward.user.command;

import com.enter4ward.common.commands.Command;

public class RegisterUserViaEmailCommand extends Command {
    private String email;
    private String confirmEmail;
    private String password;
    private String confirmPassword;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public String getConfirmEmail() {
        return confirmEmail;
    }

    public void setConfirmEmail(final String confirmEmail) {
        this.confirmEmail = confirmEmail;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(final String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
