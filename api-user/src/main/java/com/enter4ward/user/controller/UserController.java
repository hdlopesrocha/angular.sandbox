package com.enter4ward.user.controller;


import com.enter4ward.common.commands.CommandResult;
import com.enter4ward.common.commands.Error;
import com.enter4ward.user.command.AuthenticateViaEmailPassword;
import com.enter4ward.user.command.RegisterUserViaEmail;
import com.enter4ward.user.repository.EntityDataRepository;
import com.enter4ward.user.security.JwtAuthentication;
import com.enter4ward.user.security.JwtUser;
import com.enter4ward.user.security.JwtValidator;
import com.enter4ward.user.service.CredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private EntityDataRepository entityDataRepository;

    @Autowired
    private CredentialsService credentialsService;

    @Autowired
    private JwtValidator validator;

    @RequestMapping(value = "/public/auth", method = RequestMethod.POST)
    public CommandResult<String> authenticate(HttpServletResponse response,
                                              @RequestBody final AuthenticateViaEmailPassword command) {
        CommandResult<String> result = new CommandResult<>();
        try {
            UUID entityId = credentialsService.authenticateWithEmail(command.getEmail(), command.getPassword());
            if (entityId != null) {
                JwtUser user = new JwtUser();
                user.setId(entityId);
                String token = validator.write(user);
                result.setResult(token);
            }
        } catch (Exception e) {
            result.getErrors().put("exception", new Error(e.getMessage()));
        }
        return result;
    }

    @RequestMapping(value = "/public/register", method = RequestMethod.PUT)
    public CommandResult<Boolean> register(@RequestBody final RegisterUserViaEmail command) {
        CommandResult<Boolean> result = new CommandResult<>();
        if (StringUtils.isEmpty(command.getConfirmEmail())) {
            result.getErrors().put("confirmEmail", new Error("empty"));
        }
        if (StringUtils.isEmpty(command.getEmail())) {
            result.getErrors().put("email", new Error("empty"));
        } else {
            if (credentialsService.existsCredentialsWithEmail(command.getEmail())) {
                result.getErrors().put("email", new Error("alreadyUsed"));
            }
        }

        if (StringUtils.hasText(command.getEmail()) && !command.getEmail().equals(command.getConfirmEmail())) {
            result.getErrors().put("confirmEmail", new Error("notEqual"));
        }
        if (StringUtils.isEmpty(command.getConfirmPassword())) {
            result.getErrors().put("confirmPassword", new Error("empty"));
        }
        if (StringUtils.isEmpty(command.getPassword())) {
            result.getErrors().put("password", new Error("empty"));
        }
        if (StringUtils.hasText(command.getPassword()) && !command.getPassword().equals(command.getConfirmPassword())) {
            result.getErrors().put("confirmPassword", new Error("notEqual"));
        }

        if (result.getErrors().size() == 0) {
            try {
                credentialsService.createCredentialsFromEmailPassword(UUID.randomUUID(), command.getEmail(), command.getPassword());
            } catch (Exception e) {
                result.getErrors().put("exception", new Error(e.getMessage()));
            }
        }

        result.setResult(result.getErrors().size() == 0);
        return result;
    }

}
