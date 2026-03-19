package com.betrybe.alexandria.controller;


import com.betrybe.alexandria.controller.dto.AuthorCreationDto;
import com.betrybe.alexandria.controller.dto.AuthorDto;
import com.betrybe.alexandria.service.AuthorService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authors")
public class AuthorController {

  private final AuthorService authorService;

  @Autowired
  public AuthorController(AuthorService authorService) {
    this.authorService = authorService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<AuthorDto> getAuthorById(@PathVariable Long id) {
    return ResponseEntity.ok(AuthorDto.fromEntity(authorService.findById(id)));
  }

  @GetMapping
  public ResponseEntity<List<AuthorDto>> getAllAuthors() {
    return ResponseEntity.ok(authorService.findAll().stream().map(AuthorDto::fromEntity).toList());
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<AuthorDto> createAuthor(@RequestBody AuthorCreationDto authorCreationDto) {
    return ResponseEntity.ok(
        AuthorDto.fromEntity(authorService.create(authorCreationDto.toEntity())));

  }

  @PutMapping("/{id}")
  public ResponseEntity<AuthorDto> updateAuthor(@PathVariable Long id,
      @RequestBody AuthorCreationDto authorCreationDto) {
    return ResponseEntity.ok(
        AuthorDto.fromEntity(authorService.update(id, authorCreationDto.toEntity())));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<AuthorDto> deleteAuthorById(@PathVariable Long id) {
    return ResponseEntity.ok(AuthorDto.fromEntity(authorService.deleteById(id)));
  }

}
