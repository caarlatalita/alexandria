package com.betrybe.alexandria.exception;

public class EmptyAuthorListException extends RuntimeException {
  public EmptyAuthorListException(String message) {
    super(message);
  }
}
