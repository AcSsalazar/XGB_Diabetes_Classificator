import React from "react";

const DiabetesInfo = () => (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: "2rem", background: "#f9f9f9", borderRadius: 8 }}>
        <h1>Información General sobre la Diabetes</h1>
        <p>
            La <strong>diabetes</strong> es una enfermedad crónica que afecta la forma en que el cuerpo convierte los alimentos en energía. Se caracteriza por niveles elevados de glucosa (azúcar) en la sangre debido a problemas en la producción o el uso de insulina.
        </p>
        <h2>Tipos principales de diabetes</h2>
        <ul>
            <li>
                <strong>Diabetes tipo 1:</strong> El cuerpo no produce insulina. Suele diagnosticarse en niños y jóvenes.
            </li>
            <li>
                <strong>Diabetes tipo 2:</strong> El cuerpo no usa la insulina adecuadamente. Es el tipo más común y suele aparecer en adultos.
            </li>
            <li>
                <strong>Diabetes gestacional:</strong> Aparece durante el embarazo y generalmente desaparece después del parto.
            </li>
        </ul>
        <h2>Síntomas comunes</h2>
        <ul>
            <li>Sed y hambre excesivas</li>
            <li>Micción frecuente</li>
            <li>Pérdida de peso inexplicada</li>
            <li>Cansancio</li>
            <li>Visión borrosa</li>
        </ul>
        <h2>Prevención y control</h2>
        <ul>
            <li>Alimentación saludable</li>
            <li>Actividad física regular</li>
            <li>Control del peso</li>
            <li>Monitoreo de los niveles de glucosa</li>
            <li>Seguir las indicaciones médicas</li>
        </ul>
        <p>
            Si tienes dudas o síntomas, consulta a un profesional de la salud.
        </p>
    </div>
);

export default DiabetesInfo;