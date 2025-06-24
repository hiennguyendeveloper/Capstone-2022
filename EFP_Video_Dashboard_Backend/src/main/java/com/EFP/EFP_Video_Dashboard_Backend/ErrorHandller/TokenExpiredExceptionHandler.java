package com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller;

import com.auth0.jwt.exceptions.TokenExpiredException;


public class TokenExpiredExceptionHandler extends TokenExpiredException {

    public TokenExpiredExceptionHandler(String message) {
        super(message);
    }


}
