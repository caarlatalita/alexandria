package com.betrybe.alexandria.controller;

import com.betrybe.alexandria.controller.dto.BookCreationDto;
import com.betrybe.alexandria.controller.dto.BookDetailCreationDto;
import com.betrybe.alexandria.controller.dto.BookDetailDto;
import com.betrybe.alexandria.controller.dto.BookDto;
import com.betrybe.alexandria.service.BookService;
import com.betrybe.alexandria.service.PublisherService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
@RequestMapping("/books")
public class BookController {

  private final BookService bookService;
  private final PublisherService publisherService;

  @Autowired
  public BookController(BookService bookService, PublisherService publisherService) {
    this.bookService = bookService;
    this.publisherService = publisherService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<BookDto> getBookById(@PathVariable Long id) {
    return ResponseEntity.ok(BookDto.fromEntity(bookService.findById(id)));
  }

  @GetMapping
  public ResponseEntity<Page<BookDto>> getAllBooks(Pageable pageable) {
    Page<BookDto> books = bookService.findAll(pageable)
        .map(BookDto::fromEntity);

    return ResponseEntity.ok(books);
  }

  @PostMapping
  public ResponseEntity<BookDto> createBook(@RequestBody BookCreationDto bookCreationDto) {
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(BookDto.fromEntity(bookService.create(bookCreationDto.toEntity(publisherService))));
  }

  @PostMapping("/batch")
  public ResponseEntity<List<BookDto>> createBooks(
      @RequestBody List<BookCreationDto> bookCreationDto) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(bookService.createBatch(bookCreationDto)
            .stream()
            .map(BookDto::fromEntity)
            .toList());
  }

  @PutMapping("/{id}")
  public ResponseEntity<BookDto> updateBook(@PathVariable Long id,
      @RequestBody BookCreationDto bookCreationDto) {
    return ResponseEntity.ok(
        BookDto.fromEntity(bookService.update(id, bookCreationDto.toEntity(publisherService))));

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteBookById(@PathVariable Long id) {
    bookService.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/{bookId}/detail")
  public ResponseEntity<BookDetailDto> createBookDetail(@PathVariable Long bookId,
      @RequestBody BookDetailCreationDto bookDetailDto) {
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(BookDetailDto.fromEntity(bookService.createBookDetail(bookId,
            bookDetailDto.toEntity(bookService.findById(bookId)))));
  }

  @GetMapping("/{bookId}/detail")
  public ResponseEntity<BookDetailDto> getBookDetail(@PathVariable Long bookId) {
    return ResponseEntity.ok(BookDetailDto.fromEntity(bookService.getBookDetail(bookId)));

  }

  @PutMapping("/{bookId}/detail")
  public ResponseEntity<BookDetailDto> updateBookDetail(@PathVariable Long bookId,
      @RequestBody BookDetailCreationDto bookDetailDto) {
    return ResponseEntity.ok(BookDetailDto.fromEntity(bookService.updateBookDetail(bookId,
        bookDetailDto.toEntity(bookService.findById(bookId)))));
  }

  @DeleteMapping("/{bookId}/detail")
  public ResponseEntity<Void> removeBookDetail(@PathVariable Long bookId) {
    bookService.removeBookDetail(bookId);
    return ResponseEntity.noContent().build();
  }

}
