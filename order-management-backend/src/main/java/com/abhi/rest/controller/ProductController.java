package com.abhi.rest.controller;

import java.io.IOException;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.abhi.rest.model.Product;
import com.abhi.rest.service.CloudinaryService;
import com.abhi.rest.service.ProductService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
    private CloudinaryService cloudinaryService;
	
//	@PostMapping
//	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
//		Product saved = productService.saveProduct(product);
//		
//		return ResponseEntity.status(HttpStatus.CREATED)
//				.header("INFO", "Product Saved.")
//				.body(saved);
//	}
	
	@PostMapping("/bulk")
	public ResponseEntity<List<Product>> createMultipleProducts(@RequestBody List<Product> products) {
		List<Product> savedProducts = productService.saveProducts(products);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.header("INFO", "All Products Saved.")
				.body(savedProducts);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable Long id) {
		Product fetch = productService.getProductById(id);
		
		return ResponseEntity.status(HttpStatus.OK)
				.header("INFO", "Product Fetched Successfully.")
				.body(fetch);
		
	}
	
	@GetMapping("/bulk")
	public ResponseEntity<List<Product>> getAllProducts() {
		List<Product> products = productService.getAllProducts();
		
		return ResponseEntity.status(HttpStatus.OK)
				.header("INFO", "All Products Fetched Successfully.")
				.body(products);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		productService.deleteProductById(id);
		
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@DeleteMapping("/bulk")
	public ResponseEntity<Void> deleteAll() {
		productService.deleteAllProducts();
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<Product> updateProduct(
			@PathVariable Long id, @RequestBody Product product) {
		Product updatedProduct = productService.updateProduct(id, product);
		
		return ResponseEntity.status(HttpStatus.OK)
				.header("INFO", "Product Updated With Id " + id)
				.body(updatedProduct);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Product> updateField(
			@PathVariable Long id, @RequestBody Product product) {
		Product updatedProduct = productService.updateProductField(id, product);
		
		return ResponseEntity.status(HttpStatus.OK)
				.header("INFO", "Product Fields Updated Having Id " + id)
				.body(updatedProduct);
	}
	
	@PostMapping("/upload")
    public ResponseEntity<Product> uploadProduct(
            @RequestParam String name,
            @RequestParam String brand,
            @RequestParam Double price,
            @RequestParam(defaultValue = "0") Integer discount,
            @RequestParam Integer stock,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String description,
            @RequestParam(defaultValue = "0.0") Double rating,
            @RequestParam MultipartFile file
    ) throws IOException {

        // Upload image to Cloudinary — returns permanent URL
        String imageUrl = cloudinaryService.uploadImage(file);

        Product product = new Product();
        product.setName(name);
        product.setBrand(brand);
        product.setPrice(price);
        product.setDiscount(discount);
        product.setStock(stock);
        product.setCategory(category);
        product.setDescription(description);
        product.setRating(rating);
        product.setImageName(imageUrl); // Store full Cloudinary URL

	    // Save to database
	    Product saved = productService.saveProduct(product);

	    return ResponseEntity.status(HttpStatus.CREATED)
	            .header("INFO", "Product Saved Successfully")
	            .body(saved);
	}
}

