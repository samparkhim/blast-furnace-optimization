# 🔥 Blast Furnace Optimization System

AI-powered industrial optimization dashboard for predicting blast furnace output, monitoring operational efficiency, and generating intelligent optimization recommendations.

### 🌐 Live Demo
Frontend: https://blast-furnace-optimization.vercel.app  
Backend API: https://blast-furnace-backend.onrender.com

---

## Overview

Blast furnace operations depend heavily on precise control of multiple parameters such as blast temperature, coke rate, PCI rate, airflow, gas pressure, and ore quality.

This project uses machine learning to simulate an industrial decision-support system that helps operators:

- Predict hot metal output (TPD)
- Estimate operational efficiency
- Generate optimized furnace settings
- Compare current vs optimized performance visually

---

## Dashboard Workflow

The dashboard follows a practical optimization pipeline:

**1. Enter Current Furnace Parameters**  
Input operational values like blast temperature, coke rate, airflow, moisture, ore grade, etc.

**2. Predict Current Performance**  
The ML model predicts:
- Hot metal output (TPD)
- Furnace efficiency (%)
- Dynamic furnace health status

**3. Run AI Optimization**  
The optimization engine evaluates improved operating conditions to maximize output.

**4. Review Recommendations**  
The dashboard shows:
- Current values
- AI-recommended values
- Expected optimization gain

**5. Apply & Compare**  
Apply AI recommendations instantly and compare:
- Output improvement
- Efficiency trend
- Furnace performance charts

---

## Features

✅ ML-based output prediction  
✅ ML-based efficiency prediction  
✅ AI optimization recommendation engine  
✅ Dynamic furnace health monitoring  
✅ Interactive industrial dashboard  
✅ Output comparison bar chart  
✅ Efficiency trend line chart  
✅ Apply / Restore recommendation workflow  
✅ Toast notifications & polished UI  
✅ Fully deployed full-stack application  

---

## Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Recharts
- Axios
- Lucide Icons

**Backend**
- Node.js
- Express.js
- Python

**Machine Learning**
- Scikit-learn
- Pandas
- Joblib

**Deployment**
- Vercel (Frontend)
- Render (Backend)

---

## Project Architecture

```bash
React Dashboard
     ↓
Node/Express API
     ↓
Python ML Prediction Engine
     ↓
Scikit-learn Models
```

---

## Screenshots

_Add dashboard screenshots here_

---

## Future Improvements

- FastAPI/Flask backend for better deployment efficiency
- PDF optimization report generation
- Live monitoring simulation
- Advanced optimization strategies

---

## Author

**Ashish Kumar**
