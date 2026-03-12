"use client";

import { useState } from "react";
import Link from "next/link";

const examplePlants = [
  { id: 1, name: "Mi Monstera", scientific: "Monstera deliciosa", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400", needsWater: true, location: "Sala" },
  { id: 2, name: "Pothos Dorado", scientific: "Epipremnum aureum", image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400", needsWater: false, location: "Dormitorio" },
  { id: 3, name: "Lila", scientific: "Spathiphyllum wallisii", image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400", needsWater: true, location: "Cocina" },
];

export default function GardenPage() {
  const [plants, setPlants] = useState(examplePlants);

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#1B4332', margin: 0 }}>
              🏡 Mi Jardín
            </h1>
            <p style={{ color: '#6B705C', margin: '0.25rem 0 0' }}>
              {plants.length} plantas en tu colección
            </p>
          </div>
          <Link href="/identify" style={primaryButtonStyle}>
            ➕ Agregar Planta
          </Link>
        </div>

        {plants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '16px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌱</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#1B4332' }}>Tu jardín está vacío</h2>
            <p style={{ color: '#6B705C', marginBottom: '1.5rem' }}>Agrega tu primera planta</p>
            <Link href="/identify" style={primaryButtonStyle}>
              Identificar Planta
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {plants.map((plant) => (
              <div key={plant.id} style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <div style={{ position: 'relative', aspectRatio: '1' }}>
                  <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {plant.needsWater && (
                    <div style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      background: '#3498db',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      💧 Riega
                    </div>
                  )}
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#1B4332', margin: 0 }}>
                    {plant.name}
                  </h3>
                  <p style={{ color: '#6B705C', fontSize: '0.85rem', fontStyle: 'italic', margin: '0.25rem 0 0.5rem' }}>
                    {plant.scientific}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6B705C', fontSize: '0.8rem' }}>📍 {plant.location}</span>
                    <button style={{ background: '#1B4332', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendario */}
        <div style={{ marginTop: '3rem', background: 'white', borderRadius: '16px', padding: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#1B4332', marginBottom: '1rem' }}>
            📅 Próximas Tareas
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { plant: "Mi Monstera", task: "💧 Riego", date: "Hoy", urgent: true },
              { plant: "Lila", task: "💧 Riego", date: "Mañana", urgent: false },
              { plant: "Todas", task: "🌱 Composta", date: "En 5 días", urgent: false },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: item.urgent ? '#fff5f5' : '#f5f5f5',
                borderRadius: '10px',
                borderLeft: `4px solid ${item.urgent ? '#BC4749' : '#4F772D'}`
              }}>
                <div>
                  <strong style={{ color: '#1B4332' }}>{item.plant}</strong>
                  <span style={{ color: '#6B705C', marginLeft: '0.5rem' }}>{item.task}</span>
                </div>
                <span style={{ color: item.urgent ? '#BC4749' : '#6B705C', fontWeight: '500' }}>
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const primaryButtonStyle: React.CSSProperties = {
  background: '#1B4332',
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: '600',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem'
};
