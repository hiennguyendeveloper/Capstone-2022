package com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ResponseStatusExceptionHandler extends ResponseStatusException {
    public ResponseStatusExceptionHandler(HttpStatus status) {
        super(status);
    }

    public ResponseStatusExceptionHandler(HttpStatus status, String reason) {
        super(status, reason);
    }

    public ResponseStatusExceptionHandler(HttpStatus status, String reason, Throwable cause) {
        super(status, reason, cause);
    }

    public ResponseStatusExceptionHandler(int rawStatusCode, String reason, Throwable cause) {
        super(rawStatusCode, reason, cause);
    }
}
