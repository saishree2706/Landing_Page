// server/server.js or index.js
import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/email.js'; // ✅ Make sure path is correct
import mongoose from 'mongoose'; // ✅ Import mongoose for MongoDB connection
const app = express();
const PORT = process.env.PORT ||5000;
import userRoutes from './routes/userRoute.js'; // ✅ Import user routes
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;


// ✅ Connect to local MongoDB
mongoose.connect(`${MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors({
  origin: [""],
        methods: ["POST", "GET"],
        credentials: true

}));
app.use(express.json());

app.use('/send-email', emailRoutes); // ✅ This registers your POST /send-email routes')
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
