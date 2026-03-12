"use client";

import { useState } from "react";
import Link from "next/link";

const forumCategories = [
  { id: 1, name: "General", slug: "general", icon: "💬", desc: "Todo sobre jardinería", color: "#1B4332" },
  { id: 2, name: "Composta Casera", slug: "composta", icon: "🌱", desc: "Tips y técnicas de compostaje", color: "#4F772D" },
  { id: 3, name: "Plagas y Enfermedades", slug: "plagas", icon: "🐛", desc: "Identificación y control", color: "#BC4749" },
  { id: 4, name: "Propagación", slug: "propagacion", icon: "✂️", desc: "Reproduce tus plantas", color: "#2D6A4F" },
  { id: 5, name: "Cosechas", slug: "cosechas", icon: "🥬", desc: "Comparte tus logros", color: "#D4A373" },
];

const recentPosts = [
  { id: 1, title: "Mi primera composta casera - ¡Funciona!", author: "JuanGarcia", replies: 23, views: 456, category: "composta", pinned: true },
  { id: 2, title: "¿Cómo identificar deficiency de nitrógeno?", author: "MariaPlants", replies: 12, views: 234, category: "plagas" },
  { id: 3, title: "Propagación de pothos en agua - Guía completa", author: "GreenThumb", replies: 45, views: 890, category: "propagacion" },
  { id: 4, title: "Coseché mis primeros tomates cherry", author: "HuertoUrbano", replies: 67, views: 1200, category: "cosechas" },
  { id: 5, title: "Ayuda con mi monstera - hojas amarillas", author: "NuevoJardinero", replies: 8, views: 156, category: "general" },
];

export default function ForumsPage() {
  const [search, setSearch] = useState("");

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
        <Link href="/" style={{ color: '#1B4332', textDecoration: 'none', fontWeight: '600' }}>← Volver</Link>
      </header>

      <main style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#1B4332', marginBottom: '0.5rem' }}>
          💬 Foros de la Comunidad
        </h1>
        <p style={{ color: '#6B705C', marginBottom: '2rem' }}>
          Comparte tips, preguntas y experiencias con otros jardineros
        </p>

        {/* Buscador */}
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="🔍 Buscar en foros..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Categorías */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {forumCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/forums/${cat.slug}`}
              style={{
                background: 'white',
                padding: '1.25rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#1B4332', margin: 0 }}>{cat.name}</h3>
              <p style={{ color: '#6B705C', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>{cat.desc}</p>
            </Link>
          ))}
        </div>

        {/* Posts recientes */}
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#1B4332', marginBottom: '1rem' }}>
          📝 Posts Recientes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {recentPosts
            .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
            .map((post) => (
            <Link
              key={post.id}
              href={`/forums/post/${post.id}`}
              style={{
                background: 'white',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                {post.pinned && <span style={{ background: '#E9C46A', padding: '0.125rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', marginRight: '0.5rem' }}>📌</span>}
                <h3 style={{ display: 'inline', fontSize: '1rem', color: '#1B4332', fontWeight: '500' }}>{post.title}</h3>
                <p style={{ color: '#6B705C', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
                  👤 {post.author}
                </p>
              </div>
              <div style={{ textAlign: 'right', color: '#6B705C', fontSize: '0.8rem' }}>
                <div>💬 {post.replies}</div>
                <div>👁 {post.views}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Nuevo post */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/forums/new" style={primaryButtonStyle}>
            ➕ Crear Nuevo Post
          </Link>
        </div>
      </main>
    </div>
  );
}

const primaryButtonStyle: React.CSSProperties = {
  background: '#D4A373',
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '12px',
  textDecoration: 'none',
  fontWeight: '600',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem'
};
