# 🚚 LogiRate - Capstone Project

_LogiRate is an interstate transport fare comparison platform designed for passengers to compare prices and services offered by different interstate transport companies._

---

## 🌟 Features

- 🧾 Compare logistics vendors by price 
- 🗺️ Filter by city (Lagos or Abuja)  
- ⭐ Vendor ratings and user reviews  
- 📞 Contact vendors directly from the app  
- 🔍 Advanced filters 

---

## 🛠️ Tech Stack

**Backend:**
- Node.js  
- Express.js  
- MongoDB (with Mongoose)  
- RESTful API

**Dev Tools:**
- Postman (for API testing)  
- Git & GitHub  
- MongoDB Compass / Atlas

---

## 📂 Project Structure
logirate/  
├── controllers/  
├── models/  
├── routes/  
├── middlewares/  
├── config/  
├── utils/  
├── app.js  
└── server.js  

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm installed  
- MongoDB running locally  
- Postman (for API testing)

### Installation

```bash
git clone https://github.com/leinadiyanu/logirate.git
cd logirate
npm install
```

### Running the App / Starting the server

```
npm run dev
The server runs on http://localhost:5000 by default.
```

### Environment Variables
Create a .env file in the root with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 📡 API Endpoints
|Method	| Route | Description |
|--- | --- | --- |
| GET |	/api/vendors | Get all vendors
| GET	| /api/vendors/:id | Get vendor by ID
| POST | /api/vendors	| Add new vendor
| PUT	| /api/vendors/:id	| Update vendor
| DELETE | /api/vendors/:id	| Delete vendor


## 📍Team
- Daniel AKANDE
- Adebimpe ADENIYI
- Deborah AJULO
