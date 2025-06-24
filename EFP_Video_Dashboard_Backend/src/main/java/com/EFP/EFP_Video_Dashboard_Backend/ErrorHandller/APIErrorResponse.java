package com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller;

public enum APIErrorResponse {
    TokenExpired,
    UnknownError,
    JWTVerificationError,
    ConcurrentModificationError,
    MissingServletRequestParameterException,
    NoSuchElementException,
    EmailConfirmationRequired,
    SectionDelete,
    ModuleDelete,
    LessonDelete,
    DefaultError;

    @Override
    public String toString(){
        return super.toString().replaceAll("()([A-Z])", "$1_$2");
    }
}
