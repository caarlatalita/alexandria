package com.betrybe.alexandria.service;

import com.betrybe.alexandria.entity.Author;
import com.betrybe.alexandria.exception.AuthorNotFoundException;
import com.betrybe.alexandria.repository.AuthorRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {

  private final AuthorRepository authorRepository;

  @Autowired
  public AuthorService(AuthorRepository authorRepository) {
    this.authorRepository = authorRepository;
  }

  public Author findById(Long id) {
    return authorRepository.findById(id)
        .orElseThrow(() -> new AuthorNotFoundException(id));
  }

  public List<Author> findAll() {
    return authorRepository.findAll();
  }

  public Author create(Author author) {
    return authorRepository.save(author);
  }

  public Author update(Long id, Author author) {
    Author authorToUpdate = authorRepository.findById(id)
        .orElseThrow(() -> new AuthorNotFoundException(id));

    authorToUpdate.setName(author.getName());
    authorToUpdate.setNationality(author.getNationality());

    return authorRepository.save(authorToUpdate);
  }

  public Author deleteById(Long id) {
    Author authorToDelete = authorRepository.findById(id)
        .orElseThrow(() -> new AuthorNotFoundException(id));

    authorRepository.delete(authorToDelete);

    return authorToDelete;
  }
}
