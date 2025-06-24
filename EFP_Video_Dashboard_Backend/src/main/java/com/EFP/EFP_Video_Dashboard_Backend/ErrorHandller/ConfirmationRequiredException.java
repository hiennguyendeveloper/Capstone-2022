package com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ConfirmationRequiredException extends ResponseStatusException {

    public ConfirmationRequiredException(HttpStatus notFound, String reason) {
        super(notFound,reason);
    }
}
