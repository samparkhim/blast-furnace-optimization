const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();

// Middleware
app.use(cors({
    origin: "https://blast-furnace-optimization.vercel.app"
}));

app.use(bodyParser.json());

// Health check route
app.get("/", (req, res) => {
    res.send("Blast Furnace Backend Running");
});

// Prediction route
app.post("/predict", (req, res) => {

    const inputData = JSON.stringify(req.body);

    const pythonProcess = spawn("python", [
        "./model/predict_api.py",
        inputData
    ]);

    let result = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        errorOutput += data.toString();
    });

    pythonProcess.on("close", () => {
        try {
            if (!result) {
                return res.status(500).json({
                    error: "No output from Python",
                    stderr: errorOutput
                });
            }

            const jsonResult = JSON.parse(result);
            res.json(jsonResult);

        } catch (err) {
            res.status(500).json({
                error: "Failed to parse Python output",
                raw_output: result,
                stderr: errorOutput
            });
        }
    });
});

// Optimization route
app.post("/optimize", (req, res) => {

    const inputData = JSON.stringify(req.body);

    const pythonProcess = spawn("python", [
        "./model/optimize_api.py",
        inputData
    ]);

    let result = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        errorOutput += data.toString();
    });

    pythonProcess.on("close", () => {
        try {
            if (!result) {
                return res.status(500).json({
                    error: "No output from Python",
                    stderr: errorOutput
                });
            }

            const jsonResult = JSON.parse(result);
            res.json(jsonResult);

        } catch (err) {
            res.status(500).json({
                error: "Failed to parse Python output",
                raw_output: result,
                stderr: errorOutput
            });
        }
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});