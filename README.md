🎟️ Ticket Forum
Ticket Forum is a full-stack web application that allows users to list and purchase event tickets at face value or below. Built as a single-page application with a focus on usability and secure transactions, it features admin capabilities, third-party integrations, and an AI-powered chatbot.

⚠️ Note: This is a demo/portfolio project. No real tickets are exchanged or sold.

🚀 Live Demo
🌐 http://3.148.106.111 — Deployed on AWS EC2

📸 Features Overview
🧾 Browse & List Tickets: Search, filter, and paginate through event tickets.

🧑‍💼 Admin Login & Auth: JWT-secured registration and login.
🎤 SeatGeek Integration: Pulls real-time event data via API.
💳 Mock Payments with PayPal: Simulates purchase workflow.
🗺️ Google Maps Integration: Displays event locations visually.
🤖 AI Chatbot: Powered by OpenAI’s ChatGPT for personalized support.
📱 Responsive UI: Built with React for clean, single-page interactivity.

🛠️ Tech Stack
🔷 Frontend
React.js — SPA structure
React Router — Navigation
Axios — HTTP requests
CSS + Custom UI — Styled layout
React Slick — Carousel/slideshow

🔶 Backend
Node.js + Express — RESTful API
MongoDB (Mongoose) — NoSQL database
JWT + Bcrypt — Authentication & password hashing
dotenv — Environment management

🌐 Integrations
SeatGeek API — Real-time event listings
PayPal API — Payment processing simulation
Google Maps API — Event map visualization
OpenAI API — ChatGPT integration for real-time help

🚀 Deployment & DevOps
AWS EC2 — App hosting
MongoDB Atlas — Cloud DB
Nginx — Reverse proxy for production React app
PM2 — Node process manager

💡 How It Works
Users can:
Register/login securely
Browse and filter events
Post and manage their own ticket listings

Admins can:
Access all listings
Moderate users or content if expanded

Chatbot Support:
OpenAI ChatGPT integration responds to user questions in real-time

Event Enhancements:
Google Maps displays event locations
SeatGeek provides real-world event data