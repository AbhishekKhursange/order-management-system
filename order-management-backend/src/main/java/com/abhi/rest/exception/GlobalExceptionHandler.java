package com.abhi.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(CustomerNotFoundException.class)
	public ResponseEntity<String> handleCustomerNotFound(CustomerNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.header("INFO", "Customer Is Not Found")
				.body(ex.getMessage());
	}
	
	@ExceptionHandler(ProductNotFoundException.class)
	public ResponseEntity<String> handleProductNotFound(ProductNotFoundException ex) {
	    return ResponseEntity.status(HttpStatus.NOT_FOUND)
	            .body(ex.getMessage());
	}

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<String> handleRuntime(RuntimeException ex) {
	    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(ex.getMessage());
	}
}

