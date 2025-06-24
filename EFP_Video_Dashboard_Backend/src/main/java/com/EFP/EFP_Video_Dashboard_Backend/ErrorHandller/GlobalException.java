package com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import java.util.ConcurrentModificationException;
import java.util.NoSuchElementException;

@ControllerAdvice
public class GlobalException {

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<Error> handleRegularException(Exception e){
//        Error error = new Error(true, HttpStatus.BAD_REQUEST.toString(), e.getLocalizedMessage(),APIErrorResponse.UnknownError.toString());
//        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
//    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Error> handleRuntimeException(RuntimeException e){
        Error error = new Error(true, HttpStatus.BAD_REQUEST.toString(), e.getLocalizedMessage(), APIErrorResponse.UnknownError.toString());
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(ConcurrentModificationException.class)
    public ResponseEntity<Error> handleConcurrentModificationException(ConcurrentModificationException e){
        Error error = new Error(false, HttpStatus.BAD_REQUEST.toString(), e.getLocalizedMessage(), APIErrorResponse.ConcurrentModificationError.toString());
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<Error> handleTokenExpiredException(TokenExpiredException e){
        Error error = new Error(true, HttpStatus.FORBIDDEN.toString(), e.getLocalizedMessage(), APIErrorResponse.TokenExpired.toString());
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(TokenExpiredExceptionHandler.class)
    public ResponseEntity<Error> handleTokenExpiredException(TokenExpiredExceptionHandler e){
        Error error = new Error(true, HttpStatus.FORBIDDEN.toString(), e.getLocalizedMessage(), APIErrorResponse.TokenExpired.toString());
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(JWTVerificationException.class)
    public ResponseEntity<Error> handleJwtExpiredException(JWTVerificationException e){
        Error error = new Error(true, HttpStatus.FORBIDDEN.toString(), e.getLocalizedMessage(), APIErrorResponse.JWTVerificationError.toString());
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Error> handleResponseStatusException(ResponseStatusException e){
        Error error = new Error(false, HttpStatus.BAD_REQUEST.toString(), e.getLocalizedMessage(), APIErrorResponse.DefaultError.toString());
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConfirmationRequiredException.class)
    public ResponseEntity<Error> handleConfirmationRequiredException(ConfirmationRequiredException e){
        Error error = new Error(true, HttpStatus.BAD_REQUEST.toString(), e.getLocalizedMessage(), APIErrorResponse.EmailConfirmationRequired.toString());
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SectionDeleteException.class)
    public ResponseEntity<Error> handleSectionDeleteException(SectionDeleteException e){
        Error error = new Error(true, HttpStatus.BAD_REQUEST.toString(), e.getLocalizedMessage(), APIErrorResponse.SectionDelete.toString());
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ModuleDeleteException.class)
    public ResponseEntity<Error> handleModuleDeleteException(ModuleDeleteException e){
        Error error = new Error(true, HttpStatus.BAD_REQUEST.toString(), e.getLocalizedMessage(), APIErrorResponse.ModuleDelete.toString());
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(LessonDeleteException.class)
    public ResponseEntity<Error> handleLessonDeleteException(LessonDeleteException e){
        Error error = new Error(true, HttpStatus.BAD_REQUEST.toString(), e.getLocalizedMessage(), APIErrorResponse.LessonDelete.toString());
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<Error> handleMissingServletRequestParameterException(MissingServletRequestParameterException e){
        Error error = new Error(true, HttpStatus.BAD_REQUEST.toString(), e.getLocalizedMessage(), APIErrorResponse.MissingServletRequestParameterException.toString());
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Error> handleNoSuchElementExceptionException(NoSuchElementException e){
        Error error = new Error(false, HttpStatus.BAD_REQUEST.toString(), e.getLocalizedMessage(), APIErrorResponse.NoSuchElementException.toString());
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

}
