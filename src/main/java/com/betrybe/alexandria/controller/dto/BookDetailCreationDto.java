package com.betrybe.alexandria.controller.dto;

import com.betrybe.alexandria.entity.Book;
import com.betrybe.alexandria.entity.BookDetail;

public record BookDetailCreationDto(
    String summary,
    Integer pageCount,
    String year,
    String isbn) {

  public BookDetail toEntity(Book book) {
    return new BookDetail(book, summary, pageCount, year, isbn);
  }

}
