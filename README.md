# E-Commerce Backend API (Node.js + Express + MongoDB)

This project provides backend APIs for:

- Authentication (Admin/User login, User signup, logout)
- Admin dashboard and product management (add/view/update/delete)
- User product browsing and search
- Favorite (like) products
- Cart management (add/update quantity/remove + total price)

## 1. Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and update values.

  For browser/frontend access, set:

```env
HOST=0.0.0.0
CORS_ORIGIN=http://localhost:5173
```

  You can add multiple origins separated by commas.

3. Start server:

```bash
npm run dev
```

## 2. Base URL

```text
http://localhost:5000/api
```

If calling API from another device, do not use `localhost` from that device.
Use your machine IP instead, for example:

```text
http://192.168.1.20:5000/api
```

## 3. Auth APIs

### User Signup

- `POST /auth/signup`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "john",
  "password": "123456",
  "confirmPassword": "123456"
}
```

### Login (Admin or User)

- `POST /auth/login`

```json
{
  "identifier": "john@example.com",
  "password": "123456"
}
```

Response includes:

- `token`
- `user.role`
- `redirectTo` (`/admin/dashboard` or `/home`)

### Logout

- `POST /auth/logout`

## 4. Admin APIs

Requires `Authorization: Bearer <token>` with admin role.

### Dashboard

- `GET /admin/dashboard`

### Add Product

- `POST /products`

```json
{
  "name": "iPhone 15",
  "price": 799,
  "category": "Mobiles",
  "stockQuantity": 10,
  "description": "Latest model",
  "imageUrl": "https://example.com/iphone.jpg",
  "brand": "Apple",
  "discount": 5
}
```

### View Products

- `GET /products`
- Optional query params:
  - `q` for product name search
  - `category` for filter

### Update Product

- `PUT /products/:id`

### Delete Product

- `DELETE /products/:id`

## 5. User APIs

### Home + Search + Filters

- `GET /products?q=phone&category=Mobiles`

### Product Detail

- `GET /products/:id`

### Favorites (Like)

Requires user token.

- `GET /favorites` -> list liked products
- `POST /favorites` body: `{ "productId": "..." }`
- `DELETE /favorites/:productId`

### Cart

Requires user token.

- `GET /cart`
- `POST /cart` body: `{ "productId": "...", "quantity": 1 }`
- `PATCH /cart/:productId` body options:
  - `{ "action": "increment" }`
  - `{ "action": "decrement" }`
  - `{ "quantity": 3 }`
- `DELETE /cart/:productId`

Cart response includes:

- item quantities
- line totals
- overall `totalPrice`

## 6. Notes

- Validation is enabled with `express-validator`.
- Empty states return clear messages, such as `No products found`.
- Errors return consistent JSON with `success: false` and message.
- Default admin can be auto-created using `.env` values.
