package com.betrybe.alexandria.repository;

import com.betrybe.alexandria.entity.Book;
import org.jspecify.annotations.NullMarked;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

  @NullMarked
  Page<Book> findAll(Pageable pageable);

}
