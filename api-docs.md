# 📚 API Documentation — Logirate Backend

Base URL (example):  
https://api.logirate.com/api

---

## 🔐 Authentication Endpoints

### POST /api/auth/register

*Register a new user*

*Request Body*
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Success Response

{
  "message": "Registration successful",
  "user": {
    "id": "userId123",
    "email": "john@example.com"
  }
}



POST /api/auth/login

Login an existing user

Request Body

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Success Response

{
  "token": "jwt_token_here",
  "user": {
    "id": "userId123",
    "email": "john@example.com",
    "name": "John Doe"
  }
}


---

GET /api/auth/profile

Get authenticated user's profile

Headers

Authorization: Bearer <JWT_TOKEN>

Success Response

{
  "_id": "userId123",
  "email": "john@example.com",
  "name": "John Doe"
}


---

🏪 Vendor Endpoints

POST /api/vendors

Create a new vendor

Headers

Authorization: Bearer <JWT_TOKEN>

Request Body

{
  "name": "Vendor Name",
  "category": "Tech",
  "location": "New York",
  "description": "Leading tech vendor"
}

Success Response

{
  "_id": "vendorId123",
  "name": "Vendor Name",
  "category": "Tech"
}


---

GET /api/vendors

Get all vendors

Success Response

[
  {
    "_id": "vendorId123",
    "name": "Vendor Name",
    "category": "Tech",
    "createdBy": {
      "email": "john@example.com",
      "name": "John Doe"
    }
  }
]


---

GET /api/vendors/:id

Get vendor by ID

Success Response

{
  "_id": "vendorId123",
  "name": "Vendor Name",
  "category": "Tech",
  "createdBy": {
    "email": "john@example.com",
    "name": "John Doe"
  }
}


---

PUT /api/vendors/:id

Update vendor by ID

Headers

Authorization: Bearer <JWT_TOKEN>

Request Body

{
  "name": "Updated Vendor Name"
}

Success Response

{
  "_id": "vendorId123",
  "name": "Updated Vendor Name"
}


---

DELETE /api/vendors/:id

Delete vendor by ID

Headers

Authorization: Bearer <JWT_TOKEN>

Success Response

{
  "message": "Vendor deleted"
}


---

⭐ Review Endpoints

POST /api/reviews

Create a review for a vendor

Headers

Authorization: Bearer <JWT_TOKEN>

Request Body

{
  "vendorId": "vendorId123",
  "rating": 5,
  "comment": "Excellent experience!"
}

Success Response

{
  "_id": "reviewId123",
  "vendor": "vendorId123",
  "user": "userId123",
  "rating": 5,
  "comment": "Excellent experience!"
}


---

GET /api/reviews/vendor/:vendorId

Get all reviews for a vendor

Success Response

[
  {
    "_id": "reviewId123",
    "rating": 5,
    "comment": "Excellent experience!",
    "user": {
      "email": "john@example.com",
      "name": "John Doe"
    }
  }
]


---

DELETE /api/reviews/:id

Delete a review (only by owner)

Headers

Authorization: Bearer <JWT_TOKEN>

Success Response

{
  "message": "Review deleted"
}


---

🛡 Auth & Error Handling

Authentication:

Use a Bearer token in the header:

Authorization: Bearer <JWT_TOKEN>

Error Format

{
  "message": "Error description here"
}


---

📘 Status Codes

Code	Meaning

200	OK
201	Created
400	Bad Request
401	Unauthorized
403	Forbidden
404	Not Found
409	Conflict
500	Internal Server Error


---

