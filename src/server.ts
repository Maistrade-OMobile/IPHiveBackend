import app from "./app";
import connectDB from "./config/db";
import { PORT } from "./config/index";
import "dotenv/config";


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
