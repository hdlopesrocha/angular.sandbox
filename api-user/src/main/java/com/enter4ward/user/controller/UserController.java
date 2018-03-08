package com.enter4ward.user.controller;


import com.enter4ward.common.commands.CommandResult;
import com.enter4ward.user.command.AuthenticateViaEmailPassword;
import com.enter4ward.user.command.RegisterUserViaEmail;
import com.enter4ward.user.config.SecurityConstants;
import com.enter4ward.user.model.Credentials;
import com.enter4ward.user.model.CredentialsType;
import com.enter4ward.user.model.Entity;
import com.enter4ward.user.model.EntityData;
import com.enter4ward.user.repository.CredentialsRepository;
import com.enter4ward.user.repository.EntityDataRepository;
import com.enter4ward.user.security.JwtUser;
import com.enter4ward.user.security.JwtValidator;
import com.enter4ward.user.service.CredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.TreeMap;
import java.util.UUID;
@PreAuthorize("true")
@RestController
@RequestMapping("/api")
public class UserController {

  @Autowired
  private EntityDataRepository entityDataRepository;

  @Autowired
  private CredentialsService credentialsService;

  @Autowired
  private JwtValidator validator;

  @RequestMapping(value = "/auth", method = RequestMethod.POST)
  public CommandResult<Boolean> authenticate(HttpServletResponse response,
                                             @RequestBody final AuthenticateViaEmailPassword command) {
    CommandResult<Boolean> result = new CommandResult<>();
    try {
      UUID entityId = credentialsService.authenticateWithEmail(command.getEmail(),command.getPassword());
      if(entityId!= null){
        JwtUser user = new JwtUser();
        user.setId(entityId);
        String token = validator.write(user);
        response.setHeader(SecurityConstants.HEADER_STRING, token);
      }
      result.setResult(entityId != null);
    } catch (Exception e) {
      result.getErrors().put("exception", e.getMessage());
    }
    return result;
  }

  @RequestMapping(value = "/register", method = RequestMethod.PUT)
  public CommandResult<Boolean> register(@RequestBody final RegisterUserViaEmail command) {
    CommandResult<Boolean> result = new CommandResult<>();
    if(StringUtils.isEmpty(command.getConfirmEmail())){
      result.getErrors().put("confirmEmail", "empty");
    }
    if(StringUtils.isEmpty(command.getEmail())){
      result.getErrors().put("email", "empty");
    }
    else {
      if(credentialsService.existsCredentialsWithEmail(command.getEmail())){
        result.getErrors().put("email", "alreadyUsed");
      }
    }

    if(StringUtils.hasText(command.getEmail()) && !command.getEmail().equals(command.getConfirmEmail())){
      result.getErrors().put("confirmEmail", "notEqual");
    }
    if(StringUtils.isEmpty(command.getConfirmPassword())){
      result.getErrors().put("confirmPassword", "empty");
    }
    if(StringUtils.isEmpty(command.getPassword())){
      result.getErrors().put("password", "empty");
    }
    if(StringUtils.hasText(command.getPassword()) && !command.getPassword().equals(command.getConfirmPassword())){
      result.getErrors().put("confirmPassword", "notEqual");
    }

    if(result.getErrors().size() == 0){
      try {
        credentialsService.createCredentialsFromEmailPassword(UUID.randomUUID(),command.getEmail(), command.getPassword());
      } catch (Exception e) {
        result.getErrors().put("exception", e.getMessage());
      }
    }

    result.setResult(result.getErrors().size() == 0);
    return result;
  }

}
