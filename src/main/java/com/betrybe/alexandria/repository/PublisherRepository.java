package com.betrybe.alexandria.repository;

import com.betrybe.alexandria.entity.Publisher;
import org.jspecify.annotations.NullMarked;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {

  @NullMarked
  Page<Publisher> findAll(Pageable pageable);

}
