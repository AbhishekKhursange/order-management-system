package com.abhi.rest.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abhi.rest.exception.CustomerNotFoundException;
import com.abhi.rest.model.Customer;
import com.abhi.rest.repository.CustomerRepository;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;
	
	public Customer saveCustomer(Customer customer) {
		return customerRepository.save(customer);
	}
	
	public List<Customer> saveCustomers(List<Customer> customers) {
		return customerRepository.saveAll(customers);
	}
	
	public Customer getCustomerById(Long id) {
		Optional<Customer> optionalCust = customerRepository.findById(id);
		if(optionalCust.isPresent()) {
			Customer customer = optionalCust.get();
			return customer;
		}
		
		else {
			throw new CustomerNotFoundException("Customer Is Not Found With Id " + id);
		}
	}
	
	public List<Customer> getAllCustomers() {
		List<Customer> customers = customerRepository.findAll();
		if(customers.isEmpty()) {
			throw new CustomerNotFoundException("No Customers Found.");
		}
		return customers;
	}

	public void deleteCustomerById(Long id) {
		if(customerRepository.existsById(id)) {
			customerRepository.deleteById(id);
		}
		else {
			throw new CustomerNotFoundException("Customer Is Not Found With Id " + id);
		}
	}

	public void deleteAllCustomers() {
		if(customerRepository.count() == 0) {
			throw new CustomerNotFoundException("No Customers Found To Delete");
		}
		customerRepository.deleteAll();
	}

	public Customer updateCustomer(Long id, Customer customer) {
		Optional<Customer> optionalCustomer = customerRepository.findById(id);
		if(optionalCustomer.isPresent()) {
			Customer existingCustomer = optionalCustomer.get();
			
			existingCustomer.setName(customer.getName());
			existingCustomer.setEmail(customer.getEmail());
			existingCustomer.setPhone(customer.getPhone());
			
			customerRepository.save(existingCustomer);
			return existingCustomer;
		}
		throw new CustomerNotFoundException("Customers Not Found With Id " + id);
	}

	public Customer updateCustomerField(Long id, Customer customer) {
		Optional<Customer> optionalCustomer = customerRepository.findById(id);
		if(optionalCustomer.isPresent()) {
			Customer existCustomer = optionalCustomer.get();
			
			if(customer.getName() != null) {
				existCustomer.setName(customer.getName());
			}
			
			if(customer.getEmail() != null) {
				existCustomer.setEmail(customer.getEmail());
			}
			
			if(customer.getPhone() != null) {
				existCustomer.setPhone(customer.getPhone());
			}
			
			customerRepository.save(existCustomer);
			return existCustomer;
		}
		throw new CustomerNotFoundException("Customer Not Found With Id " + id);
	}

	public Customer findByEmailAndPassword(String email, String password) {
	    return customerRepository.findByEmailAndPassword(email, password);
	}
	
}

