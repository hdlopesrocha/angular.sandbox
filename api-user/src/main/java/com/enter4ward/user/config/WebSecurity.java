package com.enter4ward.user.config;

import com.enter4ward.user.security.JwtAuthenticationEntryPoint;
import com.enter4ward.user.security.JwtAuthenticationFilter;
import com.enter4ward.user.security.JwtAuthenticationProvider;
import com.enter4ward.user.security.JwtSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Collections;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {


    private JwtAuthenticationProvider authenticationProvider;
    private JwtAuthenticationEntryPoint entryPoint;

    @Bean
    public AuthenticationManager authenticationManager(){
        return new ProviderManager(Collections.singletonList(authenticationProvider));
    }
    
    @Bean
    JwtAuthenticationFilter authenticationFilter(){
        JwtAuthenticationFilter filter = new JwtAuthenticationFilter();
        filter.setAuthenticationManager(authenticationManager());
        filter.setAuthenticationSuccessHandler(new JwtSuccessHandler());
        return filter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/private/**").authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(entryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(authenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        http.headers().cacheControl();
    }
}