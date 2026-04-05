# 🌾 AgriFlow - AI-Powered Farmer Income & Loan Management

![AgriFlow](https://img.shields.io/badge/AgriFlow-v1.0.0-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Web-blue)
![License](https://img.shields.io/badge/License-ISC-green)

## 📋 Overview

**AgriFlow** is an intelligent web platform designed to empower Indian farmers with AI-driven insights for financial planning, income prediction, and risk management. Built for the IIIT Gwalior Hackathon, this platform combines machine learning models with real-time weather alerts to help farmers optimize their EMI (Equated Monthly Installment) schedules and manage agricultural finances effectively.

---

## ✨ Key Features

### 🤖 ML-Powered Income Prediction
- **Model 1 (LightGBM)**: Predicts farmer income based on agricultural parameters
- **Model 2 (CatBoost)**: Risk classification for loan eligibility
- **Model 3**: Advanced financial forecasting

### 💰 Smart Loan EMI Planning
- Calculate optimal EMI schedules based on predicted income
- Dynamic EMI optimization to match income patterns
- Monthly income planning with multiple scenarios
- Risk-based interest rate calculations

### 🌦️ Real-Time Weather Alerts
- **Dynamic Weather-Based Alerts** - Live weather data from Open-Meteo API
- **Bilingual Support** - Hindi & English alerts for farmers
- **Severity Levels** - Color-coded warnings (Red/Orange/Green)
- **Auto-Refresh** - Updates every 30 seconds
- Alert types: Rain, High Temperature, High Humidity, Strong Wind, Frost, Drought

### 💬 AI Chat Assistant
- Real-time chat support for farmers
- Smart notifications panel
- Multi-user support with authentication

### 👥 User Management
- Secure authentication (Bcrypt encryption)
- User registration & login
- Session management
- Role-based access

---

## 🛠️ Tech Stack

### Backend
- **Node.js & Express.js** - Web server & API framework
- **Python & Flask** - ML model serving
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Machine Learning
- **LightGBM** - Gradient boosting for income prediction
- **CatBoost** - Categorical boosting for risk classification
- **scikit-learn** - ML utilities
- **pandas & NumPy** - Data processing

### Frontend
- **Express.js + EJS** - Server-side templating
- **CSS** - Responsive design
- **JavaScript** - Client-side interactivity

### External APIs
- **Open-Meteo API** - Real-time weather data (free, no API key needed)

---

## 📁 Project Structure

```
.
├── app.js                    # Main Express server
├── app.py                    # Flask Python API for ML models
├── models/                   # Database models (User, Notification)
├── routes/                   # API routes (auth, predictions)
├── services/                 # Business logic layers
│   ├── SmartAlertEngine.js   # Alert generation
│   └── WeatherAlertService.js # Weather data fetching
├── views/                    # EJS templates for UI
│   ├── agriflow-form.ejs
│   ├── agriflow-emi-plan.ejs
│   ├── agriflow-income.ejs
│   └── agriflow-weather.ejs
├── public/                   # Static files (CSS, JS)
│   ├── css/
│   └── js/
├── config/                   # Configuration files
├── models/                   # ML models (Python)
│   ├── model1.py             # Income prediction (LightGBM)
│   ├── model2.py             # Risk classification (CatBoost)
│   └── model3.py             # Advanced forecasting
├── package.json              # Node.js dependencies
└── requirements.txt          # Python dependencies
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14+)
- **Python** (v3.8+)
- **MongoDB** (local or Atlas connection)
- **npm** & **pip**

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/technofibre36/iiit_gwalior.git
cd iiit_gwalior
```

#### 2. Install Node.js Dependencies
```bash
npm install
```

#### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

Python packages included:
- Flask >= 2.3.0
- LightGBM >= 4.0.0
- CatBoost >= 1.2.0
- scikit-learn >= 1.3.0
- pandas >= 2.0.0
- numpy >= 1.24.0
- scipy >= 1.11.0

### Configuration

Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/agriflow
NODE_ENV=development
PYTHON_API_URL=http://localhost:5000
```

---

## ▶️ Running the Application

### Interactive Setup Guide

Follow these steps in order to run AgriFlow:

#### **Step 1: Verify Your Setup** ✅
```bash
# Check Node.js version
node --version     # Should be v14 or higher

# Check Python version
python --version   # Should be v3.8 or higher

# Check npm version
npm --version      # Should be v6 or higher
```

#### **Step 2: Install Dependencies**
```bash
# Install Node.js packages
npm install

# Install Python packages
pip install -r requirements.txt
```

### Option A: Quick Start (Development Mode)

Open **3 Terminal Windows** and run commands in this order:

**Terminal 1 - Train ML Models (Run Once)**
```bash
echo "Training Income Prediction Model..."
python model1.py
# Wait for completion - you should see:
# ✓ Model training completed
# ✓ RMSE and R² metrics displayed
# ✓ "Model saved as model1_lgb.pkl"
```

**Terminal 2 - Start Flask API** (Keep Running)
```bash
echo "Starting Python Flask API..."
python app.py
# You should see:
# * Running on http://localhost:5000
# WARNING: This is a development server. Do not use it in production deployment.
```

**Terminal 3 - Start Express Server** (Keep Running)
```bash
echo "Starting Node.js Express Server..."
npm start
# or use nodemon for auto-reload:
npm install -g nodemon
nodemon index.js

# You should see:
# Server is running on http://localhost:3000
# Connected to MongoDB
```

#### **Step 3: Access the Application**

Open your browser and navigate to:
- **Main Website:** http://localhost:3000
- **Login/Register:** http://localhost:3000/login
- **Income Prediction:** http://localhost:3000/income
- **EMI Planner:** http://localhost:3000/emi-plan
- **Weather Alerts:** http://localhost:3000/weather
- **Dashboard:** http://localhost:3000/dashboard (after login)

### Option B: Full Interactive Workflow

**First Time Setup:**
```bash
# 1. Clone and navigate
git clone https://github.com/technofibre36/iiit_gwalior.git
cd iiit_gwalior

# 2. Create .env file
cat > .env << EOF
PORT=3000
MONGODB_URI=mongodb://localhost:27017/agriflow
NODE_ENV=development
PYTHON_API_URL=http://localhost:5000
EOF

# 3. Install all dependencies
npm install
pip install -r requirements.txt

# 4. Start MongoDB (if local)
# Windows PowerShell:
mongod --dbpath "C:/data/db"

# macOS/Linux:
mongod --dbpath /usr/local/var/mongodb
```

**Starting the Application (After First Setup):**
```bash
# Terminal 1: Python API
python app.py

# Terminal 2: Node Server
npm start

# Terminal 3: Testing (optional)
npm run test
```

#### **Step 4: Test the System** 🧪

**Test 1: Check API Health**
```bash
curl http://localhost:3000/api/health
```

**Test 2: Make a Prediction**
```bash
curl -X POST http://localhost:5000/predict-income \
  -H "Content-Type: application/json" \
  -d '{"features": [100.5, 0.65, 2500, 0.05, 15000, 14000]}'
```

**Test 3: Get Weather Alerts**
```bash
curl "http://localhost:3000/api/alerts?lat=26.1989&lon=78.1828"
```

### Option C: Production Mode

```bash
# Set environment to production
export NODE_ENV=production

# Start with PM2 (process manager)
npm install -g pm2

# Start application
pm2 start app.js --name "agriflow"
pm2 start "python app.py" --name "python-api"

# View logs
pm2 logs

# Stop application
pm2 stop all
pm2 delete all
```

### Quick Command Reference

```bash
# Development with auto-reload
nodemon index.js

# Run specific test
node test_ml_integration.js

# Train all models
python model1.py && python model2.py

# Check if port is in use
netstat -an | findstr :3000    # Windows
lsof -i :3000                  # macOS/Linux

# Kill process on port
taskkill /PID <process_id>     # Windows
kill -9 <PID>                  # macOS/Linux

# Reset everything
rm -rf node_modules
rm -rf *.pkl
npm install
pip install -r requirements.txt
```

### Troubleshooting - Interactive Fixes

**Issue: "Cannot find module"**
```bash
# Solution: Reinstall dependencies
npm install --no-cache
pip install --force-reinstall -r requirements.txt
```

**Issue: "Port 3000 already in use"**
```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :3000
kill -9 <PID>
```

**Issue: "MongoDB connection refused"**
```bash
# Start MongoDB:
# Windows: mongod --dbpath "C:/data/db"
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Issue: "Python model not found"**
```bash
# Retrain models:
python model1.py
python model2.py
python model3.py
```

---

## 🔧 Train ML Models

---

## 🔧 Train ML Models

### Train Income Prediction Model
```bash
python model1.py
```
Output: `model1_lgb.pkl` - LightGBM model for income prediction

### Train Risk Classification Model
```bash
python model2.py
```
Output: `model2_catboost.pkl` - CatBoost model for risk assessment

### Train Chained Prediction Model
```bash
python chained_predict.py
```
Integrates multiple models for advanced predictions

---

## 📡 API Endpoints

### Income Prediction
```
POST /api/predict-income
Content-Type: application/json

{
  "features": [100.5, 0.65, 2500, 0.05, 15000, 14000]
}

Response:
{
  "predicted_income": 18500.75,
  "features_used": {...}
}
```

### EMI Planning
```
POST /api/emi-plan
Content-Type: application/json

{
  "loanAmount": 500000,
  "predictedIncome": 50000,
  "riskLevel": "low"
}

Response:
{
  "monthlyEMI": 12500,
  "schedule": [...],
  "recommendation": "..."
}
```

### Monthly Income Planning
```
POST /api/income-plan
Content-Type: application/json

{
  "baseIncome": 40000,
  "duration": 12
}

Response:
{
  "monthlyProjection": [...],
  "totalEstimatedIncome": 480000
}
```

### Weather Alerts
```
GET /api/alerts?lat=26.1989&lon=78.1828

Response:
{
  "alerts": [
    {
      "type": "RAIN",
      "severity": "MEDIUM",
      "message": "बारिश होने वाली है, सिंचाई रोकें"
    }
  ],
  "weather": {
    "temperature": 32,
    "humidity": 75,
    "windSpeed": 8
  }
}
```

### User Authentication
```
POST /register
Content-Type: application/json

{
  "username": "farmer_name",
  "email": "farmer@example.com",
  "password": "secure_password"
}

POST /login
{
  "email": "farmer@example.com",
  "password": "secure_password"
}
```

---

## 📊 Features in Detail

### 1. **Income Prediction** 💹
- Analyzes agricultural factors: crop type, land area, rainfall, soil quality
- Uses LightGBM for accurate income forecasting
- Provides confidence intervals with predictions

### 2. **EMI Optimization** 📈
- Calculates optimal monthly payments based on predicted income
- Risk-adjusted interest rates
- Flexible repayment schedules
- Multi-scenario planning

### 3. **Real-Time Weather Monitoring** 🌡️
- Live weather data integration
- Crop-specific advisory alerts
- Bilingual notifications (English & Hindi)
- Automatic alert generation based on thresholds

### 4. **Smart Loan Management** 💳
- Loan eligibility assessment
- Dynamic loan amount suggestions
- Risk profiling
- Document management

### 5. **Dashboard & Analytics** 📊
- Real-time financial dashboard
- Income trends visualization
- EMI payment schedules
- Weather impact analysis

---

## 🧪 Testing

### Test ML Integration
```bash
node test_ml_integration.js
```

### Test EMI Calculations
```bash
node test_duration_risk.js
```

### Quick API Test
```bash
node quick_test.js
```

---

## 📝 Documentation

Comprehensive documentation available in:
- `QUICK_START.md` - 5-minute setup guide
- `SETUP_INSTRUCTIONS.md` - Detailed installation steps
- `EMI_PLANNER_GUIDE.md` - EMI planning features
- `WEATHER_ALERTS_SYSTEM.md` - Weather alert configuration
- `TESTING_GUIDE.md` - Testing procedures
- `VERIFICATION_CHECKLIST.md` - Deployment checklist

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**AgriFlow Development Team**
- IIIT Gwalior Hackathon Project
- GitHub: [@technofibre36](https://github.com/technofibre36)

---

## 🐛 Troubleshooting

### Python Model Import Error
```bash
pip install --upgrade scikit-learn lightgbm
```

### MongoDB Connection Error
Ensure MongoDB is running and URI is correct in `.env` file

### Port Already in Use
```bash
lsof -i :3000  # Find process using port 3000
kill -9 <PID>  # Kill the process
```

### Weather API Not Responding
The application uses Open-Meteo (free API). Check internet connection.

---

## 📞 Support

For issues, questions, or suggestions:
- Open an GitHub Issue
- Contact: https://github.com/technofibre36/iiit_gwalior

---

## 🎯 Roadmap

- [ ] Mobile app integration
- [ ] Advanced ML model versioning
- [ ] Multilingual support expansion
- [ ] IoT sensor integration
- [ ] Government subsidy integration
- [ ] Insurance recommendations
- [ ] Community marketplace

---

## ⭐ Acknowledgments

- IIIT Gwalior for hackathon support
- Open-Meteo for free weather API
- Contributors and testers
- Farmer community for valuable feedback

---

**Built with ❤️ for farmers | Making agriculture smarter, one prediction at a time.**
