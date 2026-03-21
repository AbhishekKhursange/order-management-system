package com.abhi.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abhi.rest.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
