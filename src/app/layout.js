export const metadata = {
  title: "Diagnóstico IA — ¿Cuál es tu nivel?",
  description: "Descubre tu nivel de conocimiento en Inteligencia Artificial y obtén un plan de clases personalizado.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
