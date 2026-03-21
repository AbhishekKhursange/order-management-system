package com.abhi.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abhi.rest.model.Customer;
import com.abhi.rest.service.CustomerService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/customer")
public class CustomerController {


	@Autowired
	private CustomerService customerService;

	
	@PostMapping
	public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
		Customer saved = customerService.saveCustomer(customer);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.header("INFO", "Customer Saved Successfully..")
				.body(saved);
	}
	
	@PostMapping("/bulk")
	public ResponseEntity<List<Customer>> createMultipleCustomers(@RequestBody List<Customer> customers) {
		List<Customer> savedCustomers = customerService.saveCustomers(customers);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.header("INFO", "All Customers Saved Successfully..")
				.body(savedCustomers);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
		Customer fetch = customerService.getCustomerById(id);
		
		return ResponseEntity.status(HttpStatus.OK)
				.header("INFO", "Customer Fetched Successfully.")
				.body(fetch);
	}
	
	@GetMapping("/bulk")
	public ResponseEntity<List<Customer>> getAllCustomers() {
		List<Customer> customers = customerService.getAllCustomers();
		
		return ResponseEntity.status(HttpStatus.OK)
				.header("INFO", "All Customers Fetched Successfully.")
				.body(customers);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		customerService.deleteCustomerById(id);
		
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@DeleteMapping("/bulk") 
	public ResponseEntity<Void> deleteAll() {
		customerService.deleteAllCustomers();
		
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Customer> updateCustomer(
			@PathVariable Long id, @RequestBody Customer customer) {
		Customer updatedCustomer  = customerService.updateCustomer(id, customer);
		
		return ResponseEntity.status(HttpStatus.OK)
				.header("INFO", "Customer Updated With Id " + id)
				.body(updatedCustomer);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Customer> updateField(
			@PathVariable Long id, @RequestBody Customer customer) {
		Customer updatedField = customerService.updateCustomerField(id, customer);
		
		return ResponseEntity.status(HttpStatus.OK)
				.header("INFO", "Customer Fields Updated Having Id " + id)
				.body(updatedField);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Customer loginRequest) {

	    Customer customer = customerService
	            .findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());

	    if (customer == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .header("INFO", "Invalid Email or Password")
	                .body("Login Failed");
	    }

	    return ResponseEntity.status(HttpStatus.OK)
	            .header("INFO", "Login Successful")
	            .body(customer);
	}
}
