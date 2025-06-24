package com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Error {
    private final boolean displayToUser;
    private final String errorCode;
    private final String readableErrorMessage;
    private final String apiErrorResponse;
}
