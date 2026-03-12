package com.betrybe.alexandria.controller.dto;

import com.betrybe.alexandria.entity.Author;

public record AuthorCreationDto(String name, String nationality) {

  public Author toEntity(String name, String nationality) {
    return new Author(name, nationality);

  }

}
