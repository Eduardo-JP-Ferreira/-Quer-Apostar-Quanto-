import express from "express";
import cors from "cors";

const app = express();
app
    .use(cors())
    .use(express.json())
    .get('/health', (_req, res) => res.send('OK!!'))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})