package com.abhi.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.abhi.rest.model.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);
}