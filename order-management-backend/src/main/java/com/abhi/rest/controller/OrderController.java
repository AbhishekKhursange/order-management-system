package com.abhi.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abhi.rest.model.Order;
import com.abhi.rest.service.OrderService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/orders")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping
	public ResponseEntity<Order> createOrder(@RequestBody Order order) {
		
		Order savedOrder = orderService.createOrder(order);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.header("info", "Order Saved.")
				.body(savedOrder);
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {

        Order order = orderService.getOrderById(id);

        return ResponseEntity.ok(order);
    }
	
	@GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {

        List<Order> orders = orderService.getAllOrders();

        return ResponseEntity.ok(orders);
    }
	
	@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {

        orderService.deleteOrder(id);

        return ResponseEntity.noContent().build();
    }
}

