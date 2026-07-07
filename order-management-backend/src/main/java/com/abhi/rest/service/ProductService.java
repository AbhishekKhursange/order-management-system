package com.abhi.rest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abhi.rest.exception.ProductNotFoundException;
import com.abhi.rest.model.Product;
import com.abhi.rest.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	
	public Product saveProduct(Product product) {
		return productRepository.save(product);
	}
	
	public List<Product> saveProducts(List<Product> products) {
		return productRepository.saveAll(products);
	}
	
	public Product getProductById(Long id) {
		Optional<Product> optionalProduct = productRepository.findById(id);
		if(optionalProduct.isPresent()) {
			Product product = optionalProduct.get();
			return product;
		}
		
		else {
			throw new ProductNotFoundException("Product Is Not Found With Id " + id);
		}
	}

	public List<Product> getAllProducts() {
		List<Product> products = productRepository.findAll();
		if(products.isEmpty()) {
			throw new ProductNotFoundException("No Products Found.");
		}
		return products;
	}

	public void deleteProductById(Long id) {
		if(productRepository.existsById(id)) {
			productRepository.deleteById(id);
		}
		else {
			throw new ProductNotFoundException("Product Is Not Found With Id " + id);
		}
	}

	public void deleteAllProducts() {
		if(productRepository.count() == 0) {
			throw new ProductNotFoundException("No Products Found To Delete");
		}
		productRepository.deleteAll();
	}

	public Product updateProduct(Long id, Product product) {
		Optional<Product> optionalProduct = productRepository.findById(id);
		if(optionalProduct.isPresent()) {
			Product existingProduct = optionalProduct.get();
			
			existingProduct.setName(product.getName());
			existingProduct.setPrice(product.getPrice());
			existingProduct.setStock(product.getStock());
			
			productRepository.save(existingProduct);
			return existingProduct;
		}
		throw new ProductNotFoundException("Product Not Found With Id " + id);
	}

	public Product updateProductField(Long id, Product product) {
		Optional<Product> optionalProduct = productRepository.findById(id);
		if(optionalProduct.isPresent()) {
			Product existingProduct  = optionalProduct.get();
			
			existingProduct.setName(product.getName());
	        existingProduct.setBrand(product.getBrand());
	        existingProduct.setPrice(product.getPrice());
	        existingProduct.setStock(product.getStock());
	        existingProduct.setDiscount(product.getDiscount());
	        existingProduct.setCategory(product.getCategory());
	        existingProduct.setDescription(product.getDescription());
	        existingProduct.setRating(product.getRating());
			
			productRepository.save(existingProduct );
			return existingProduct ;
		}
		throw new ProductNotFoundException("Product Not Found With Id " + id);
	}
	
	
}

