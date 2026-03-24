require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Connect Database
connectDB();

// ================= CORS CONFIG (FINAL FIX) =================
const allowedOrigins = [
    "http://localhost:5173",
    "https://taskflow-gamma-ochre.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps / Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests
app.options("*", cors());

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= ROUTES =================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Health check route
app.get('/', (req, res) => res.send('API Running 🚀'));

// ================= ERROR HANDLER =================
app.use(errorHandler);

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
