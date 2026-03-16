package com.betrybe.alexandria.service;

import com.betrybe.alexandria.entity.Book;
import com.betrybe.alexandria.entity.BookDetail;
import com.betrybe.alexandria.exception.BookDetailNotFoundException;
import com.betrybe.alexandria.exception.BookNotFoundException;
import com.betrybe.alexandria.repository.BookDetailRepository;
import com.betrybe.alexandria.repository.BookRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

  private final BookRepository bookRepository;
  private final BookDetailRepository bookDetailRepository;

  @Autowired
  public BookService(BookRepository bookRepository, BookDetailRepository bookDetailRepository) {
    this.bookRepository = bookRepository;
    this.bookDetailRepository = bookDetailRepository;
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

  public BookDetail createBookDetail(Long bookId, BookDetail bookDetail) {
    Book book = bookRepository.findById(bookId)
        .orElseThrow(() -> new BookNotFoundException(bookId));

    bookDetail.setBook(book);

    return bookDetailRepository.save(bookDetail);

  }

  public BookDetail getBookDetail(Long bookId) {
    Book book = bookRepository.findById(bookId)
        .orElseThrow(() -> new BookNotFoundException(bookId));

    BookDetail bookDetail = book.getBookDetail();

    if (bookDetail == null) {
      throw new BookDetailNotFoundException(bookId);
    }

    return bookDetail;

  }

  public BookDetail updateBookDetail(Long bookId, BookDetail bookDetail) {

    BookDetail bookDetailFromDb = getBookDetail(bookId);

    bookDetailFromDb.setSummary(bookDetail.getSummary());
    bookDetailFromDb.setPageCount(bookDetail.getPageCount());
    bookDetailFromDb.setYear(bookDetail.getYear());
    bookDetailFromDb.setIsbn(bookDetail.getIsbn());

    return bookDetailRepository.save(bookDetailFromDb);

  }
}
