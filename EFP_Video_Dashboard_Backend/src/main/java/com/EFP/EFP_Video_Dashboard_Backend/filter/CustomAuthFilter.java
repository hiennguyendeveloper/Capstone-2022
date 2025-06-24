package com.EFP.EFP_Video_Dashboard_Backend.filter;


import com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller.TokenExpiredExceptionHandler;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@Component
public class CustomAuthFilter extends OncePerRequestFilter {

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.warn("CustomAuthFilter -- doFilterInternal -- resuming filter chain...requested url:{}",request.getServletPath());
         if(request.getServletPath().equals("/api/v1/user/**")){
            filterChain.doFilter(request,response);
        }
        else{
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
                try {
                    String token = authorizationHeader.substring("Bearer ".length());
                    JWTVerifier verifier = JWT.require(Algorithm.HMAC256("1zirfq!$61q7)uwtxxsqm($66@9)+64ptjaz8-9w_)-_w4xtx5-ogk%pd2u(uwv-iw#*qkd-af!ns1piocl_6n7k!#873#bwl@lc")).build();
                    DecodedJWT decodedJWT;
                    try {
                        decodedJWT = verifier.verify(token);
                    } catch (TokenExpiredException tokenExpiredException) {
                        throw new TokenExpiredExceptionHandler("Your Token has expired. Please login again.");
                    }


                    String[] roles = decodedJWT.getClaim("role").asArray(String.class);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    stream(roles).forEach(role -> {
                        authorities.add(new SimpleGrantedAuthority(role));
                    });


                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(null, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request, response);
                    log.warn("CustomAuthFilter -- doFilterInternal -- Token Accepted:{}",request.getServletPath());
                }catch (Exception exception){
                    log.error("{}",exception.getClass());
                    log.error("Error logging in {}",exception.getMessage());
                    response.setHeader("error",exception.getMessage());
                    response.setStatus(FORBIDDEN.value());
                    response.setContentType(APPLICATION_JSON_VALUE);
                    resolver.resolveException(request,response,null,exception);
                }

            }
            else {
                filterChain.doFilter(request,response);
            }
        }
    }
}
