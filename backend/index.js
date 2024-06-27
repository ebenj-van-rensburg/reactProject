import app from './server.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

async function main() {
    dotenv.config();
    await connectDB();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}
main().catch(console.error); 