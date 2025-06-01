import os
import joblib
import numpy as np
import logging
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Prediction

# Logger
logger = logging.getLogger(__name__)

# Local model paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Define model paths
MODEL_PATHS = {
    'xgb_scale_pos_weight': os.path.join(BASE_DIR, 'models', 'xgb_scale_pos_weight.pkl'),
    'xgb_smote_gridsearch': os.path.join(BASE_DIR, 'models', 'xgb_smote_gridsearch.pkl'),
    'Model03': os.path.join(BASE_DIR, 'models', 'Model03.pkl'),
    'RFC': os.path.join(BASE_DIR, 'models', 'RFC.pkl'),
}

# Load models
models = {}
try:
    for model_name, model_path in MODEL_PATHS.items():
        if not os.path.exists(model_path):
            logger.error(f"Model file not found: {model_path}")
            raise FileNotFoundError(f"Model file not found: {model_path}")
        model, feature_order, threshold = joblib.load(model_path)
        models[model_name] = {'model': model, 'feature_order': feature_order, 'threshold': threshold}
        logger.info(f"Loaded model {model_name} from {model_path}")
except Exception as e:
    logger.exception(f"Error loading models: {e}")
    raise RuntimeError("Failed to load models")

@api_view(['POST'])
def predict(request):
    data = request.data
    logger.debug(f"Received payload: {data}")
    try:
        # Va\
        # lidate required fields
        required_fields = [
            'HighBP', 'HighChol', 'BMI', 'Stroke', 'HeartDiseaseorAttack',
            'PhysActivity', 'HvyAlcoholConsump', 'GenHlth', 'MentHlth',
            'PhysHlth', 'DiffWalk', 'Sex', 'Age', 'Education', 'Income'
        ]
        if not all(f in data for f in required_fields):
            missing = [f for f in required_fields if f not in data]
            logger.error(f"Missing fields: {missing}")
            return Response({'error': f'Missing fields: {missing}'}, status=400)

        # Validate model selection
        model_name = data.get('model_name', 'xgb_scale_pos_weight')  # Default to first model
        if model_name not in models:
            logger.error(f"Invalid model name: {model_name}")
            return Response({'error': f'Invalid model: {model_name}'}, status=400)

        # Validate username
        username = data.get('username', '')
        if not username:
            logger.warning("No username provided")

        # Construct input array
        model_info = models[model_name]
        feature_order = model_info['feature_order']
        try:
            arr = np.array([[float(data[f]) for f in feature_order]])
            logger.debug(f"Input array shape: {arr.shape}, values: {arr}")
        except (ValueError, TypeError) as e:
            logger.error(f"Invalid numeric values: {e}")
            return Response({'error': 'All fields must be numeric'}, status=400)

        # Predict
        model = model_info['model']
        prob = float(model.predict_proba(arr)[0, 1])
        logger.debug(f"Prediction probability: {prob}")

        # Classify risk based on model
        if model_name == 'xgb_scale_pos_weight':
            if prob < 0.3:
                riesgo = "Excelente noticia! Tu resultado indica un riesgo bajo de padecer diabetes. Es un alivio recibir esta clasificación, y te animamos a mantener ese buen camino. Aunque el riesgo sea bajo, la prevención sigue siendo clave. Te recomendamos continuar con un estilo de vida saludable que incluya una dieta equilibrada y actividad física regular. Si experimentas síntomas preocupantes o tienes inquietudes en el futuro, no dudes en consultar a un profesional de la salud. Un chequeo médico anual siempre es una buena práctica para asegurar tu bienestar general."
            elif prob < 0.4:
                riesgo = "Tu resultado indica un riesgo moderado de desarrollar diabetes. Entendemos que esta noticia puede generar cierta preocupación, pero es importante recordar que este conocimiento es una gran oportunidad para actuar a tiempo. Un riesgo moderado significa que hay medidas proactivas que puedes tomar para reducirlo significativamente o incluso revertirlo. Te aconsejamos encarecidamente programar una cita con tu médico de cabecera lo antes posible para discutir este resultado. Ellos podrán realizar pruebas adicionales y diseñar un plan personalizado que puede incluir cambios en el estilo de vida, como ajustes en la dieta y más ejercicio. Recuerda, no estás solo en este camino, y el apoyo profesional puede marcar una gran diferencia."
            else:
                riesgo = "Tu resultado indica un riesgo alto de padecer diabetes. Sabemos que esta noticia puede ser abrumadora y generar emociones difíciles. Queremos que sepas que es completamente normal sentirse así, y que no estás solo. Este resultado es una señal clara de que es crucial tomar acción inmediata. Te urgimos a que busques atención médica especializada sin demora. Un médico, preferiblemente un endocrinólogo, podrá confirmar el diagnóstico, iniciar el tratamiento adecuado y guiarte a través de los próximos pasos. Hay muchas opciones de tratamiento y manejo que pueden ayudarte a llevar una vida plena y saludable. El apoyo emocional es fundamental en este proceso; considera hablar con amigos, familiares o un grupo de apoyo. Estás en un momento importante para tomar el control de tu salud, y hay recursos y personas dispuestas a ayudarte."
        elif model_name == 'Model03' or model_name == 'RFC':
            if prob < 0.3:
                riesgo = "Excelente noticia! Tu resultado indica un riesgo bajo de padecer diabetes. Es un alivio recibir esta clasificación, y te animamos a mantener ese buen camino. Aunque el riesgo sea bajo, la prevención sigue siendo clave. Te recomendamos continuar con un estilo de vida saludable que incluya una dieta equilibrada y actividad física regular. Si experimentas síntomas preocupantes o tienes inquietudes en el futuro, no dudes en consultar a un profesional de la salud. Un chequeo médico anual siempre es una buena práctica para asegurar tu bienestar general."
            elif prob < 0.5:
                riesgo = "Tu resultado indica un riesgo moderado de desarrollar diabetes. Entendemos que esta noticia puede generar cierta preocupación, pero es importante recordar que este conocimiento es una gran oportunidad para actuar a tiempo. Un riesgo moderado significa que hay medidas proactivas que puedes tomar para reducirlo significativamente o incluso revertirlo. Te aconsejamos encarecidamente programar una cita con tu médico de cabecera lo antes posible para discutir este resultado. Ellos podrán realizar pruebas adicionales y diseñar un plan personalizado que puede incluir cambios en el estilo de vida, como ajustes en la dieta y más ejercicio. Recuerda, no estás solo en este camino, y el apoyo profesional puede marcar una gran diferencia."
            else:
                riesgo = "Tu resultado indica un riesgo alto de padecer diabetes. Sabemos que esta noticia puede ser abrumadora y generar emociones difíciles. Queremos que sepas que es completamente normal sentirse así, y que no estás solo. Este resultado es una señal clara de que es crucial tomar acción inmediata. Te urgimos a que busques atención médica especializada sin demora. Un médico, preferiblemente un endocrinólogo, podrá confirmar el diagnóstico, iniciar el tratamiento adecuado y guiarte a través de los próximos pasos. Hay muchas opciones de tratamiento y manejo que pueden ayudarte a llevar una vida plena y saludable. El apoyo emocional es fundamental en este proceso; considera hablar con amigos, familiares o un grupo de apoyo. Estás en un momento importante para tomar el control de tu salud, y hay recursos y personas dispuestas a ayudarte."
        else:  # xgb_smote_gridsearch
            if prob < 0.2:
                riesgo = "Excelente noticia! Tu resultado indica un riesgo bajo de padecer diabetes. Es un alivio recibir esta clasificación, y te animamos a mantener ese buen camino. Aunque el riesgo sea bajo, la prevención sigue siendo clave. Te recomendamos continuar con un estilo de vida saludable que incluya una dieta equilibrada y actividad física regular. Si experimentas síntomas preocupantes o tienes inquietudes en el futuro, no dudes en consultar a un profesional de la salud. Un chequeo médico anual siempre es una buena práctica para asegurar tu bienestar general."
            elif prob < 0.4:
                riesgo = "Tu resultado indica un riesgo moderado de desarrollar diabetes. Entendemos que esta noticia puede generar cierta preocupación, pero es importante recordar que este conocimiento es una gran oportunidad para actuar a tiempo. Un riesgo moderado significa que hay medidas proactivas que puedes tomar para reducirlo significativamente o incluso revertirlo. Te aconsejamos encarecidamente programar una cita con tu médico de cabecera lo antes posible para discutir este resultado. Ellos podrán realizar pruebas adicionales y diseñar un plan personalizado que puede incluir cambios en el estilo de vida, como ajustes en la dieta y más ejercicio. Recuerda, no estás solo en este camino, y el apoyo profesional puede marcar una gran diferencia."
            else:
                riesgo = "Tu resultado indica un riesgo alto de padecer diabetes. Sabemos que esta noticia puede ser abrumadora y generar emociones difíciles. Queremos que sepas que es completamente normal sentirse así, y que no estás solo. Este resultado es una señal clara de que es crucial tomar acción inmediata. Te urgimos a que busques atención médica especializada sin demora. Un médico, preferiblemente un endocrinólogo, podrá confirmar el diagnóstico, iniciar el tratamiento adecuado y guiarte a través de los próximos pasos. Hay muchas opciones de tratamiento y manejo que pueden ayudarte a llevar una vida plena y saludable. El apoyo emocional es fundamental en este proceso; considera hablar con amigos, familiares o un grupo de apoyo. Estás en un momento importante para tomar el control de tu salud, y hay recursos y personas dispuestas a ayudarte"

        # Save to database
        Prediction.objects.create(
            input_data=data,
            probability=round(prob, 3),
            risk_level=riesgo,
            username=username
        )

        return Response({'riesgo': riesgo, 'probabilidad': round(prob, 3)})
    except Exception as e:
        logger.exception(f"Error in predict(): {e}")
        return Response({'error': f'Predict failed: {str(e)}'}, status=500)

@api_view(['GET'])
def get_predictions(request):
    try:
        predictions = Prediction.objects.all().values('id', 'input_data', 'probability', 'risk_level', 'created_at', 'username')
        return Response(list(predictions))
    except Exception as e:
        logger.exception(f"Error in get_predictions(): {e}")
        return Response({'error': 'Failed to fetch predictions'}, status=500)