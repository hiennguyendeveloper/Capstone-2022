package com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class SectionDeleteException extends ResponseStatusException {
    public SectionDeleteException(HttpStatus badRequest, String reason) {
        super(badRequest,reason);
    }
}
