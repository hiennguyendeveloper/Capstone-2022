package com.EFP.EFP_Video_Dashboard_Backend.storage;

public class StorageException extends RuntimeException{

    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }

}
