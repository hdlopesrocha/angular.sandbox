package com.enter4ward.user.security;


import com.enter4ward.user.config.SecurityConstants;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {


    public JwtAuthenticationFilter() {
        super("/api/private/**");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String header = request.getHeader(SecurityConstants.HEADER_STRING);
        if(header == null ){
            throw new RuntimeException("JWT token is missing");
        }

        JwtAuthenticationToken token = new JwtAuthenticationToken(header);
        return getAuthenticationManager().authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        super.successfulAuthentication(request, response, chain, authResult);
        chain.doFilter(request,response);
    }
}