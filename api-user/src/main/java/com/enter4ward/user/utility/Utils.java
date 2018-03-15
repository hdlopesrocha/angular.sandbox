package com.enter4ward.user.utility;

import javax.servlet.http.HttpServletRequest;

public class Utils {

    public static String getHost(final HttpServletRequest request) {
        String url = request.getRequestURL().toString();
        return url.substring(0, url.indexOf(request.getRequestURI()));
    }
}
