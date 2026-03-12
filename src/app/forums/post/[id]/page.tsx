"use client";

import { useState } from "react";
import Link from "next/link";

const postsData: Record<string, any> = {
  1: {
    id: 1,
    title: "Mi primera composta casera - ¡Funciona!",
    author: "JuanGarcia",
    date: "15 de Enero, 2024",
    content: "Despues de varios meses de prueba, finalmente logré hacer composta en casa. Aqui les comparto mi experiencia:\n\n1. Necesitas una compostera o un tambo\n2. Mezcla restos de cocina (vegetales) con hojas secas\n3. Remueve cada semana\n4. En 2-3 meses tendras composta lista\n\nAny questions?",
    replies: 23,
    views: 456,
    category: "composta"
  },
  2: {
    id: 2,
    title: "¿Cómo identificar deficiencia de nitrógeno?",
    author: "MariaPlants",
    date: "14 de Enero, 2024",
    content: "Mi tomato tiene las hojas amarillas. Alguno sabe si es falta de nitrogeno? Como puedo identificarlo?",
    replies: 12,
    views: 234,
    category: "plagas"
  },
  3: {
    id: 3,
    title: "Propagación de pothos en agua - Guía completa",
    author: "GreenThumb",
    date: "13 de Enero, 2024",
    content: "Les enseno como propagar pothos facilmente:\n\n1. Corta un tallo con 2-3 nodos\n2. Ponlo en un vaso con agua\n3. Cambia el agua cada semana\n4. En 2-3 semanas tendras raices\n\nFacil!",
    replies: 45,
    views: 890,
    category: "propagacion"
  },
  4: {
    id: 4,
    title: "Coseché mis primeros tomates cherry",
    author: "HuertoUrbano",
    date: "12 de Enero, 2024",
    content: "Despues de 4 meses de trabajo, por fin coseche mis primeros tomates! Son pequenos pero deliciosos. Les ire mostrando mi progreso.",
    replies: 67,
    views: 1200,
    category: "cosechas"
  },
  5: {
    id: 5,
    title: "Ayuda con mi monstera - hojas amarillas",
    author: "NuevoJardinero",
    date: "Hoy",
    content: "Tengo mi monstera hace 3 meses y le estan saliendo hojas amarillas. Que puedo hacer? Esta en interior con luz indirecta.",
    replies: 8,
    views: 156,
    category: "general"
  }
};

export default function PostPage({ params }: { params: { id: string } }) {
  const post = postsData[params.id] || postsData[1];
  const [reply, setReply] = useState("");

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #E0F4FF 0%, #B8E0F4 100%)' }}>
      {/* Marco naranja */}
      <div style={{
        position: 'absolute',
        inset: '15px',
        border: '3px solid #F4A261',
        borderRadius: '20px',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <header style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.9)', borderBottom: '3px solid #F4A261', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.5rem' }}>🌿</span>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', fontWeight: 'bold', color: '#1B4332' }}>FloraID</span>
        </Link>
        <Link href="/forums" style={{ color: '#1B4332', textDecoration: 'none', fontWeight: '600' }}>← Volver</Link>
      </header>

      <main style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        {/* Post principal */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', border: '4px solid #F4A261', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', color: '#1B4332', margin: '0 0 1rem' }}>
            {post.title}
          </h1>
          
          <div style={{ display: 'flex', gap: '1rem', color: '#6B705C', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            <span>👤 {post.author}</span>
            <span>📅 {post.date}</span>
            <span>👁 {post.views} vistas</span>
          </div>

          <div style={{ lineHeight: 1.8, color: '#1B4332', whiteSpace: 'pre-line' }}>
            {post.content}
          </div>
        </div>

        {/* Respuestas */}
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#1B4332', marginBottom: '1rem' }}>
          💬 Respuestas ({post.replies})
        </h2>

        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '2px solid #F4A261', marginBottom: '1.5rem' }}>
          <p style={{ color: '#6B705C', textAlign: 'center' }}>
            ¡Sé el primero en comentar!
          </p>
        </div>

        {/* Escribir respuesta */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '4px solid #F4A261' }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#1B4332', marginBottom: '1rem' }}>
            Escribir respuesta
          </h3>
          <textarea
            placeholder="Escribe tu comentario..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '10px',
              border: '2px solid #F4A261',
              fontSize: '1rem',
              resize: 'vertical',
              marginBottom: '1rem'
            }}
          />
          <button style={{
            background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 100%)',
            color: 'white',
            padding: '0.8rem 2rem',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
          }}>
            📤 Enviar
          </button>
        </div>
      </main>
    </div>
  );
}
