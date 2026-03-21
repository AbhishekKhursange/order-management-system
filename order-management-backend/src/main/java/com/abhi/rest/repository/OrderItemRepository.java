package com.abhi.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.abhi.rest.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
