import dotenv from "dotenv";
import app from "./app";
import { sequelize } from "./models";

dotenv.config();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Try to connect to database (optional for demo mode)
    try {
      await sequelize.authenticate();
      console.log("Database connection established successfully");

      // Sync database models (in development)
      if (process.env.NODE_ENV === "development") {
        await sequelize.sync({ alter: true });
        console.log("Database synchronized");
      }
    } catch (dbError) {
      console.log(
        "Database not available, running in demo mode:",
        (dbError as Error).message,
      );
    }

    app.listen(PORT, () => {
      console.log(
        `🚀 FIBS College Management System API running on port ${PORT}`,
      );
      console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(
        `🔧 Demo Mode: Database ${sequelize ? "Connected" : "Not Available"}`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
