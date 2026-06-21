# HomyGo - Your Personal Travel Companion

<div align="center">

<table>
  <tr>
    <td>
      <img src="https://homygo.apps24.tech/homygo_dark.png" alt="HomyGo Logo" width="150"/>
    </td>
    <td>
      <em>Discover. Connect. Experience.</em>
    </td>
  </tr>
</table>

**An innovative platform connecting travelers with authentic homestay experiences and cultural immersion.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Resend](https://img.shields.io/badge/Email-Resend-000000?logo=resend&logoColor=white)](https://resend.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📋 Overview

**HomyGo** is a full-stack web application that revolutionizes travel planning and homestay booking. By connecting travelers with local hosts, HomyGo enables authentic cultural experiences, AI-powered itinerary planning, real-time communication, and personalized travel recommendations. Built with modern web technologies, the platform provides a seamless and immersive travel discovery experience.

---

## 🌟 Features

### Homestay Management

- **Browse Homestays** - Explore verified accommodations with detailed listings and images
- **Advanced Search** - Filter by location, price, amenities, and ratings
- **Wish List** - Save favorite homestays for future reference
- **Ratings & Reviews** - Community-driven feedback system

### Booking & Reservations

- **Secure Booking System** - Easy reservation process with confirmation
- **Booking History** - Track all past and upcoming bookings
- **Status Tracking** - Real-time updates on booking status
- **Flexible Cancellation** - Customer-friendly cancellation policies

### Cultural Experiences

- **Cultural Feed** - Discover local experiences and cultural activities
- **Interactive Feed** - Like, comment, and share cultural insights
- **Authentic Encounters** - Connect with local communities

### AI-Powered Features

- **Smart Chatbot** - 24/7 travel assistance powered by Gemini AI
- **Language Translation** - Real-time translator for 100+ languages
- **Itinerary Planning** - AI-generated personalized travel plans
- **Route Optimization** - Smart geolocation-based recommendations

### Communication & Safety

- **Real-time Chat** - Direct messaging between travelers and hosts
- **SOS Feature** - Emergency assistance with quick alerts
- **User Verification** - Secure authentication with Google OAuth
- **Notifications** - Stay updated with real-time alerts

### Sub-Admin (Host) Management Panel

-   **Host Dashboard** - Dedicated dashboard for hosts to manage their homestay business
-   **Homestay CRUD Operations** - Add, edit, update, and delete homestay listings with ease
-   **Booking Management** - Monitor reservations, guest details, and booking status
-   **Content Moderation** - Manage cultural feed posts, reviews, and platform content
-   **Host Analytics** - Track occupancy rates, earnings, and booking performance
    
### Administration Panel

-   **System Dashboard** - Centralized overview of users, bookings, homestays, and platform activity 
-   **Homestay Verification** - Review, approve, or reject homestay listings before publication  
-   **User Management** - Monitor travelers and hosts, manage accounts, and handle reports  
-   **Platform Settings** - Configure system preferences, policies, and application settings
-   **Reports & Insights** - Access platform-wide analytics, booking trends, and revenue statistics

### User Experience

- **Google Authentication** - Quick and secure sign-up/login
- **Responsive Design** - Optimized for mobile and desktop
- **User Profiles** - Customizable profiles with travel preferences
- **Theme Toggle** - Dark and light mode support
- **Geolocation Services** - Location-based homestay discovery

---

## 🎯 Use Cases

- **Solo Travelers** - Find authentic experiences and connect with local hosts
- **Cultural Enthusiasts** - Discover and participate in local cultural activities
- **Travel Planning** - Get AI-powered itinerary suggestions
- **Group Travel** - Coordinate bookings and experiences for teams
- **Budget Travelers** - Find affordable homestays and local experiences
- **Digital Nomads** - Extended stays with community connections

---

## 🛠 Tech Stack

### Frontend

| Technology       | Purpose                                      |
| ---------------- | -------------------------------------------- |
| **React 19**     | Modern UI library with hooks and composition |
| **Vite**         | Lightning-fast build tool and dev server     |
| **Tailwind CSS** | Utility-first CSS for responsive design      |
| **Axios**        | HTTP client for API communication            |
| **Context API**  | State management and data sharing            |
| **React Router** | Client-side routing and navigation           |
| **Gemini API**   | AI integration for chatbot & translation     |

### Backend

| Technology           | Purpose                                |
| -------------------- | -------------------------------------- |
| **Node.js**          | JavaScript runtime for server          |
| **Express.js**       | Web application framework              |
| **MySQL**            | SQL database for data persistence      |
| **Nodemailer**       | Resend email service for notifications |
| **Gemini SDK**       | AI model integration                   |
| **Geolocation APIs** | Location-based services                |
| **Docker**           | User for containerized services        |

---

## 🏗 Architecture

```
┌────────────────────────────────────────────────────────────┐
│                      Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Components  │  │  Pages       │  │  Services    │      │
│  │  (UI Layer)  │  │  (Routes)    │  │  (API/AI)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│        │                  │                   │            │
│        └──────────────────┼───────────────────┘            │
│                           │ HTTP/WebSocket                 │
└────────────────────────────────────────────────────────────┘
                            │
┌────────────────────────────────────────────────────────────┐
│                     Backend (Node.js)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Routes     │  │ Controllers  │  │  Middleware  │      │
│  │  (REST API)  │  │  (Logic)     │  │  (Auth/CORS) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│        │                  │                   │            │
│        └──────────────────┼───────────────────┘            │
│                           │                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Tables (User, Homestay, Booking, CulturalFeed)      │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   MySQL      │  │  Gemini AI   │  │   Mailer     │      │
│  │   Database   │  │  (Chat/Trans)│  │  (Emails)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm**
- **MySQL** (local or Docker instance - MySQL 12)
- **Gemini API Key** (from Google AI Platform)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/himadri75/HomyGo.git
   cd HomyGo
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory:

   ```bash
   # Backend/.env
   RESEND_API_KEY=your_resend_mail_sender_api_key
   JWT_SECRET=a_secret_text
   NODE_ENV=development
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_username
   DB_PASSWORD=your_Mysql_password
   DB_NAME=your_database_name
   DB_PORT=databse_port
   ```

3. **Setup Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file in the `frontend` directory:

   ```bash
   # Frontend/.env
   VITE_SERVER_URL=http://localhost:7777
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

### Running the Application

1. **Start Docker MySQL** (if running locally) OR **Add Cloud Database**

2. **Start the Backend Server**

   ```bash
   cd backend
   npm start
   ```

   Server will run on `http://localhost:7777`

3. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will open on `http://localhost:5173`

---

## 📁 Project Structure

```
HomyGo/
├── backend/
│   ├── config/              # Configuration files (DB, Mail, MongoDB)
│   ├── controllers/         # Route handlers (Auth, Booking, Feed, etc.)
│   ├── middleware/          # Authentication and CORS middleware
│   ├── routes/              # API route definitions
│   ├── service/             # Business logic and services
│   ├── index.js             # Server entry point
│   └── package.json         # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable React components
    │   ├── pages/           # Page components (routes)
    │   ├── services/        # API calls and AI services (Gemini)
    │   ├── config/          # Axios and other configurations
    │   ├── context/         # React Context for state management
    │   ├── assets/          # Images, static data
    │   ├── App.jsx          # Main app component
    │   └── main.jsx         # Entry point
    ├── public/              # Static files
    ├── package.json         # Frontend dependencies
    ├── vite.config.js       # Vite configuration
    └── tailwind.config.js   # Tailwind CSS configuration
```

---

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Homestays

- `GET /api/homestay` - Get all homestays
- `GET /api/homestay/:id` - Get single homestay
- `POST /api/homestay` - Create new homestay (Host only)
- `PUT /api/homestay/:id` - Update homestay
- `DELETE /api/homestay/:id` - Delete homestay

### Bookings

- `GET /api/booking` - Get user bookings
- `POST /api/booking` - Create new booking
- `PUT /api/booking/:id` - Update booking status
- `DELETE /api/booking/:id` - Cancel booking

### Cultural Feed

- `GET /api/feed` - Get all cultural posts
- `POST /api/feed` - Create new post
- `PUT /api/feed/:id` - Update post
- `DELETE /api/feed/:id` - Delete post

### AI Features

- `POST /api/ai/chat` - Chatbot assistance
- `POST /api/ai/translate` - Language translation
- `POST /api/ai/itinerary` - Generate travel itinerary

---

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for password encryption
- **CORS Protection** - Cross-origin request handling
- **Input Validation** - Server-side request validation
- **MySQL Injection Prevention** - Query sanitization
- **Environment Variables** - Sensitive data protection

---

## 🚀 Future Enhancements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Video call feature between travelers and hosts
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Recommendation engine
- [ ] Virtual tours for homestays
- [ ] Travel insurance integration

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Team Profile

Our talented team of developers and designers working together to build HomyGo:

<table>
  <tr>
    <td align="center" width="20%">
      <h3>Himadri Karan</h3>
      <em>Lead Backend Developer</em><br/>
      <a href="https://www.linkedin.com/in/himadri516/">LinkedIn</a> | 
      <a href="https://github.com/himadri75">GitHub</a>
    </td>
    <td align="center" width="20%">
      <h3>Sourik Das</h3>
      <em>Frontend Lead</em><br/>
      <a href="https://www.linkedin.com/in/sourik-das/">LinkedIn</a> | 
      <a href="https://github.com/sd-coder07">GitHub</a>
    </td>
    <td align="center" width="20%">
      <h3>Arka Roy</h3>
      <em>AI Integration Developer</em><br/>
      <a href="https://www.linkedin.com/in/arka-roy-76b1561b2/">LinkedIn</a> | 
      <a href="https://github.com/arka-coder">GitHub</a>
    </td>
    <td align="center" width="20%">
      <h3>Anish Kar</h3>
      <em>Data Engineer</em><br/>
      <a href="https://www.linkedin.com/in/anish-kar-b6764b259/">LinkedIn</a> | 
      <a href="https://github.com/AnishCoding2004">GitHub</a>
    </td>
    <td align="center" width="20%">
      <h3>Arpan Santra</h3>
      <em>Client Communication Engineer</em><br/>
      <a href="https://www.linkedin.com/in/arpansantra/">LinkedIn</a> | 
      <a href="https://github.com/itsarpansantra">GitHub</a>
    </td>
  </tr>
</table>

---

<div align="center">

**Made with ❤️ and lots of ☕**

If you found this project helpful, please give it a ⭐️!

</div>
