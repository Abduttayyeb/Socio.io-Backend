import server from "./server";
import { connectToDB } from "./database";
import "dotenv/config";

const PORT = process.env.PORT || 5002;
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
    console.error("DB_URI is not defined. Check the environment configuration.");
    process.exit(1);
}

const startServer = async () => {
    await connectToDB(DB_URI);

    server.listen(PORT, () => {
        console.log(`Socio Backend Running on PORT : ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Error starting the server:");
    console.error(error);
});
