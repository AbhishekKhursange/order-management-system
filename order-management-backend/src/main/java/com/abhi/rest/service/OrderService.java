package com.abhi.rest.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.abhi.rest.model.Order;
import com.abhi.rest.model.OrderItem;
import com.abhi.rest.model.Product;
import com.abhi.rest.repository.OrderRepository;
import com.abhi.rest.repository.ProductRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Order createOrder(Order order) {

        order.setOrderDate(LocalDate.now());
        
        double totalAmount = 0.0;

        for (OrderItem item : order.getOrderItems()) {

            Product product = productRepository.findById(
                    item.getProduct().getId()
            ).orElseThrow(() -> new RuntimeException("Product Not Found"));

            if (product.getStock() < item.getQuantity()) {
                throw new RuntimeException("Insufficient Stock for product: " + product.getName());
            }

            item.setPrice(product.getPrice());
            item.setOrder(order);
            
            totalAmount += product.getPrice() * item.getQuantity();

            // reduce stock
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
        }

        order.setTotalAmount(totalAmount);
        return orderRepository.save(order);
    }
    
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order Not Found With Id " + id));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order Not Found With Id " + id);
        }
        orderRepository.deleteById(id);
    }
}


