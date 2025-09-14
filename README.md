# XGB Diabetes Classificator

A comprehensive machine learning web application for early diabetes risk detection using physiological and clinical data. This project combines multiple machine learning models with an intuitive web interface to provide personalized diabetes risk assessments.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Machine Learning Models](#machine-learning-models)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Multiple ML Models**: XGBoost, Random Forest, and other algorithms for robust predictions
- **Risk Assessment**: Comprehensive risk evaluation with detailed recommendations
- **User-friendly Interface**: React-based web application with intuitive forms
- **Prediction History**: Track and view previous predictions
- **REST API**: Django REST Framework API for integration
- **Real-time Predictions**: Instant diabetes risk assessment
- **Multilingual Support**: Interface and recommendations in Spanish

## 🏗 Project Structure

```
XGB_Diabetes_Classificator/
│
├── backend/                    # Django REST API
│   ├── api/                   # API application
│   │   ├── models.py         # Database models
│   │   ├── views.py          # API endpoints
│   │   └── urls.py           # URL routing
│   ├── core/                 # Django settings
│   ├── models/               # ML model files (.pkl)
│   ├── requirements.txt      # Python dependencies
│   └── manage.py            # Django management script
│
├── frontend/                  # React application
│   └── forms/               # Main React app
│       ├── src/             # Source code
│       │   ├── components/  # React components
│       │   ├── base/        # Layout components
│       │   └── App.jsx      # Main application
│       ├── package.json     # Node.js dependencies
│       └── vite.config.js   # Vite configuration
│
├── Model_training_final_project.ipynb  # Jupyter notebook for model training
└── README.md                # This file
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+**
- **Node.js 16+**
- **npm or yarn**
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AcSsalazar/XGB_Diabetes_Classificator.git
cd XGB_Diabetes_Classificator
```

### 2. Backend Setup (Django)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv diabetes_env
source diabetes_env/bin/activate  # On Windows: diabetes_env\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Create superuser (optional, for admin access)
python manage.py createsuperuser

# Start the Django development server
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup (React)

```bash
# Open a new terminal and navigate to frontend
cd frontend/forms

# Install Node.js dependencies
npm install

# Start the React development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🎯 Usage

### Web Application

1. **Start both servers** (backend and frontend) following the installation steps
2. **Open your browser** and go to `http://localhost:5173`
3. **Navigate to the prediction form** using the menu
4. **Fill in the health parameters**:
   - High Blood Pressure (HighBP)
   - High Cholesterol (HighChol)
   - BMI
   - Stroke history
   - Heart Disease or Attack
   - Physical Activity
   - Heavy Alcohol Consumption
   - General Health
   - Mental Health days
   - Physical Health days
   - Difficulty Walking
   - Sex
   - Age
   - Education level
   - Income level

5. **Select a model** (XGBoost recommended for best accuracy)
6. **Submit the form** to get your diabetes risk assessment
7. **View detailed recommendations** based on your risk level
8. **Check prediction history** to track your results over time

### Risk Levels

The application provides three risk levels:

- **🟢 Low Risk**: Excellent news! Continue maintaining healthy lifestyle
- **🟡 Moderate Risk**: Take proactive measures, consult healthcare provider
- **🔴 High Risk**: Seek immediate medical attention from specialist

## 📚 API Documentation

### Base URL
`http://localhost:8000/`

### Endpoints

#### GET `/models/`
Get available ML models

**Response:**
```json
{
  "available_models": ["xgb_scale_pos_weight", "xgb_smote_gridsearch"],
  "default_model": "xgb_scale_pos_weight",
  "total_models": 2
}
```

#### POST `/predict/`
Make a diabetes risk prediction

**Request Body:**
```json
{
  "HighBP": 0,
  "HighChol": 1,
  "BMI": 25.5,
  "Stroke": 0,
  "HeartDiseaseorAttack": 0,
  "PhysActivity": 1,
  "HvyAlcoholConsump": 0,
  "GenHlth": 3,
  "MentHlth": 5,
  "PhysHlth": 2,
  "DiffWalk": 0,
  "Sex": 1,
  "Age": 8,
  "Education": 6,
  "Income": 7,
  "model_name": "xgb_scale_pos_weight",
  "username": "john_doe"
}
```

**Response:**
```json
{
  "riesgo": "Detailed risk assessment message in Spanish",
  "probabilidad": 0.234
}
```

#### GET `/predictions/`
Retrieve all prediction history

**Response:**
```json
[
  {
    "id": 1,
    "input_data": {...},
    "probability": 0.234,
    "risk_level": "Low risk message...",
    "created_at": "2024-01-15T10:30:00Z",
    "username": "john_doe"
  }
]
```

## 🤖 Machine Learning Models

The application includes several trained models:

- **XGBoost Scale Pos Weight**: Optimized for class imbalance
- **XGBoost SMOTE GridSearch**: Enhanced with SMOTE and hyperparameter tuning
- **Model03**: Additional ensemble model
- **Random Forest Classifier (RFC)**: Tree-based ensemble method

### Model Performance
Each model has been trained and validated on clinical diabetes datasets with different optimization strategies for maximum accuracy and reliability.

## 🛠 Development

### Backend Development

```bash
# Run tests
python manage.py test

# Check code style
flake8 .

# Create new migrations
python manage.py makemigrations

# Access Django admin
# Go to http://localhost:8000/admin
```

### Frontend Development

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Models

1. Train your model using the provided Jupyter notebook
2. Save the model as a pickle file in `backend/models/`
3. Update the `MODEL_PATHS` dictionary in `backend/api/views.py`
4. Add model-specific risk thresholds in the prediction logic

## 🔧 Troubleshooting

### Missing Model Files

If you encounter errors about missing model files (`Model03.pkl`, `RFC.pkl`), the application will automatically skip unavailable models and use the available ones. To check which models are loaded:

```bash
curl http://localhost:8000/models/
```

### Common Issues

1. **Django server won't start**: Ensure all Python dependencies are installed with `pip install -r requirements.txt`

2. **React server missing dependencies**: Install missing packages with `npm install react-markdown`

3. **Model version warnings**: The XGBoost and scikit-learn warnings about model versions are informational and won't affect functionality

4. **Database migrations**: Run `python manage.py migrate` if you see database-related errors

5. **CORS errors**: The backend is configured to allow all origins in development mode

### Port Configuration

- Backend (Django): `http://localhost:8000`
- Frontend (React): `http://localhost:5173`

If these ports are occupied, you can change them:
- Django: `python manage.py runserver 8001`
- React: Edit `vite.config.js` or use `npm run dev -- --port 3000`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint configuration for JavaScript/React
- Write tests for new features
- Update documentation for API changes
- Ensure models are properly validated before deployment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Clinical datasets used for model training
- Open-source machine learning libraries (XGBoost, scikit-learn)
- Django and React communities for excellent frameworks

## 📞 Support

For support, questions, or contributions, please open an issue on GitHub or contact the development team.

---

**⚠️ Disclaimer**: This application is for educational and research purposes. Always consult healthcare professionals for medical decisions.
