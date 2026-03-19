package com.betrybe.alexandria.controller.dto;

import com.betrybe.alexandria.entity.Book;
import com.betrybe.alexandria.service.PublisherService;

public record BookCreationDto(String title, String genre, Long publisherId) {

  public Book toEntity(PublisherService publisherService) {
    Book book = new Book(this.title, this.genre);

    if (this.publisherId != null) {
      book.setPublisher(publisherService.findById(this.publisherId));

    }

    return book;
  }

}
