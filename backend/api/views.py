import numpy as np
import logging
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Prediction
from .model_loader import load_models

logger = logging.getLogger(__name__)

@api_view(['POST'])
def predict(request):
    data = request.data
    logger.debug(f"Payload recibido: {data}")

    try:
        required_fields = [
            'HighBP', 'HighChol', 'BMI', 'Stroke', 'HeartDiseaseorAttack',
            'PhysActivity', 'HvyAlcoholConsump', 'GenHlth', 'MentHlth',
            'PhysHlth', 'DiffWalk', 'Sex', 'Age', 'Education', 'Income'
        ]
        if not all(f in data for f in required_fields):
            missing = [f for f in required_fields if f not in data]
            return Response({'error': f'Campos faltantes: {missing}'}, status=400)

        models = load_models()  # <- Carga solo cuando se necesita

        model_name = data.get('model_name', 'xgb_scale_pos_weight')
        if model_name not in models:
            return Response({'error': f'Modelo inválido: {model_name}'}, status=400)

        username = data.get('username', '')

        model_info = models[model_name]
        feature_order = model_info['feature_order']
        arr = np.array([[float(data[f]) for f in feature_order]])

        model = model_info['model']
        prob = float(model.predict_proba(arr)[0, 1])

        if model_name == 'xgb_scale_pos_weight':
            if prob < 0.3:
                riesgo = "Riesgo bajo. ¡Sigue así!"
            elif prob < 0.4:
                riesgo = "Riesgo moderado. Consulta con tu médico."
            else:
                riesgo = "Riesgo alto. Atención médica urgente recomendada."
        elif model_name in ['Model03', 'RFC']:
            if prob < 0.3:
                riesgo = "Riesgo bajo. ¡Sigue así!"
            elif prob < 0.5:
                riesgo = "Riesgo moderado. Consulta con tu médico."
            else:
                riesgo = "Riesgo alto. Atención médica urgente recomendada."
        else:
            if prob < 0.2:
                riesgo = "Riesgo bajo. ¡Sigue así!"
            elif prob < 0.4:
                riesgo = "Riesgo moderado. Consulta con tu médico."
            else:
                riesgo = "Riesgo alto. Atención médica urgente recomendada."

        Prediction.objects.create(
            input_data=data,
            probability=round(prob, 3),
            risk_level=riesgo,
            username=username
        )

        return Response({'riesgo': riesgo, 'probabilidad': round(prob, 3)})

    except Exception as e:
        logger.exception(f"Error en predicción: {e}")
        return Response({'error': 'Error interno en el servidor'}, status=500)

@api_view(['GET'])
def get_predictions(request):
    try:
        predictions = Prediction.objects.all().values(
            'id', 'input_data', 'probability', 'risk_level', 'created_at', 'username'
        )
        return Response(list(predictions))
    except Exception as e:
        logger.exception(f"Error al obtener predicciones: {e}")
        return Response({'error': 'No se pudieron recuperar las predicciones'}, status=500)

