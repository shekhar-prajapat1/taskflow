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
    "https://taskflow-uu1u.vercel.app"   // ✅ UPDATE THIS
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("CORS not allowed"));
        }
    },
    credentials: true
}));

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= ROUTES =================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Health check
app.get('/', (req, res) => {
    res.send('API Running 🚀');
});

// ================= ERROR HANDLER =================
app.use(errorHandler);

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
