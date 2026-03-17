package com.betrybe.alexandria.controller;

import com.betrybe.alexandria.controller.dto.BookCreationDto;
import com.betrybe.alexandria.controller.dto.BookDetailCreationDto;
import com.betrybe.alexandria.controller.dto.BookDetailDto;
import com.betrybe.alexandria.controller.dto.BookDto;
import com.betrybe.alexandria.service.BookService;
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
@RequestMapping("/books")
public class BookController {

  private final BookService bookService;

  @Autowired
  public BookController(BookService bookService) {
    this.bookService = bookService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<BookDto> getBookById(@PathVariable Long id) {
    return ResponseEntity.ok(BookDto.fromEntity(bookService.findById(id)));
  }

  @GetMapping
  public ResponseEntity<List<BookDto>> getAllBooks() {
    return ResponseEntity.ok(bookService.findAll().stream().map(BookDto::fromEntity).toList());
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<BookDto> createBook(@RequestBody BookCreationDto bookCreationDto) {
    return ResponseEntity.ok(BookDto.fromEntity(bookService.create(bookCreationDto.toEntity())));

  }

  @PutMapping("/{id}")
  public ResponseEntity<BookDto> updateBook(@PathVariable Long id,
      @RequestBody BookCreationDto bookCreationDto) {
    return ResponseEntity.ok(
        BookDto.fromEntity(bookService.update(id, bookCreationDto.toEntity())));

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<BookDto> deleteBookById(@PathVariable Long id) {
    return ResponseEntity.ok(BookDto.fromEntity(bookService.deleteById(id)));
  }

  @PostMapping("/{bookId}/details")
  public ResponseEntity<BookDetailDto> createBookDetail(@PathVariable Long bookId,
      @RequestBody BookDetailCreationDto bookDetailDto) {
    return ResponseEntity.ok(BookDetailDto.fromEntity(bookService.createBookDetail(bookId,
        bookDetailDto.toEntity(bookService.findById(bookId)))));
  }

  public ResponseEntity<BookDetailDto> getBookDetail(@PathVariable Long bookId) {
    return ResponseEntity.ok(BookDetailDto.fromEntity(bookService.getBookDetail(bookId)));

  }

  public ResponseEntity<BookDetailDto> updateBookDetail(@PathVariable Long bookId,
      @RequestBody BookDetailCreationDto bookDetailDto) {
    return ResponseEntity.ok(BookDetailDto.fromEntity(bookService.updateBookDetail(bookId,
        bookDetailDto.toEntity(bookService.findById(bookId)))));
  }

  public ResponseEntity<BookDetailDto> removeBookDetail(@PathVariable Long bookId) {
    return ResponseEntity.ok(BookDetailDto.fromEntity(bookService.removeBookDetail(bookId)));
  }
}
