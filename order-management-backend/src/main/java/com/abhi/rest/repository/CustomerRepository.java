package com.abhi.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abhi.rest.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long>{

	Customer findByEmailAndPassword(String email, String password);
}

