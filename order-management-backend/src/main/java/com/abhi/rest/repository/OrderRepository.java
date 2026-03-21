package com.abhi.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abhi.rest.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}

