package com.enter4ward.user.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    public static final String HEADER_STRING = "Authorization";
    public static final String OPTIONS = "OPTIONS";
    public static final String [] PUBLIC_PATHS = new String [] {"/api/public/", "/public/"};

    private JwtValidator validator;

    public JwtAuthenticationFilter(JwtValidator validator) {
        this.validator = validator;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        if (OPTIONS.equals(request.getMethod())) {
            return true;
        }
        return false;
    }

    private boolean isPublic(HttpServletRequest request){
        return Arrays.stream(PUBLIC_PATHS).anyMatch( path ->
            request.getRequestURI().startsWith(path)
        );
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        String header = request.getHeader(HEADER_STRING);
        if (header == null) {
            if(isPublic(request)) {
                chain.doFilter(request, response);
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            }
            return;
        }

        // Exclude Bearer
        String token = header.substring(7);
        JwtUser jwtUser = validator.read(token);
        if (jwtUser == null) {
            if(isPublic(request)) {
                chain.doFilter(request, response);
            } else {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
            return;
        }

        SecurityContextHolder.getContext().setAuthentication(new JwtAuthentication(jwtUser.getId()));
        chain.doFilter(request, response);
    }


}