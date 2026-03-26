# Product APIs - Complete Documentation

## 📦 All Product Endpoints

| Method | Endpoint | Auth | Role | Purpose |
|--------|----------|------|------|---------|
| GET | `/api/products` | ❌ | - | Get all products (public) |
| GET | `/api/products/:id` | ❌ | - | Get product by ID (public) |
| POST | `/api/products` | ✅ | Admin | Add new product (admin only) |
| PUT | `/api/products/:id` | ✅ | Admin | Update product (admin only) |
| DELETE | `/api/products/:id` | ✅ | Admin | Delete product (admin only) |

---

## 🔓 PUBLIC ENDPOINTS (No Authentication)

### 1. Get All Products

**Endpoint:**
```
GET http://localhost:5000/api/products
```

**Query Parameters:**
- `q` - Search by product name (optional)
- `category` - Filter by category (optional)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Examples:**
```
GET http://localhost:5000/api/products
GET http://localhost:5000/api/products?q=iPhone
GET http://localhost:5000/api/products?category=Electronics
GET http://localhost:5000/api/products?page=1&limit=5
GET http://localhost:5000/api/products?q=Apple&category=Electronics&page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "iPhone 14 Pro",
      "price": 999,
      "category": "Electronics",
      "stockQuantity": 50,
      "description": "Latest Apple iPhone",
      "imageUrl": "https://example.com/iphone14.jpg",
      "brand": "Apple",
      "discount": 5,
      "createdAt": "2024-03-26T10:30:00.000Z",
      "updatedAt": "2024-03-26T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

### 2. Get Product by ID

**Endpoint:**
```
GET http://localhost:5000/api/products/:id
```

**Example:**
```
GET http://localhost:5000/api/products/507f1f77bcf86cd799439011
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "iPhone 14 Pro",
    "price": 999,
    "category": "Electronics",
    "stockQuantity": 50,
    "description": "Latest Apple iPhone with A16 Bionic chip",
    "imageUrl": "https://example.com/iphone14.jpg",
    "brand": "Apple",
    "discount": 5,
    "createdAt": "2024-03-26T10:30:00.000Z",
    "updatedAt": "2024-03-26T10:30:00.000Z"
  }
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## 🔐 ADMIN ENDPOINTS (Authentication Required)

> **Required Headers:**
> ```
> Authorization: Bearer YOUR_ADMIN_TOKEN
> Content-Type: application/json
> ```

### 3. Add Product

**Endpoint:**
```
POST http://localhost:5000/api/products
```

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "iPhone 14 Pro",
  "price": 999,
  "category": "Electronics",
  "stockQuantity": 50,
  "description": "Latest Apple iPhone with A16 Bionic chip, 48MP camera",
  "imageUrl": "https://example.com/iphone14.jpg",
  "brand": "Apple",
  "discount": 5
}
```

**Required Fields:**
- `name` - Product name
- `price` - Product price (positive number)
- `category` - Product category
- `stockQuantity` - Stock quantity (0 or greater)
- `description` - Product description
- `brand` - Brand name

**Optional Fields:**
- `imageUrl` - Product image URL
- `discount` - Discount percentage (0-100)

**Response (201):**
```json
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "iPhone 14 Pro",
    "price": 999,
    "category": "Electronics",
    "stockQuantity": 50,
    "description": "Latest Apple iPhone with A16 Bionic chip, 48MP camera",
    "imageUrl": "https://example.com/iphone14.jpg",
    "brand": "Apple",
    "discount": 5,
    "createdAt": "2024-03-26T10:30:00.000Z",
    "updatedAt": "2024-03-26T10:30:00.000Z"
  }
}
```

**Error (400) - Duplicate Name:**
```json
{
  "success": false,
  "message": "Product with this name already exists"
}
```

---

### 4. Update Product

**Endpoint:**
```
PUT http://localhost:5000/api/products/:id
```

**Example:**
```
PUT http://localhost:5000/api/products/507f1f77bcf86cd799439011
```

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

**Request Body (Update any fields):**
```json
{
  "name": "iPhone 14 Pro Max",
  "price": 1099,
  "stockQuantity": 45,
  "discount": 8
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "iPhone 14 Pro Max",
    "price": 1099,
    "category": "Electronics",
    "stockQuantity": 45,
    "description": "Latest Apple iPhone with A16 Bionic chip, 48MP camera",
    "imageUrl": "https://example.com/iphone14.jpg",
    "brand": "Apple",
    "discount": 8,
    "createdAt": "2024-03-26T10:30:00.000Z",
    "updatedAt": "2024-03-26T12:00:00.000Z"
  }
}
```

---

### 5. Delete Product

**Endpoint:**
```
DELETE http://localhost:5000/api/products/:id
```

**Example:**
```
DELETE http://localhost:5000/api/products/507f1f77bcf86cd799439011
```

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "deletedProductId": "507f1f77bcf86cd799439011"
  }
}
```

---

## 🧪 cURL Testing Examples

### Get All Products
```bash
curl -X GET "http://localhost:5000/api/products"
```

### Search Products
```bash
curl -X GET "http://localhost:5000/api/products?q=iPhone&category=Electronics"
```

### Get Product by ID
```bash
curl -X GET "http://localhost:5000/api/products/507f1f77bcf86cd799439011"
```

### Add Product (Admin Only)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 14 Pro",
    "price": 999,
    "category": "Electronics",
    "stockQuantity": 50,
    "description": "Latest Apple iPhone",
    "imageUrl": "https://example.com/iphone14.jpg",
    "brand": "Apple",
    "discount": 5
  }'
```

### Update Product (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/products/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1099,
    "discount": 8
  }'
```

### Delete Product (Admin Only)
```bash
curl -X DELETE http://localhost:5000/api/products/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

---

## ⚠️ Error Responses

### 400 Bad Request - Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Price must be a positive number",
      "param": "price"
    }
  ]
}
```

### 400 Bad Request - Invalid ID
```json
{
  "success": false,
  "message": "Invalid product ID"
}
```

### 401 Unauthorized - No Token
```json
{
  "success": false,
  "message": "Unauthorized: token missing"
}
```

### 403 Forbidden - Not Admin
```json
{
  "success": false,
  "message": "Forbidden: Only admins can access this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## 📁 Code Structure

```
src/
├── controllers/
│   ├── productController.js (All product endpoints)
│   └── adminController.js (Admin dashboard only)
├── routes/
│   ├── productRoutes.js (All product routes)
│   └── adminRoutes.js (Admin dashboard route)
└── models/
    └── Product.js (Product schema)
```

---

## 🔐 Authentication Steps

1. **Login First:**
```bash
POST http://localhost:5000/api/auth/login
Body: {"email": "admin@example.com", "password": "password"}
```

2. **Copy the token from response**

3. **Use token in Authorization header:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📋 Validation Rules

- **name**: Required, must be unique
- **price**: Required, must be positive number
- **category**: Required, non-empty string
- **stockQuantity**: Required, must be 0 or greater
- **description**: Required, non-empty string
- **brand**: Required, non-empty string
- **imageUrl**: Optional, must be valid URL if provided
- **discount**: Optional, must be 0-100

---

## ✨ Features

✅ Public product browsing (no auth required)  
✅ Search by name, category, or brand  
✅ Pagination support  
✅ Admin-only product management  
✅ Input validation  
✅ Duplicate product name prevention  
✅ Automatic timestamps  
✅ Proper error handling  

---

## 🎯 Quick Reference

| Use Case | Method | Endpoint | Auth |
|----------|--------|----------|------|
| Browse products | GET | `/api/products` | ❌ |
| Search products | GET | `/api/products?q=iPhone` | ❌ |
| Get product details | GET | `/api/products/:id` | ❌ |
| Add product | POST | `/api/products` | ✅ Admin |
| Update product | PUT | `/api/products/:id` | ✅ Admin |
| Delete product | DELETE | `/api/products/:id` | ✅ Admin |
