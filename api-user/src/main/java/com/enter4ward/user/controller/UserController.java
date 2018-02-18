package com.enter4ward.user.controller;


import com.enter4ward.common.commands.CommandResult;
import com.enter4ward.user.command.AuthenticateViaEmailPassword;
import com.enter4ward.user.command.RegisterUserViaEmail;
import com.enter4ward.user.model.Credentials;
import com.enter4ward.user.model.CredentialsType;
import com.enter4ward.user.model.Entity;
import com.enter4ward.user.model.EntityData;
import com.enter4ward.user.repository.CredentialsRepository;
import com.enter4ward.user.repository.EntityDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.TreeMap;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UserController {

  @Autowired
  private CredentialsRepository credentialsRepository;
  @Autowired
  private EntityDataRepository entityDataRepository;

  @RequestMapping(value = "/auth", method = RequestMethod.POST)
  public CommandResult<Boolean> authenticate(final AuthenticateViaEmailPassword command) {
    CommandResult<Boolean> result = new CommandResult<>();
    credentialsRepository.findByTypeAndData(CredentialsType.EMAIL, "email", command.getEmail());
    result.setResult(true);
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
      Credentials credentials = credentialsRepository.findByTypeAndData(CredentialsType.EMAIL, "data.email", command.getEmail());
      if(credentials != null){
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
      Credentials credentials = new Credentials(UUID.randomUUID());
      credentials.setType(CredentialsType.EMAIL);
      credentials.getData().put("email", command.getEmail());
      credentials.getData().put("password", command.getPassword());
      credentials.getData().put("confirmation", UUID.randomUUID().toString());
      credentialsRepository.save(credentials);
    }

    result.setResult(result.getErrors().size() == 0);
    return result;
  }

}
