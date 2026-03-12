package com.betrybe.alexandria.service;

import com.betrybe.alexandria.entity.Book;
import com.betrybe.alexandria.exception.BookNotFoundException;
import com.betrybe.alexandria.repository.BookRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

  private final BookRepository bookRepository;

  @Autowired
  public BookService(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  public Book findById(Long id) {
    return bookRepository.findById(id)
        .orElseThrow(() -> new BookNotFoundException(id));
  }

  public List<Book> findAll() {
    return bookRepository.findAll();
  }

  public Book create(Book book) {
    return bookRepository.save(book);
  }

  public Book update(Long id, Book book) {
    Book bookToUpdate = bookRepository.findById(id)
        .orElseThrow(() -> new BookNotFoundException(id));

    bookToUpdate.setTitle(book.getTitle());
    bookToUpdate.setGenre(book.getGenre());

    return bookRepository.save(bookToUpdate);
  }

  public Book deleteById(Long id) {

    Book bookToDelete = bookRepository.findById(id)
            .orElseThrow(() -> new BookNotFoundException(id));

    bookRepository.delete(bookToDelete);

    return bookToDelete;

  }
}
