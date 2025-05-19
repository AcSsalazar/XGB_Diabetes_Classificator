
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import '../styles/PredictionForm.css';

function PredictionForm() {
  const [formData, setFormData] = useState({
    username: '',
    model_name: 'xgb_scale_pos_weight',
    HighBP: 0,
    HighChol: 0,
    BMI: 0,
    Stroke: 0,
    HeartDiseaseorAttack: 0,
    PhysActivity: 0,
    HvyAlcoholConsump: 0,
    GenHlth: 0,
    MentHlth: 0,
    PhysHlth: 0,
    DiffWalk: 0,
    Sex: 0,
    Age: 0,
    Education: 0,
    Income: 0,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [isCurrentFieldValid, setIsCurrentFieldValid] = useState(false);


  const fieldLabels = {
    username: 'Nombre de Usuario',
    model_name: 'Modelo de Machine Learning a utilizar',
    HighBP: '¿Sufre usted de presión alta?',
    HighChol: '¿Sus niveles de colesterol son altos?',
    BMI: 'Índice de masa corporal IMC 12-98',
    Stroke: '¿Ha sufrido alguna vez un accidente cerebrovascular?',
    HeartDiseaseorAttack: '¿Ha sufrido o sufre de una afección cardíaca?',
    PhysActivity: '¿Realiza actividad física al menos 2 veces por semana?',
    HvyAlcoholConsump: '¿Consume usted alcohol en exceso?',
    GenHlth: 'Del 1 al 5, ¿cómo califica usted su salud en general? (1: Muy mala, 5: Excelente)',
    MentHlth: 'En los últimos 30 días, ¿cuántas veces ha tenido problemas de salud mental? (Estrés, depresión y problemas emocionales)',
    PhysHlth: 'En los últimos 30 días, ¿cuántos días ha tenido problemas de salud física? (0-30)',
    DiffWalk: '¿Tiene alguna dificultad para caminar?',
    Sex: 'Genero',
    Age: 'Seleccione el número correspondiente al rango donde se encuentra su edad ',
    Education: 'Seleccione el rango correspondiente a su nivel de Educación',
    Income: 'Seleccione el rango correspondiente a su nivel de Ingresos',
  };

  const binaryFields = [
    'HighBP', 'HighChol', 'Stroke', 'HeartDiseaseorAttack',
    'PhysActivity', 'HvyAlcoholConsump', 'DiffWalk', 'Sex'
  ];

  const rangeOptions = {
    Age: [
      { value: 1, label: '18-24' },
      { value: 2, label: '25-29' },
      { value: 3, label: '30-34' },
      { value: 4, label: '35-39' },
      { value: 5, label: '40-44' },
      { value: 6, label: '45-49' },
      { value: 7, label: '50-54' },
      { value: 8, label: '55-59' },
      { value: 9, label: '60-64' },
      { value: 10, label: '65 o más' }
    ],


    GenHlth: [
      { value: 1, label: 'Muy mala' },
      { value: 2, label: 'Mala' },
      { value: 3, label: 'Regular' },
      { value: 4, label: 'Buena' },
      { value: 5, label: 'Excelente' }
    ],

    Education: [
      { value: '1', label: 'Ninguna' },
      { value: '2', label: 'Básica Primaria' },
      { value: '3', label: 'Bachillerato' },
      { value: '4', label: 'Pregrado' },
      { value: '5', label: 'Postgrado (Especialidad)' },
      { value: '6', label: 'Magister / PhD' },
    ],
  };

  const fields = [

    'username', 'model_name', 'HighBP', 'HighChol', 'BMI', 'Stroke',
    'HeartDiseaseorAttack', 'PhysActivity', 'HvyAlcoholConsump', 'GenHlth',
    'MentHlth', 'PhysHlth', 'DiffWalk', 'Sex', 'Age', 'Education', 'Income',

  ];



  const validateField = (field, value) => {
    if (field === 'username') {
      if (!value.trim()) {
        return 'El nombre de usuario es obligatorio';
      }
      return '';
    }
    if (field === 'model_name') {
      if (!value) {
        return 'Debe seleccionar un modelo';
      }
      return '';
    }
    if (binaryFields.includes(field)) {
      if (value !== '0' && value !== '1') {
        return 'Debe seleccionar una opción';
      }
      return '';
    }
    if (field === 'BMI') {
      const num = parseFloat(value);
      if (isNaN(num) || num < 12 || num > 98) {
        return 'El IMC debe estar entre 12 y 98';
      }
      return '';
    }
    if (field === 'MentHlth' || field === 'PhysHlth') {
      const num = parseFloat(value);
      if (isNaN(num) || num < 0 || num > 30) {
        return 'El valor debe estar entre 0 y 30';
      }
      return '';
    }
    if (field === 'Income') {
      const num = parseFloat(value);
      if (isNaN(num) || num < 1 || num > 8) {
        return 'El nivel de ingresos debe estar entre 1 y 8';
      }
      return '';
    }
    if (field === 'GenHlth' || field === 'Age' || field === 'Education') {
      if (!value) {
        return `Debe seleccionar una opción para ${fieldLabels[field].toLowerCase()}`;
      }
      return '';
    }
    return '';
  };

  useEffect(() => {
    const currentField = fields[currentStep];
    const error = validateField(currentField, formData[currentField]);
    setFieldError(error);
    setIsCurrentFieldValid(!error);
  }, [formData, currentStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Payload being sent:', formData);
    try {
      const res = await api.post('/predict/', {
        ...formData,
        // Convert string values to numbers where required
        BMI: parseFloat(formData.BMI) || 0,
        GenHlth: parseInt(formData.GenHlth) || 0,
        MentHlth: parseInt(formData.MentHlth) || 0,
        PhysHlth: parseInt(formData.PhysHlth) || 0,
        Age: parseInt(formData.Age) || 0,
        Education: parseInt(formData.Education) || 0,
        Income: parseInt(formData.Income) || 0,
        HighBP: parseInt(formData.HighBP),
        HighChol: parseInt(formData.HighChol),
        Stroke: parseInt(formData.Stroke),
        HeartDiseaseorAttack: parseInt(formData.HeartDiseaseorAttack),
        PhysActivity: parseInt(formData.PhysActivity),
        HvyAlcoholConsump: parseInt(formData.HvyAlcoholConsump),
        DiffWalk: parseInt(formData.DiffWalk),
        Sex: parseInt(formData.Sex),
      });
      setResult(res);
    } catch (err) {
      console.error(err);
      setError('Error en la predicción. Revisa la consola.');
    }
  };

  const handleNext = () => {
    if (isCurrentFieldValid && currentStep < fields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentField = fields[currentStep];

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Formulario para el Prediagnóstico</h2>
          <div className="disclaimer">
            <p>Por favor, completa el siguiente formulario para obtener un diagnóstico de riesgo de diabetes.</p>
            <p>Recuerda que este diagnóstico es solo una herramienta de apoyo y no sustituye la consulta médica.</p>
          </div>
          <Link to="/">Volver a Inicio</Link>
        </div>
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label>{fieldLabels[currentField]}</label>
            {currentField === 'username' ? (
              <input
                type="text"
                name={currentField}
                value={formData[currentField]}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className="form-input"
              />
            ) : currentField === 'model_name' ? (
              <select
                name={currentField}
                value={formData[currentField]}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Seleccione un modelo</option>
                <option value="xgb_scale_pos_weight">XGBoost Scale Pos Weight</option>
                <option value="xgb_smote_gridsearch">XGBoost SMOTE + GridSearch</option>
              </select>
            ) : currentField === 'Age' ? (
              <select
                name={currentField}
                value={formData[currentField]}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Seleccione su rango de edad</option>
                {rangeOptions.Age.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : currentField === 'GenHlth' ? (
              <select
                name={currentField}
                value={formData[currentField]}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Seleccione su salud general</option>
                {rangeOptions.GenHlth.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : currentField === 'Education' ? (
              <select
                name={currentField}
                value={formData[currentField]}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Seleccione su nivel de educación</option>
                {rangeOptions.Education.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : binaryFields.includes(currentField) ? (
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name={currentField}
                    value="1"
                    checked={formData[currentField] === '1'}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span className="radio-circle"></span>
                  {currentField === 'Sex' ? 'Masculino' : 'Sí'}
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name={currentField}
                    value="0"
                    checked={formData[currentField] === '0'}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span className="radio-circle"></span>
                  {currentField === 'Sex' ? 'Femenino' : 'No'}
                </label>
              </div>
            ) : (
              <input
                type="number"
                name={currentField}
                value={formData[currentField]}
                onChange={handleChange}
                min={currentField === 'BMI' ? 0 : 0}
                max={currentField === 'MentHlth' || currentField === 'PhysHlth' ? 30 : currentField === 'Income' ? 8 : undefined}
                step="1"
                className="form-input"
                placeholder={currentField === 'Income' ? '1-8' : 'Ingrese un número'}
              />
            )}
            {fieldError && <p className="field-error">{fieldError}</p>}
          </div>
          <div className="form-navigation">
            {currentStep > 0 && (
              <button type="button" onClick={handleBack} className="nav-button back-button">
                Atrás
              </button>
            )}
            {currentStep < fields.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="nav-button next-button"
                disabled={!isCurrentFieldValid}
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                className="nav-button submit-button"
                disabled={!isCurrentFieldValid}
              >
                Enviar
              </button>
            )}
          </div>
        </form>
        {error && <p className="form-error">{error}</p>}
        {result && (
          <div className="form-result">
            <h3>{result.riesgo}</h3>
            <p>Nivel de probabilidad: {result.probabilidad}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictionForm;