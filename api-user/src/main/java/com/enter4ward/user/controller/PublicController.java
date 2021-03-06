package com.enter4ward.user.controller;


import com.enter4ward.common.commands.CommandResult;
import com.enter4ward.common.commands.Error;
import com.enter4ward.user.command.AuthenticateViaEmailPasswordCommand;
import com.enter4ward.user.command.RegisterUserViaEmailCommand;
import com.enter4ward.user.model.Credentials;
import com.enter4ward.user.model.Product;
import com.enter4ward.user.security.JwtUser;
import com.enter4ward.user.security.JwtValidator;
import com.enter4ward.user.service.CredentialsService;
import com.enter4ward.user.service.ProductService;
import com.enter4ward.user.utility.Utils;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@PreAuthorize("true")
@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private MongoTemplate database;
    @Autowired
    private CredentialsService credentialsService;
    @Autowired
    private ProductService productService;
    @Autowired
    private JwtValidator validator;

    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public CommandResult<String> authenticate(@RequestBody final AuthenticateViaEmailPasswordCommand command) {
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

    @RequestMapping(value = "/activate/{token}", method = RequestMethod.GET)
    public CommandResult<Boolean> activate(@PathVariable String token) {
        CommandResult<Boolean> result = new CommandResult<>();
        try {
            result.setResult(credentialsService.activateEmailCredentials(token));
        } catch (Exception e) {
            result.getErrors().put("exception", new Error(e.getMessage()));
        }
        return result;
    }

    @RequestMapping(value = "/register", method = RequestMethod.PUT)
    public CommandResult<Boolean> register(HttpServletRequest request,
                                           @RequestBody final RegisterUserViaEmailCommand command) {
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
                Credentials credentials =
                        credentialsService.createCredentialsFromEmailPassword(UUID.randomUUID(), command.getEmail(), command.getPassword());
                credentialsService.sendActivationEmail(Utils.getHost(request), credentials);
            } catch (Exception e) {
                result.getErrors().put("exception", new Error(e.getMessage()));
            }
        }

        result.setResult(result.getErrors().size() == 0);
        return result;
    }


    @RequestMapping(value = "/product", method = RequestMethod.GET)
    public Iterable<Product> getProducts(@RequestParam(required = false) List<UUID> id) {
        return productService.getProducts(id);
    }

    @RequestMapping(value = "/file/{id:.+}", method = RequestMethod.GET)
    public void getFile(HttpServletResponse response,
                               @PathVariable String id) throws IOException {
        GridFS gridFS = new GridFS(database.getDb());
        DBObject query = new BasicDBObject("_id",id);
        GridFSDBFile gfs = gridFS.findOne(query);
        if (gfs != null) {
            response.setContentType(gfs.getContentType());
            IOUtils.copy(gfs.getInputStream(), response.getOutputStream());
            response.flushBuffer();
        } else {
            ClassPathResource resource = new ClassPathResource("public/" + id);
            if(resource.exists()) {
                response.setContentType(Utils.guessContentType(id));
                IOUtils.copy(resource.getURL().openStream(), response.getOutputStream());
                response.flushBuffer();
            }
            else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND);
            }
        }
    }
}
