import os
import joblib
import logging

logger = logging.getLogger(__name__)

MODEL_PATHS = {
    'xgb_scale_pos_weight': 'backend/models/xgb_scale_pos_weight.pkl',
    'xgb_smote_gridsearch': 'backend/models/xgb_smote_gridsearch.pkl',
    'Model03': 'backend/models/Model03.pkl',
    'RFC': 'backend/models/RFC.pkl',
}

LOADED_MODELS = {}

def load_models():
    global LOADED_MODELS
    if LOADED_MODELS:
        return LOADED_MODELS

    for model_name, path in MODEL_PATHS.items():
        try:
            if not os.path.exists(path):
                raise FileNotFoundError(f"No encontrado: {path}")
            model, feature_order, threshold = joblib.load(path)
            LOADED_MODELS[model_name] = {
                'model': model,
                'feature_order': feature_order,
                'threshold': threshold
            }
            logger.info(f"✔ Modelo {model_name} cargado correctamente desde {path}")
        except Exception as e:
            logger.error(f"❌ Error cargando modelo {model_name}: {e}")
    return LOADED_MODELS
