package com.betrybe.alexandria.controller;


import com.betrybe.alexandria.controller.dto.AuthorCreationDto;
import com.betrybe.alexandria.controller.dto.AuthorDto;
import com.betrybe.alexandria.controller.dto.BookDto;
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
  public ResponseEntity<AuthorDto> createAuthor(@RequestBody AuthorCreationDto authorCreationDto) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(AuthorDto.fromEntity(authorService.create(authorCreationDto.toEntity())));

  }

  @PutMapping("/{id}")
  public ResponseEntity<AuthorDto> updateAuthor(@PathVariable Long id,
      @RequestBody AuthorCreationDto authorCreationDto) {
    return ResponseEntity.ok(
        AuthorDto.fromEntity(authorService.update(id, authorCreationDto.toEntity())));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteAuthorById(@PathVariable Long id) {
    authorService.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{authorId}/books")
  public ResponseEntity<List<BookDto>> getAuthorBooks(@PathVariable Long authorId) {
    return ResponseEntity.ok(
        authorService.getAuthorBooks(authorId)
            .stream()
            .map(BookDto::fromEntity)
            .toList());
  }

}
