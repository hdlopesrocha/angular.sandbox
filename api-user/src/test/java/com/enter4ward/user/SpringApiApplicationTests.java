package com.enter4ward.user;

import com.enter4ward.user.security.JwtUser;
import com.enter4ward.user.security.JwtValidator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.UUID;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringApiApplicationTests {

    @Autowired
    JwtValidator validator;

    @Test
    public void testJwtValidator() {
        JwtUser user = new JwtUser();
        user.setId(UUID.randomUUID());
        String token = validator.write(user);
        JwtUser result = validator.read(token);
        assert user.getId().equals(result.getId());
    }

}
