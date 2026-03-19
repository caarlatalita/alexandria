package com.betrybe.alexandria.service;

import com.betrybe.alexandria.controller.dto.PublisherCreationDto;
import com.betrybe.alexandria.entity.Book;
import com.betrybe.alexandria.entity.Publisher;
import com.betrybe.alexandria.exception.EmptyPublisherListException;
import com.betrybe.alexandria.exception.PublisherNotFoundException;
import com.betrybe.alexandria.repository.PublisherRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublisherService {

  private final PublisherRepository publisherRepository;

  @Autowired
  public PublisherService(PublisherRepository publisherRepository) {
    this.publisherRepository = publisherRepository;
  }

  public Publisher findById(Long id) {
    return publisherRepository.findById(id)
        .orElseThrow(() -> new PublisherNotFoundException(id));
  }

  public List<Publisher> findAll() {
    return publisherRepository.findAll();
  }

  public Publisher create(Publisher publisher) {
    return publisherRepository.save(publisher);
  }

  public List<Publisher> createBatch(List<PublisherCreationDto> publishersCreationDto) {
    java.util.Optional.ofNullable(publishersCreationDto)
        .filter(list -> !list.isEmpty())
        .orElseThrow(EmptyPublisherListException::new);

    return publishersCreationDto.stream()
        .map(dto -> create(dto.toEntity()))
        .toList();
  }


  public Publisher update(Long id, Publisher publisher) {
    Publisher publisherToUpdate = publisherRepository.findById(id)
        .orElseThrow(() -> new PublisherNotFoundException(id));

    publisherToUpdate.setName(publisher.getName());
    publisherToUpdate.setAddress(publisher.getAddress());

    return publisherRepository.save(publisherToUpdate);
  }

  public void deleteById(Long id) {
    Publisher publisherToDelete = publisherRepository.findById(id)
        .orElseThrow(() -> new PublisherNotFoundException(id));

    publisherRepository.delete(publisherToDelete);

  }

  public List<Book> getPublisherBooks(Long publisherId) {
    Publisher publisher = findById(publisherId);

    if (publisher.getBooks() == null || publisher.getBooks().isEmpty()) {
      return List.of();
    }

    return publisher.getBooks();
  }

}
