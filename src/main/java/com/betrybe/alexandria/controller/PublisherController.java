package com.betrybe.alexandria.controller;

import com.betrybe.alexandria.controller.dto.PublisherCreationDto;
import com.betrybe.alexandria.controller.dto.PublisherDto;
import com.betrybe.alexandria.service.PublisherService;
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
@RequestMapping("/publishers")
public class PublisherController {

  private final PublisherService publisherService;

  @Autowired
  public PublisherController(PublisherService publisherService) {
    this.publisherService = publisherService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<PublisherDto> getPublisherById(@PathVariable Long id) {
    return ResponseEntity.ok(PublisherDto.fromEntity(publisherService.findById(id)));
  }

  @GetMapping
  public ResponseEntity<List<PublisherDto>> getAllPublishers() {
    return ResponseEntity.ok(
        publisherService.findAll().stream().map(PublisherDto::fromEntity).toList());
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<PublisherDto> createPublisher(
      @RequestBody PublisherCreationDto publisherCreationDto) {
    return ResponseEntity.ok(
        PublisherDto.fromEntity(publisherService.create(publisherCreationDto.toEntity())));
  }

  @PutMapping("{/id}")
  public ResponseEntity<PublisherDto> updatePublisher(@PathVariable Long id,
      @RequestBody PublisherCreationDto publisherCreationDto) {
    return ResponseEntity.ok(
        PublisherDto.fromEntity(publisherService.update(id, publisherCreationDto.toEntity())));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<PublisherDto> deletePublisherById(@PathVariable Long id) {
    return ResponseEntity.ok(PublisherDto.fromEntity((publisherService.deleteById(id))));

  }

}
