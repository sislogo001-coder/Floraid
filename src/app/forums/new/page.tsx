"use client";

import { useState } from "react";
import Link from "next/link";

const forumCategories = [
  { id: 1, name: "General", slug: "general", icon: "💬" },
  { id: 2, name: "Composta Casera", slug: "composta", icon: "🌱" },
  { id: 3, name: "Plagas y Enfermedades", slug: "plagas", icon: "🐛" },
  { id: 4, name: "Propagación", slug: "propagacion", icon: "✂️" },
  { id: 5, name: "Cosechas", slug: "cosechas", icon: "🥬" },
];

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");

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

      <main style={{ padding: '2rem 1rem', maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#1B4332', marginBottom: '1.5rem' }}>
          ➕ Crear Nuevo Post
        </h1>

        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', border: '4px solid #F4A261' }}>
          {/* Categoría */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', color: '#1B4332', marginBottom: '0.5rem' }}>
              Categoría
            </label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid #F4A261',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              {forumCategories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', color: '#1B4332', marginBottom: '0.5rem'            </label>
 }}>
              Título
            <input
              type="text"
              placeholder="Título de tu post..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid #F4A261',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Contenido */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', color: '#1B4332', marginBottom: '0.5rem' }}>
              Contenido
            </label>
            <textarea
              placeholder="Escribe tu post..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid #F4A261',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Botón */}
          <button style={{
            width: '100%',
            background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 100%)',
            color: 'white',
            padding: '1rem',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(231, 111, 81, 0.4)'
          }}>
            📤 Publicar Post
          </button>
        </div>
      </main>
    </div>
  );
}
