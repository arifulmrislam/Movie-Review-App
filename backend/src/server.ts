import app from "./app";
import { sequelize } from "./models";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
};

startServer();
