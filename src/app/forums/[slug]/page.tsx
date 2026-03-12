"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: 1, name: "General", slug: "general", icon: "💬", desc: "Todo sobre jardinería", color: "#1B4332" },
  { id: 2, name: "Composta Casera", slug: "composta", icon: "🌱", desc: "Tips y técnicas de compostaje", color: "#4F772D" },
  { id: 3, name: "Plagas y Enfermedades", slug: "plagas", icon: "🐛", desc: "Identificación y control", color: "#BC4749" },
  { id: 4, name: "Propagación", slug: "propagacion", icon: "✂️", desc: "Reproduce tus plantas", color: "#2D6A4F" },
  { id: 5, name: "Cosechas", slug: "cosechas", icon: "🥬", desc: "Comparte tus logros", color: "#D4A373" },
];

const postsByCategory: Record<string, any[]> = {
  general: [
    { id: 1, title: "Ayuda con mi monstera - hojas amarillas", author: "NuevoJardinero", replies: 8, views: 156, date: "Hoy" },
    { id: 2, title: "Mejor época para trasplantar", author: "JuanGarcia", replies: 15, views: 320, date: "Ayer" },
    { id: 3, title: "Abono orgánico casero", author: "MariaPlants", replies: 22, views: 450, date: "Hace 2 días" },
  ],
  composta: [
    { id: 1, title: "Mi primera composta casera - ¡Funciona!", author: "JuanGarcia", replies: 23, views: 456, date: "Hoy", pinned: true },
    { id: 2, title: "Composta de café - Tutorial", author: "GreenThumb", replies: 34, views: 678, date: "Ayer" },
    { id: 3, title: "¿Cuánto tiempo tarda en estar lista?", author: "NuevoJardinero", replies: 12, views: 234, date: "Hace 3 días" },
  ],
  plagas: [
    { id: 1, title: "¿Cómo identificar deficiencia de nitrógeno?", author: "MariaPlants", replies: 12, views: 234, date: "Hoy" },
    { id: 2, title: "Mi planta tiene pulgones - ayuda", author: "HuertoUrbano", replies: 18, views: 345, date: "Ayer" },
    { id: 3, title: "Remedios caseros para cochinillas", author: "GreenThumb", replies: 25, views: 567, date: "Hace 2 días" },
  ],
  propagacion: [
    { id: 1, title: "Propagación de pothos en agua - Guía completa", author: "GreenThumb", replies: 45, views: 890, date: "Hoy" },
    { id: 2, title: "Cómo reproducir suculentas por hojas", author: "MariaPlants", replies: 28, views: 456, date: "Ayer" },
    { id: 3, title: "División de matas - Tutorial", author: "JuanGarcia", replies: 19, views: 345, date: "Hace 3 días" },
  ],
  cosechas: [
    { id: 1, title: "Coseché mis primeros tomates cherry", author: "HuertoUrbano", replies: 67, views: 1200, date: "Hoy", pinned: true },
    { id: 2, title: "Mi primera cosecha de maíz", author: "NuevoJardinero", replies: 34, views: 567, date: "Ayer" },
    { id: 3, title: "Consejos para cultivar chile", author: "JuanGarcia", replies: 42, views: 789, date: "Hace 2 días" },
  ],
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find(c => c.slug === params.slug) || categories[0];
  const posts = postsByCategory[params.slug] || postsByCategory.general;

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

      <main style={{ padding: '2rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
        {/* Categoría */}
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '2rem', 
          marginBottom: '2rem',
          border: '4px solid #F4A261',
          boxShadow: '0 8px 25px rgba(244, 162, 97, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '4rem' }}>{category.icon}</div>
            <div>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#1B4332', margin: 0 }}>
                {category.name}
              </h1>
              <p style={{ color: '#6B705C', margin: '0.5rem 0 0' }}>{category.desc}</p>
            </div>
          </div>
        </div>

        {/* Posts */}
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#1B4332', marginBottom: '1rem' }}>
          📝 Posts en {category.name}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {posts.map((post) => (
            <div key={post.id} style={{
              background: 'white',
              padding: '1.25rem',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              border: '2px solid #F4A261'
            }}>
              {post.pinned && (
                <span style={{ background: '#E9C46A', padding: '0.125rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', marginRight: '0.5rem' }}>
                  📌 Fijado
                </span>
              )}
              <h3 style={{ display: 'inline', fontSize: '1.1rem', color: '#1B4332', fontWeight: '600' }}>
                {post.title}
              </h3>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', color: '#6B705C', fontSize: '0.9rem' }}>
                <span>👤 {post.author}</span>
                <span>💬 {post.replies}</span>
                <span>👁 {post.views}</span>
                <span>📅 {post.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Nuevo post */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/forums/new" style={{
            background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 100%)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 15px rgba(231, 111, 81, 0.4)'
          }}>
            ➕ Crear Nuevo Post
          </Link>
        </div>
      </main>
    </div>
  );
}
