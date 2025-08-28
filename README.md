# Chat-app

A full-stack real-time chat application built with React (frontend) and Node.js/Express (backend), featuring authentication, image upload, and live messaging using Socket.IO.

## Features

- User authentication (signup, login, logout)
- Real-time messaging with Socket.IO
- Image upload (Cloudinary integration)
- Responsive UI with loading indicators
- User profile and settings
- Modern React with Zustand for state management

## Tech Stack

- **Frontend:** React, Zustand, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, Socket.IO
- **Image Hosting:** Cloudinary

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB database
- Cloudinary account

### Setup (Development)

#### 1. Clone the repository

```bash
git clone https://github.com/kgpian-alok/interactive-chat-platform-with-real-time-status-and-media-sharing.git
```

#### 2. Backend Setup

- Copy `.env.sample` to `.env` in the `backend/` directory and fill in your values.
- Install dependencies and start the server:

```bash
cd backend
npm install
npm start
```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

- The frontend will run on `http://localhost:5173` by default.

## Deployment

### Environment Variables
- Ensure all environment variables in `backend/.env.sample` are set in your production environment.

### Build Frontend
```bash
cd frontend
npm run build
```
- This will create a `dist/` folder with production-ready static files.

### Serve Frontend with Backend (Optional)
- You can serve the frontend build from your backend Express server by adding this to your backend's `index.js`:

```js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
```
- Make sure to adjust paths if your structure is different.

### Deploy Backend
- Deploy your backend to a service like Render, Heroku, Vercel (Server), or your own VPS.
- Set all environment variables in your deployment dashboard.
- Make sure MongoDB and Cloudinary credentials are set.

### Deploy Frontend (if separate)
- You can also deploy the frontend separately to Vercel, Netlify, or any static hosting provider. Set the API base URL in your frontend to point to your backend's deployed URL.

## License

IIT
