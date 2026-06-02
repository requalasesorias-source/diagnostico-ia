"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ppayzttzbuctecpdbjek.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYXl6dHR6YnVjdGVjcGRiamVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MjQxMTEsImV4cCI6MjA5NjAwMDExMX0.y2EJXKkzmrGuwFb0s9aiKCB2M6b2Qg1P3If2mUxp2m4"
);

const questions = [
  {
    id: 1, block: "Contexto profesional", blockIcon: "◈",
    question: "¿Cuál es tu rol o actividad principal hoy?",
    type: "single",
    options: [
      { label: "Empleado en empresa (área administrativa, comercial u operativa)", score: 1 },
      { label: "Profesional independiente / consultor", score: 2 },
      { label: "Dueño de negocio o emprendedor", score: 3 },
      { label: "Ejecutivo o líder de equipo", score: 3 },
    ],
  },
  {
    id: 2, block: "Contexto profesional", blockIcon: "◈",
    question: "¿Cuál es el mayor cuello de botella en tu trabajo hoy?",
    type: "single",
    options: [
      { label: "Pierdo demasiado tiempo en tareas repetitivas", score: 1 },
      { label: "Me cuesta generar contenido, informes o documentos rápido", score: 1 },
      { label: "No tengo claridad sobre qué datos usar para decidir", score: 2 },
      { label: "Necesito escalar procesos sin contratar más personas", score: 3 },
    ],
  },
  {
    id: 3, block: "Contexto profesional", blockIcon: "◈",
    question: "¿Qué esperas lograr concretamente al terminar este programa?",
    type: "single",
    options: [
      { label: "Entender qué es la IA y cómo usarla en mi día a día", score: 1 },
      { label: "Ahorrar tiempo automatizando tareas de mi trabajo", score: 2 },
      { label: "Implementar IA en mi negocio para crecer o diferenciarme", score: 3 },
      { label: "Crear sistemas de IA propios o generar ingresos con IA", score: 4 },
    ],
  },
  {
    id: 4, block: "Uso actual de IA", blockIcon: "⬡",
    question: "¿Con qué frecuencia usas herramientas de IA hoy?",
    type: "single",
    options: [
      { label: "Nunca o casi nunca", score: 0 },
      { label: "La probé un par de veces pero no la uso regularmente", score: 1 },
      { label: "La uso 1-3 veces por semana", score: 2 },
      { label: "La uso todos los días como parte de mi flujo de trabajo", score: 4 },
    ],
  },
  {
    id: 5, block: "Uso actual de IA", blockIcon: "⬡",
    question: "¿Cómo describes tu forma de pedirle cosas a una IA?",
    type: "single",
    options: [
      { label: "Escribo algo corto y veo qué sale — no sé si lo estoy haciendo bien", score: 0 },
      { label: "Intento explicar bien, pero a veces las respuestas no son lo que quería", score: 1 },
      { label: "Sé cómo darle contexto, rol y estructura a mis instrucciones", score: 3 },
      { label: "Uso técnicas avanzadas: cadenas de prompts, ejemplos, restricciones explícitas", score: 5 },
    ],
  },
  {
    id: 6, block: "Uso actual de IA", blockIcon: "⬡",
    question: "¿Has logrado automatizar algún proceso con IA?",
    type: "single",
    options: [
      { label: "No, ni sé por dónde empezar", score: 0 },
      { label: "Lo he pensado pero no lo he ejecutado todavía", score: 1 },
      { label: "Sí, algo básico como generar emails o resumir documentos", score: 2 },
      { label: "Sí, tengo flujos que corren solos y me ahorran horas por semana", score: 5 },
    ],
  },
  {
    id: 7, block: "Herramientas IA", blockIcon: "⬢",
    question: "¿Cuáles de estas herramientas conoces y sabes para qué sirven?",
    type: "multi",
    options: [
      { label: "ChatGPT / Claude / Gemini (asistentes conversacionales)", score: 1 },
      { label: "Make / Zapier (automatización de flujos)", score: 2 },
      { label: "Midjourney / DALL-E / Sora (generación de imágenes o video)", score: 1 },
      { label: "Perplexity / Bing AI (búsqueda con IA)", score: 1 },
      { label: "ElevenLabs / HeyGen (voz e IA de video)", score: 2 },
      { label: "Notion AI / Copilot (productividad con IA integrada)", score: 1 },
      { label: "Suno / Udio / Kling (música o video con IA)", score: 2 },
      { label: "Ninguna de las anteriores", score: 0 },
    ],
  },
  {
    id: 8, block: "Herramientas IA", blockIcon: "⬢",
    question: "¿Cuánto dominas estos conceptos? Marca los que puedes explicar:",
    type: "multi",
    options: [
      { label: "Prompt engineering (diseño estructurado de instrucciones)", score: 2 },
      { label: "Agentes de IA (sistemas que actúan de forma autónoma)", score: 3 },
      { label: "RAG — Retrieval Augmented Generation (IA con tus propios datos)", score: 4 },
      { label: "Flujos automatizados (Make, n8n, Zapier integrados con IA)", score: 3 },
      { label: "Fine-tuning (entrenar un modelo con datos propios)", score: 4 },
      { label: "APIs de IA (conectar modelos directamente a tus sistemas)", score: 4 },
      { label: "Ninguno — no estoy familiarizado con estos términos", score: 0 },
    ],
  },
  {
    id: 9, block: "Aplicación al negocio", blockIcon: "◇",
    question: "¿En qué área aplicarías IA primero?",
    type: "single",
    options: [
      { label: "Productividad personal (emails, resúmenes, organización)", score: 1 },
      { label: "Atención al cliente o comunicación comercial", score: 2 },
      { label: "Marketing, contenido o redes sociales", score: 2 },
      { label: "Operaciones, reportes o gestión interna", score: 3 },
      { label: "Crear un producto o servicio nuevo basado en IA", score: 4 },
    ],
  },
  {
    id: 10, block: "Aplicación al negocio", blockIcon: "◇",
    question: "¿Tienes un proyecto concreto donde aplicarías lo aprendido?",
    type: "single",
    options: [
      { label: "No tengo nada concreto todavía", score: 0 },
      { label: "Tengo una idea general pero no está definida", score: 1 },
      { label: "Sí, tengo un caso de uso claro en mi trabajo o negocio", score: 3 },
      { label: "Sí, y ya empecé — necesito profundizar para avanzar más rápido", score: 5 },
    ],
  },
  {
    id: 11, block: "Perfil de aprendizaje", blockIcon: "○",
    question: "¿Cuánto tiempo real puedes dedicar por semana?",
    type: "single",
    options: [
      { label: "1-2 horas (aprendizaje gradual)", score: 1 },
      { label: "3-5 horas (ritmo constante)", score: 2 },
      { label: "Más de 5 horas (modo intensivo)", score: 3 },
    ],
  },
  {
    id: 12, block: "Perfil de aprendizaje", blockIcon: "○",
    question: "¿Cómo aprendes mejor?",
    type: "single",
    options: [
      { label: "Me explican el concepto y tomo nota — prefiero teoría primero", score: 1 },
      { label: "Aprendo haciendo — necesito practicar mientras me enseñan", score: 2 },
      { label: "Aprendo con proyectos reales aplicados a mi propio negocio", score: 3 },
      { label: "Soy autodidacta — me das el mapa y avanzo solo entre sesiones", score: 3 },
    ],
  },
];

const levels = [
  {
    id: 0, name: "Explorador", range: [0, 14],
    color: "#6EE7B7", bg: "rgba(110,231,183,0.08)", border: "rgba(110,231,183,0.3)", icon: "◎",
    description: "Estás en el punto de partida perfecto. El programa te dará una base sólida desde cero y resultados aplicables desde la primera sesión.",
    program: [
      "Sesión 1 — Qué es la IA realmente y por qué cambia todo (sin humo)",
      "Sesión 2 — Herramientas clave: ChatGPT, Claude y Gemini en profundidad",
      "Sesión 3 — Prompt engineering: cómo hablarle a la IA para obtener resultados reales",
      "Sesión 4 — IA para tu productividad diaria: emails, documentos, decisiones",
      "Sesión 5 — Primer flujo automatizado aplicado a tu negocio o trabajo",
      "Sesión 6 — Mapa de herramientas por área: marketing, operaciones, clientes",
    ],
    sessions: 6, duration: "4-6 semanas",
  },
  {
    id: 1, name: "Iniciado", range: [15, 26],
    color: "#93C5FD", bg: "rgba(147,197,253,0.08)", border: "rgba(147,197,253,0.3)", icon: "◉",
    description: "Ya usas IA pero no de forma sistemática. El programa te dará estructura, técnica y tus primeras automatizaciones reales funcionando.",
    program: [
      "Sesión 1 — Diagnóstico: qué estás haciendo bien y dónde estás dejando valor",
      "Sesión 2 — Prompt engineering avanzado: roles, cadenas, restricciones y formato",
      "Sesión 3 — Automatización básica con Make o Zapier + IA integrada",
      "Sesión 4 — IA para generación de contenido, propuestas y reportes",
      "Sesión 5 — Casos aplicados a tu negocio: construimos juntos",
      "Sesión 6 — Stack de herramientas personalizado según tu industria",
      "Sesión 7 — Sistema de trabajo con IA: cómo mantenerlo y escalarlo",
    ],
    sessions: 7, duration: "5-7 semanas",
  },
  {
    id: 2, name: "Intermedio", range: [27, 38],
    color: "#FCD34D", bg: "rgba(252,211,77,0.08)", border: "rgba(252,211,77,0.3)", icon: "◆",
    description: "Tienes base. El programa va directo a flujos avanzados, agentes y estrategia de negocio con IA. Cero teoría básica, 100% aplicación.",
    program: [
      "Sesión 1 — Auditoría de tu stack actual: qué eliminar, qué mantener, qué agregar",
      "Sesión 2 — Agentes de IA: qué son, cómo se diseñan y cuándo usarlos",
      "Sesión 3 — Flujos multi-paso con Make + IA: automatizaciones reales complejas",
      "Sesión 4 — IA con tus propios datos (intro a RAG sin código)",
      "Sesión 5 — Estrategia de IA para el negocio: dónde está el mayor ROI",
      "Sesión 6 — Caso práctico intensivo: construimos tu sistema en vivo",
      "Sesión 7 — Monetización y diferenciación con IA en tu industria",
    ],
    sessions: 7, duration: "6-8 semanas",
  },
  {
    id: 3, name: "Avanzado", range: [39, 99],
    color: "#F9A8D4", bg: "rgba(249,168,212,0.08)", border: "rgba(249,168,212,0.3)", icon: "⬟",
    description: "Tienes conocimiento real. El programa es estratégico: sistemas propios, agentes complejos, APIs y monetización con IA.",
    program: [
      "Sesión 1 — Estrategia: diseña tu sistema de IA completo desde el negocio",
      "Sesión 2 — Arquitectura de agentes: diseño, orquestación y casos reales",
      "Sesión 3 — Conexión con APIs de IA (OpenAI, Claude, Gemini) sin ser developer",
      "Sesión 4 — RAG aplicado: base de conocimiento propia funcionando",
      "Sesión 5 — Flujos avanzados: n8n, Make, webhooks y lógica condicional",
      "Sesión 6 — Modelo de negocio con IA: cómo cobrar, escalar y diferenciarte",
      "Sesión 7 — Proyecto final: tu producto o sistema de IA corriendo en producción",
      "Sesión 8 — Mentoría estratégica: revisión, ajuste y próximos pasos",
    ],
    sessions: 8, duration: "8-10 semanas",
  },
];

function getLevel(score) {
  return levels.find((l) => score >= l.range[0] && score <= l.range[1]) || levels[0];
}

export default function Page() {
  const [step, setStep] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [nombre, setNombre] = useState("");

  const q = questions[currentQ];
  const isMulti = q?.type === "multi";

  function handleSingle(score, label) {
    setAnswers((prev) => ({ ...prev, [q.id]: [{ score, label }] }));
  }

  function handleMulti(score, label) {
    const noneLabels = ["Ninguna de las anteriores", "Ninguno — no estoy familiarizado con estos términos"];
    if (noneLabels.includes(label)) {
      setAnswers((prev) => ({ ...prev, [q.id]: [{ score: 0, label }] }));
      return;
    }
    const prev = answers[q.id] || [];
    const filtered = prev.filter((a) => !noneLabels.includes(a.label));
    const exists = filtered.find((a) => a.label === label);
    if (exists) {
      setAnswers((p) => ({ ...p, [q.id]: filtered.filter((a) => a.label !== label) }));
    } else {
      setAnswers((p) => ({ ...p, [q.id]: [...filtered, { score, label }] }));
    }
  }

  function isSelected(label) {
    return (answers[q?.id] || []).some((a) => a.label === label);
  }

  function calcScore() {
    let s = 0;
    Object.values(answers).forEach((arr) => {
      if (!arr) return;
      arr.forEach((a) => { s += a.score || 0; });
    });
    return s;
  }

  async function finalize() {
    const score = calcScore();
    const level = getLevel(score);
    setTotalScore(score);
    setSaving(true);

    try {
      await supabase.from("diagnostico_resultados").insert({
        nivel_id: level.id,
        nivel_nombre: level.name,
        puntaje: score,
        porcentaje: Math.min(Math.round((score / 52) * 100), 100),
        respuestas: answers,
        nombre: nombre || null,
      });
      setSaved(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
      setStep("result");
    }
  }

  function next() {
    if (!answers[q.id] || answers[q.id].length === 0) return;
    setAnimating(true);
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((c) => c + 1);
      } else {
        finalize();
      }
      setAnimating(false);
    }, 220);
  }

  function prev() {
    if (currentQ > 0) {
      setAnimating(true);
      setTimeout(() => { setCurrentQ((c) => c - 1); setAnimating(false); }, 220);
    }
  }

  function reset() {
    setStep("intro"); setCurrentQ(0); setAnswers({});
    setTotalScore(0); setSaved(false); setNombre("");
  }

  const level = getLevel(totalScore);
  const pct = Math.min(Math.round((totalScore / 52) * 100), 100);

  const base = {
    minHeight: "100vh", background: "#080C14",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "24px 16px", fontFamily: "'DM Sans','Segoe UI',sans-serif",
  };

  const glow = (color, pos) => ({
    position: "fixed", width: 600, height: 600, borderRadius: "50%",
    filter: "blur(130px)", pointerEvents: "none", zIndex: 0,
    background: color, ...pos,
  });

  // ─── INTRO ───────────────────────────────────────────────────────────────
  if (step === "intro") return (
    <div style={base}>
      <div style={glow("rgba(110,231,183,0.04)", { top: -200, left: -200 })} />
      <div style={glow("rgba(147,197,253,0.04)", { bottom: -200, right: -200 })} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 560, width: "100%", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "6px 16px", background: "rgba(110,231,183,0.08)", border: "1px solid rgba(110,231,183,0.2)", borderRadius: 40, marginBottom: 32 }}>
          <span style={{ color: "#6EE7B7", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>Diagnóstico de Nivel IA</span>
        </div>
        <h1 style={{ color: "#F8FAFC", fontSize: "clamp(28px,5vw,44px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
          ¿Qué tan listo estás para<br /><span style={{ color: "#6EE7B7" }}>trabajar con IA?</span>
        </h1>
        <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.7, margin: "0 auto 32px", maxWidth: 420 }}>
          Este diagnóstico nos permite entender tu perfil real y diseñar un programa de clases con impacto desde la primera sesión.
        </p>
        <input
          placeholder="Tu nombre (opcional)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ width: "100%", maxWidth: 320, padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#E2E8F0", fontSize: 14, marginBottom: 32, outline: "none", boxSizing: "border-box" }}
        />
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          {[{ icon: "◈", label: "12 preguntas" }, { icon: "⏱", label: "5-8 minutos" }, { icon: "◆", label: "Resultado inmediato" }].map((t) => (
            <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8 }}>
              <span style={{ color: "#6EE7B7", fontSize: 14 }}>{t.icon}</span>
              <span style={{ color: "#CBD5E1", fontSize: 13 }}>{t.label}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setStep("quiz")} style={{ padding: "16px 48px", background: "linear-gradient(135deg,#6EE7B7,#93C5FD)", border: "none", borderRadius: 12, color: "#0F172A", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 40px rgba(110,231,183,0.2)" }}>
          Comenzar diagnóstico →
        </button>
        <p style={{ color: "#475569", fontSize: 12, marginTop: 20 }}>Sin registro. Sin datos personales obligatorios.</p>
      </div>
    </div>
  );

  // ─── QUIZ ─────────────────────────────────────────────────────────────────
  if (step === "quiz") {
    const blockColor = q.block === "Contexto profesional" ? "#6EE7B7" : q.block === "Uso actual de IA" ? "#93C5FD" : q.block === "Herramientas IA" ? "#FCD34D" : q.block === "Aplicación al negocio" ? "#F9A8D4" : "#C4B5FD";
    const hasAnswer = (answers[q.id] || []).length > 0;
    const pctQ = Math.round(((currentQ + 1) / questions.length) * 100);

    return (
      <div style={base}>
        <div style={glow(`${blockColor}08`, { top: -200, left: -200 })} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, width: "100%", opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.22s,transform 0.22s" }}>
          {/* Progress */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#94A3B8", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Pregunta {currentQ + 1} de {questions.length}</span>
              <span style={{ color: "#E2E8F0", fontSize: 12, fontWeight: 600 }}>{pctQ}%</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pctQ}%`, background: "linear-gradient(90deg,#6EE7B7,#93C5FD)", borderRadius: 2, transition: "width 0.4s" }} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <span style={{ color: blockColor, fontSize: 16 }}>{q.blockIcon}</span>
            <span style={{ color: blockColor, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>{q.block}</span>
          </div>

          <h2 style={{ color: "#F8FAFC", fontSize: "clamp(18px,3vw,24px)", fontWeight: 600, lineHeight: 1.35, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{q.question}</h2>
          {isMulti && <p style={{ color: "#64748B", fontSize: 13, margin: "0 0 28px" }}>Puedes seleccionar múltiples opciones</p>}
          {!isMulti && <div style={{ marginBottom: 28 }} />}

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map((opt) => {
              const sel = isSelected(opt.label);
              return (
                <button key={opt.label} onClick={() => isMulti ? handleMulti(opt.score, opt.label) : handleSingle(opt.score, opt.label)}
                  style={{ padding: "14px 18px", background: sel ? `${blockColor}12` : "rgba(255,255,255,0.03)", border: `1.5px solid ${sel ? `${blockColor}60` : "rgba(255,255,255,0.07)"}`, borderRadius: 10, color: sel ? "#F8FAFC" : "#94A3B8", fontSize: 14, textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.15s", lineHeight: 1.5 }}>
                  <span style={{ width: 18, height: 18, borderRadius: isMulti ? 4 : "50%", border: `2px solid ${sel ? blockColor : "rgba(255,255,255,0.2)"}`, background: sel ? blockColor : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {sel && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </span>
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
            <button onClick={prev} style={{ padding: "10px 20px", background: "transparent", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#64748B", fontSize: 14, cursor: currentQ === 0 ? "not-allowed" : "pointer", opacity: currentQ === 0 ? 0.4 : 1 }}>← Anterior</button>
            <button onClick={next} disabled={!hasAnswer} style={{ padding: "12px 32px", background: hasAnswer ? `linear-gradient(135deg,${blockColor},#93C5FD)` : "rgba(255,255,255,0.06)", border: "none", borderRadius: 8, color: hasAnswer ? "#0F172A" : "#475569", fontSize: 14, fontWeight: 700, cursor: hasAnswer ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
              {saving ? "Guardando..." : currentQ === questions.length - 1 ? "Ver mi resultado →" : "Siguiente →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULT ───────────────────────────────────────────────────────────────
  return (
    <div style={base}>
      <div style={glow(`${level.color}06`, { top: -200, left: -200 })} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 680, width: "100%" }}>
        {/* Header */}
        <div style={{ padding: "40px", background: level.bg, border: `1px solid ${level.border}`, borderRadius: 20, marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16, color: level.color }}>{level.icon}</div>
          <div style={{ display: "inline-block", padding: "4px 14px", background: `${level.color}14`, border: `1px solid ${level.color}40`, borderRadius: 40, marginBottom: 16 }}>
            <span style={{ color: level.color, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Nivel {level.id} — {level.name}</span>
          </div>
          <h2 style={{ color: "#F8FAFC", fontSize: "clamp(22px,4vw,34px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
            Tu perfil IA es <span style={{ color: level.color }}>{level.name}</span>
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 24px" }}>{level.description}</p>
          <div style={{ maxWidth: 320, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#64748B", fontSize: 12 }}>Puntaje obtenido</span>
              <span style={{ color: level.color, fontSize: 12, fontWeight: 700 }}>{totalScore} pts — {pct}%</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${level.color},#93C5FD)`, borderRadius: 3 }} />
            </div>
          </div>
          {saved && (
            <div style={{ marginTop: 20, padding: "8px 16px", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.2)", borderRadius: 8, display: "inline-block" }}>
              <span style={{ color: "#6EE7B7", fontSize: 13 }}>✓ Resultado guardado correctamente</span>
            </div>
          )}
        </div>

        {/* Plan */}
        <div style={{ padding: "32px 40px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <h3 style={{ color: "#F8FAFC", fontSize: 18, fontWeight: 600, margin: 0 }}>Plan de clases recomendado</h3>
            <div style={{ display: "flex", gap: 8 }}>
              {[`${level.sessions} sesiones`, level.duration].map((t) => (
                <span key={t} style={{ padding: "4px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, color: "#94A3B8", fontSize: 12 }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {level.program.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: level.color, fontSize: 11, fontWeight: 700, minWidth: 28, paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "24px 32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "#E2E8F0", fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>¿Listo para empezar?</p>
            <p style={{ color: "#64748B", fontSize: 13, margin: 0 }}>Comparte este resultado con tu instructor para agendar la primera sesión.</p>
          </div>
          <button onClick={reset} style={{ padding: "10px 24px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#94A3B8", fontSize: 13, cursor: "pointer" }}>Reiniciar</button>
        </div>
      </div>
    </div>
  );
}
