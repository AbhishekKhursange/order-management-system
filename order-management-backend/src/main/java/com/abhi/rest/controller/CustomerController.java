package com.abhi.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.abhi.rest.model.AuthResponse;
import com.abhi.rest.model.Customer;
import com.abhi.rest.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // ─── Public ───────────────────────────────────────────────────────────────

    @PostMapping("/register")
    public ResponseEntity<Customer> register(@RequestBody Customer customer) {
        Customer saved = customerService.saveCustomer(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody Customer loginRequest) {
        AuthResponse response = customerService.login(
                loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(response);
    }

    // ─── Authenticated ────────────────────────────────────────────────────────

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable Long id, @RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.updateCustomer(id, customer));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Customer> updateField(
            @PathVariable Long id, @RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.updateCustomerField(id, customer));
    }

    // ─── Admin only ───────────────────────────────────────────────────────────

    @PostMapping("/bulk")
    public ResponseEntity<List<Customer>> createMultipleCustomers(
            @RequestBody List<Customer> customers) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(customerService.saveCustomers(customers));
    }

    @GetMapping("/bulk")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        customerService.deleteCustomerById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/bulk")
    public ResponseEntity<Void> deleteAll() {
        customerService.deleteAllCustomers();
        return ResponseEntity.noContent().build();
    }
}