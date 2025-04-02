import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import thoughtRoutes from './routes/thoughtRoutes';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network');
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
