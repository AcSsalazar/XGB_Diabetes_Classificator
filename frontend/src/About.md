**Diagnóstico Predictivo de Diabetes con Aprendizaje Automático**
Este proyecto fue desarrollado con el objetivo de evaluar, comparar y aplicar modelos de clasificación capaces de predecir el riesgo de diabetes tipo 1 a partir de información clínica básica. Para lograrlo, entrenamos cuatro modelos de machine learning utilizando el mismo conjunto de datos, pero aplicando distintas técnicas para tratar el desbalance de clases y diferentes algoritmos de clasificación. De esta forma, buscamos identificar el modelo más robusto, generalizable y útil en contextos reales.



Los modelos disponibles en esta aplicación son:

* **XGBoost + scale_pos_weight**
  Entrenado ajustando el peso de la clase minoritaria, sin generar datos sintéticos.

* **Random Forest + class_weight='balanced'**
  Aplica pesos inversamente proporcionales al tamaño de cada clase directamente en el clasificador.

* **XGBoost** con ajuste del desbalance de clases (scale_pos_weight) y optimización de hiperparámetros mediante validación cruzada estratificada.

* **Random Forest** con pesos balanceados y búsqueda de hiperparámetros mediante validación cruzada estratificada.

*¿Cómo se evalúan los modelos?*
La evaluación se realiza a partir de:

📊 Resultados de validación durante el entrenamiento, incluyendo métricas como F1 Score, AUC, accuracy, precisión y recall.
👥 Predicciones reales generadas por usuarios, mediante el formulario clínico disponible en esta aplicación.

🙋‍♂️ *¿Cómo puedes contribuir?*
Al enviar tus datos anónimos, estarás ayudando a que el sistema siga aprendiendo y refinando su capacidad predictiva. Puedes seleccionar cualquier modelo disponible y verificar tu nivel de riesgo según su criterio.

📌 *Objetivo final*
Ofrecer una herramienta accesible que, sin reemplazar el diagnóstico médico, sirva como sistema de prediagnóstico de riesgo utilizando aprendizaje automático, con capacidad de mejora continua basada en nuevos datos.