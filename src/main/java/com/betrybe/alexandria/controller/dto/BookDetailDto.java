package com.betrybe.alexandria.controller.dto;

import com.betrybe.alexandria.entity.Book;
import com.betrybe.alexandria.entity.BookDetail;

public record BookDetailDto(Long bookId, String summary, Integer pageCount, String year,
                            String isbn) {

  public static BookDetailDto fromEntity(BookDetail bookDetail) {
    return new BookDetailDto(
        bookDetail.getBook().getId(),
        bookDetail.getSummary(),
        bookDetail.getPageCount(),
        bookDetail.getYear(),
        bookDetail.getIsbn()
    );
  }

}
