package com.betrybe.alexandria.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;

@Entity
@Table(name = "authors")
public class Author {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String nationality;

  @OneToMany(mappedBy = "author")
  private List<AuthorBooks> authorBooks;

  public Author() {
  }

  public Author(String name, String nationality) {
    this.name = name;
    this.nationality = nationality;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getNationality() {
    return nationality;
  }

  public void setNationality(String nationality) {
    this.nationality = nationality;
  }

  public List<AuthorBooks> getAuthorBooks() {
    return authorBooks;
  }

  private void setAuthorBooks(List<AuthorBooks> authorBooks) {
    this.authorBooks = authorBooks;
  }

  @Override
  public String toString() {
    return "Author{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", nationality='" + nationality + '\'' +
        '}';
  }
}
