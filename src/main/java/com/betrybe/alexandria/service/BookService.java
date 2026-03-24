package com.betrybe.alexandria.service;

import com.betrybe.alexandria.controller.dto.BookCreationDto;
import com.betrybe.alexandria.entity.Book;
import com.betrybe.alexandria.entity.BookDetail;
import com.betrybe.alexandria.exception.BookDetailNotFoundException;
import com.betrybe.alexandria.exception.BookNotFoundException;
import com.betrybe.alexandria.exception.EmptyBookListException;
import com.betrybe.alexandria.repository.BookDetailRepository;
import com.betrybe.alexandria.repository.BookRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookService {

  private final BookRepository bookRepository;
  private final BookDetailRepository bookDetailRepository;
  private final PublisherService publisherService;

  @Autowired
  public BookService(BookRepository bookRepository, BookDetailRepository bookDetailRepository,
      PublisherService publisherService) {
    this.bookRepository = bookRepository;
    this.bookDetailRepository = bookDetailRepository;
    this.publisherService = publisherService;
  }

  public Book findById(Long id) {
    return bookRepository.findById(id)
        .orElseThrow(() -> new BookNotFoundException(id));
  }

  public Page<Book> findAll(Pageable pageable) {
    return bookRepository.findAll(pageable);
  }

  public Book create(Book book) {
    return bookRepository.save(book);
  }

  public List<Book> createBatch(List<BookCreationDto> booksDto) {
    java.util.Optional.ofNullable(booksDto)
        .filter(list -> !list.isEmpty())
        .orElseThrow(EmptyBookListException::new);

    return booksDto.stream()
        .map(dto -> create(dto.toEntity(publisherService)))
        .toList();
  }


  public Book update(Long id, Book book) {
    Book bookToUpdate = bookRepository.findById(id)
        .orElseThrow(() -> new BookNotFoundException(id));

    if (book.getTitle() != null) {
      bookToUpdate.setTitle(book.getTitle());
    }

    if (book.getGenre() != null) {
      bookToUpdate.setGenre(book.getGenre());
    }

    if (book.getPublisher() != null) {
      publisherService.findById(book.getPublisher().getId());
      bookToUpdate.setPublisher(book.getPublisher());
    }

    return bookRepository.save(bookToUpdate);
  }

  public void deleteById(Long id) {
    Book bookToDelete = bookRepository.findById(id)
        .orElseThrow(() -> new BookNotFoundException(id));

    bookRepository.delete(bookToDelete);

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

  public void removeBookDetail(Long bookId) {
    BookDetail bookToRemove = getBookDetail(bookId);

    bookDetailRepository.delete(bookToRemove);

  }

}
