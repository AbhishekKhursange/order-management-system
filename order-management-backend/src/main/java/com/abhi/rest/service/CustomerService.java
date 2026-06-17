package com.abhi.rest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.abhi.rest.exception.CustomerNotFoundException;
import com.abhi.rest.model.AuthResponse;
import com.abhi.rest.model.Customer;
import com.abhi.rest.repository.CustomerRepository;
import com.abhi.rest.security.JwtUtil;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Register — hashes password, sets default role USER
    public Customer saveCustomer(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        if (customer.getRole() == null) {
            customer.setRole(Customer.Role.USER);
        }
        return customerRepository.save(customer);
    }

    public List<Customer> saveCustomers(List<Customer> customers) {
        customers.forEach(c -> c.setPassword(passwordEncoder.encode(c.getPassword())));
        return customerRepository.saveAll(customers);
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer Not Found With Id " + id));
    }

    public List<Customer> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        if (customers.isEmpty()) {
            throw new CustomerNotFoundException("No Customers Found.");
        }
        return customers;
    }

    public void deleteCustomerById(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new CustomerNotFoundException("Customer Not Found With Id " + id);
        }
        customerRepository.deleteById(id);
    }

    public void deleteAllCustomers() {
        if (customerRepository.count() == 0) {
            throw new CustomerNotFoundException("No Customers Found To Delete");
        }
        customerRepository.deleteAll();
    }

    public Customer updateCustomer(Long id, Customer customer) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer Not Found With Id " + id));

        existing.setName(customer.getName());
        existing.setEmail(customer.getEmail());
        existing.setPhone(customer.getPhone());

        return customerRepository.save(existing);
    }

    public Customer updateCustomerField(Long id, Customer customer) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer Not Found With Id " + id));

        if (customer.getName() != null) existing.setName(customer.getName());
        if (customer.getEmail() != null) existing.setEmail(customer.getEmail());
        if (customer.getPhone() != null) existing.setPhone(customer.getPhone());

        return customerRepository.save(existing);
    }

    // Login — verify BCrypt password and return JWT
    public AuthResponse login(String email, String password) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new CustomerNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(password, customer.getPassword())) {
            throw new CustomerNotFoundException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(customer.getEmail(), customer.getRole().name());

        return new AuthResponse(
                token,
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getRole().name()
        );
    }
}