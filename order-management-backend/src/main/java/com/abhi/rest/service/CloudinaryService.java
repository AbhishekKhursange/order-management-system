package com.abhi.rest.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    @SuppressWarnings("unchecked")
    public String uploadImage(MultipartFile file) throws IOException {
    	Map<String, Object> uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "order-management/products",
                        "resource_type", "auto"
                )
        );
        // Returns the permanent Cloudinary URL
        return (String) uploadResult.get("secure_url");
    }

    public void deleteImage(String imageUrl) throws IOException {
        // Extract public_id from URL for deletion
        String publicId = extractPublicId(imageUrl);
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    private String extractPublicId(String imageUrl) {
        // URL format: https://res.cloudinary.com/cloud-name/image/upload/v123/folder/filename.ext
        String[] parts = imageUrl.split("/");
        String filename = parts[parts.length - 1];
        String folder = parts[parts.length - 2];
        // Remove file extension
        String nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
        return folder + "/" + nameWithoutExt;
    }
}
