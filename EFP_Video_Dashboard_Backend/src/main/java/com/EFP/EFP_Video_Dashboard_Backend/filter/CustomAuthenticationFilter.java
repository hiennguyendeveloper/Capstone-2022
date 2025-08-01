package com.EFP.EFP_Video_Dashboard_Backend.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager){
    }

//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//        String email = request.getParameter("email");
//        String password = request.getParameter("password");
//
//        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(email,password);
//
//        return authenticationManager.authenticate(usernamePasswordAuthenticationToken);
//
//    }

//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
//        User user = (User) authentication.getPrincipal();
//        //todo create a seceret and store in local vars
//        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes(StandardCharsets.UTF_8));
//        String access_token = JWT.create()
//                .withSubject(user.getUsername())
//                //10 minutes
//                .withExpiresAt(new Date(System.currentTimeMillis()+ 10*60*1000))
//                .withIssuer(request.getRequestURL().toString())
//                .withClaim("role",user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
////                .withClaim("role",user.getAuthorities().toString())
//                .sign(algorithm);
//
//        String refresh_token = JWT.create()
//                .withSubject(user.getUsername())
//                //4 hours
//                .withExpiresAt(new Date(System.currentTimeMillis()+ 240 *60*1000))
//                .withIssuer(request.getRequestURL().toString())
//                .sign(algorithm);
////        response.setHeader("access_token",access_token);
////        response.setHeader("refresh_token",refresh_token);
//        Map<String,String> tokens = new HashMap<>();
//        tokens.put("access_token",access_token);
//        tokens.put("refresh_token",refresh_token);
//        response.setContentType(APPLICATION_JSON_VALUE);
//        new ObjectMapper().writeValue(response.getOutputStream(),tokens);
//    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        log.warn("something went wrong...");
        super.unsuccessfulAuthentication(request, response, failed);
    }
}
