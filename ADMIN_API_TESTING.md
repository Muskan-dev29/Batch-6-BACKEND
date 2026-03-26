# Admin Product Management API - Complete Guide

## ⚠️ IMPORTANT: Authentication Required
All admin APIs require:
- **Admin Token** (Bearer Token from login)
- **Admin Role** (Only users with "admin" role can access)

---

## 🔐 Step 1: Get Admin Token (Login)

### Endpoint
```
POST http://localhost:5000/api/auth/login
```

### Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "email": "admin@example.com",
  "password": "your_admin_password"
}
```

### Expected Response (200)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "USER_ID",
      "name": "Admin",
      "email": "admin@example.com",
      "username": "admin",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Save the token from the response** - you'll use it for all admin APIs.

---

## 📋 Step 2: Admin Dashboard

### Endpoint
```
GET http://localhost:5000/api/admin/dashboard
```

### Headers
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

### Expected Response (200)
```json
{
  "success": true,
  "message": "Admin dashboard stats fetched",
  "data": {
    "totalProducts": 5,
    "navigation": ["Add Product", "View Products"]
  }
}
```

---

## ✨ Step 3: Add Product (CREATE)

### Endpoint
```
POST http://localhost:5000/api/admin/products
```

### Headers
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

### Request Body
```json
{
  "name": "iPhone 14 Pro",
  "price": 999,
  "category": "Electronics",
  "stockQuantity": 50,
  "description": "Latest Apple iPhone with A16 Bionic chip, 48MP camera, and Dynamic Island",
  "imageUrl": "https://example.com/iphone14.jpg",
  "brand": "Apple",
  "discount": 5
}
```

### Required Fields
- `name` - Product name (String)
- `price` - Product price (Number)
- `category` - Product category (String)
- `stockQuantity` - Stock quantity (Number)
- `description` - Product description (String)
- `brand` - Brand name (String)

### Optional Fields
- `imageUrl` - Image URL (String)
- `discount` - Discount percentage 0-100 (Number)

### Expected Response (201)
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
    "description": "Latest Apple iPhone with A16 Bionic chip, 48MP camera, and Dynamic Island",
    "imageUrl": "https://example.com/iphone14.jpg",
    "brand": "Apple",
    "discount": 5,
    "createdAt": "2024-03-26T10:30:00.000Z",
    "updatedAt": "2024-03-26T10:30:00.000Z"
  }
}
```

---

## 📦 Step 4: Get All Products (READ)

### Endpoint
```
GET http://localhost:5000/api/admin/products
GET http://localhost:5000/api/admin/products?page=1&limit=10
GET http://localhost:5000/api/admin/products?search=iPhone
GET http://localhost:5000/api/admin/products?page=1&limit=5&search=Electronics
```

### Headers
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

### Query Parameters
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by name, category, or brand (optional)

### Expected Response (200)
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": {
    "products": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "iPhone 14 Pro",
        "price": 999,
        "category": "Electronics",
        "stockQuantity": 50,
        "description": "Latest Apple iPhone...",
        "imageUrl": "https://example.com/iphone14.jpg",
        "brand": "Apple",
        "discount": 5,
        "createdAt": "2024-03-26T10:30:00.000Z",
        "updatedAt": "2024-03-26T10:30:00.000Z"
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Samsung Galaxy S24",
        "price": 899,
        "category": "Electronics",
        "stockQuantity": 30,
        "description": "Samsung's latest flagship...",
        "imageUrl": "https://example.com/galaxy.jpg",
        "brand": "Samsung",
        "discount": 10,
        "createdAt": "2024-03-26T11:00:00.000Z",
        "updatedAt": "2024-03-26T11:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 2,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  }
}
```

---

## 🔍 Step 5: Get Product by ID (READ)

### Endpoint
```
GET http://localhost:5000/api/admin/products/507f1f77bcf86cd799439011
```

### Headers
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

### Expected Response (200)
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
    "description": "Latest Apple iPhone with A16 Bionic chip, 48MP camera, and Dynamic Island",
    "imageUrl": "https://example.com/iphone14.jpg",
    "brand": "Apple",
    "discount": 5,
    "createdAt": "2024-03-26T10:30:00.000Z",
    "updatedAt": "2024-03-26T10:30:00.000Z"
  }
}
```

---

## ✏️ Step 6: Update Product (UPDATE)

### Endpoint
```
PUT http://localhost:5000/api/admin/products/507f1f77bcf86cd799439011
```

### Headers
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

### Request Body (Update any or all fields)
```json
{
  "name": "iPhone 14 Pro Max",
  "price": 1099,
  "category": "Electronics",
  "stockQuantity": 45,
  "description": "Updated description",
  "imageUrl": "https://example.com/iphone14-promax.jpg",
  "brand": "Apple",
  "discount": 8
}
```

### Expected Response (200)
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
    "description": "Updated description",
    "imageUrl": "https://example.com/iphone14-promax.jpg",
    "brand": "Apple",
    "discount": 8,
    "createdAt": "2024-03-26T10:30:00.000Z",
    "updatedAt": "2024-03-26T12:00:00.000Z"
  }
}
```

---

## 🗑️ Step 7: Delete Product (DELETE)

### Endpoint
```
DELETE http://localhost:5000/api/admin/products/507f1f77bcf86cd799439011
```

### Headers
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

### Expected Response (200)
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

## 🧪 Complete Test Sequence (Copy & Paste)

### Using CURL Commands

#### 1. Login to get token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your_admin_password"
  }'
```

#### 2. Get Dashboard (replace TOKEN with your token)
```bash
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json"
```

#### 3. Add Product
```bash
curl -X POST http://localhost:5000/api/admin/products \
  -H "Authorization: Bearer TOKEN" \
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

#### 4. Get All Products
```bash
curl -X GET "http://localhost:5000/api/admin/products?page=1&limit=10" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json"
```

#### 5. Get Product by ID (replace PRODUCT_ID)
```bash
curl -X GET http://localhost:5000/api/admin/products/PRODUCT_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json"
```

#### 6. Update Product (replace PRODUCT_ID)
```bash
curl -X PUT http://localhost:5000/api/admin/products/PRODUCT_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1099,
    "stockQuantity": 45,
    "discount": 8
  }'
```

#### 7. Delete Product (replace PRODUCT_ID)
```bash
curl -X DELETE http://localhost:5000/api/admin/products/PRODUCT_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json"
```

---

## ⚠️ Error Responses

### 401 Unauthorized (No Token)
```json
{
  "success": false,
  "message": "Unauthorized: token missing"
}
```

### 401 Unauthorized (Invalid Token)
```json
{
  "success": false,
  "message": "Unauthorized: invalid token"
}
```

### 403 Forbidden (Not Admin)
```json
{
  "success": false,
  "message": "Forbidden: Only admins can access this resource"
}
```

### 400 Bad Request (Validation)
```json
{
  "success": false,
  "message": "All required fields must be provided"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 400 Duplicate Product Name
```json
{
  "success": false,
  "message": "Product with this name already exists"
}
```

---

## 📱 Using Postman

1. **Create New Request**
   - Select HTTP method (POST, GET, PUT, DELETE)
   - Enter URL: `http://localhost:5000/api/admin/products`

2. **Add Authorization Header**
   - Go to Headers tab
   - Add: `Authorization: Bearer YOUR_TOKEN`
   - Add: `Content-Type: application/json`

3. **Add Body (for POST/PUT)**
   - Select "raw" format
   - Select "JSON" from dropdown
   - Paste request body

4. **Send Request** - Click "Send"

---

## 🔗 API Summary Table

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---|
| GET | `/api/admin/dashboard` | Get admin dashboard stats | ✅ Admin Token |
| POST | `/api/admin/products` | Add a new product | ✅ Admin Token |
| GET | `/api/admin/products` | Get all products with pagination | ✅ Admin Token |
| GET | `/api/admin/products/:id` | Get product by ID | ✅ Admin Token |
| PUT | `/api/admin/products/:id` | Update product details | ✅ Admin Token |
| DELETE | `/api/admin/products/:id` | Delete product | ✅ Admin Token |

---

## 🎯 Testing Checklist

- [ ] Login and get admin token
- [ ] Verify token works with dashboard endpoint
- [ ] Add product with all required fields
- [ ] Get all products with pagination
- [ ] Search products with query parameter
- [ ] Get specific product by ID
- [ ] Update product details
- [ ] Delete product
- [ ] Test without token (should fail with 401)
- [ ] Test with non-admin user (should fail with 403)
- [ ] Test with invalid product ID (should fail with 400)
- [ ] Test duplicate product name (should fail with 400)

---

## 💡 Notes

- **All timestamps** are in ISO 8601 format
- **Discount** must be between 0-100
- **Price and Stock** must be positive numbers
- **Product name** must be unique
- All text fields are automatically trimmed
- Pagination default: page 1, limit 10 items
