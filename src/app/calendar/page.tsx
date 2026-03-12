"use client";

import { useState } from "react";
import Link from "next/link";

const events = [
  { id: 1, plant: "Monstera", type: "water", date: "2024-01-15", done: false },
  { id: 2, plant: "Pothos", type: "water", date: "2024-01-16", done: false },
  { id: 3, plant: "Todas", type: "compost", date: "2024-01-20", done: false },
  { id: 4, plant: "Lila", type: "water", date: "2024-01-14", done: true },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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

      <main style={{ padding: '2rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#1B4332', marginBottom: '0.5rem' }}>
          📅 Calendario de Cuidado
        </h1>
        <p style={{ color: '#6B705C', marginBottom: '2rem' }}>
          Programa recordatorios de riego y composta
        </p>

        {/* Calendario */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          {/* Mes */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '0.5rem' }}
            >
              ←
            </button>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#1B4332', margin: 0 }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '0.5rem' }}
            >
              →
            </button>
          </div>

          {/* Días */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', color: '#6B705C', padding: '0.5rem' }}>
                {day}
              </div>
            ))}
            {Array(firstDay).fill(null).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const day = i + 1;
              const hasEvent = events.some(e => new Date(e.date).getDate() === day);
              return (
                <div key={day} style={{
                  aspectRatio: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  background: hasEvent ? '#e8f5e9' : 'transparent',
                  position: 'relative'
                }}>
                  <span style={{ fontSize: '0.9rem', color: '#1B4332' }}>{day}</span>
                  {hasEvent && <span style={{ fontSize: '0.7rem' }}>💧</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Leyenda */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: '#3498db', width: '12px', height: '12px', borderRadius: '3px' }}></span>
            <span style={{ color: '#6B705C' }}>Riego</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: '#4F772D', width: '12px', height: '12px', borderRadius: '3px' }}></span>
            <span style={{ color: '#6B705C' }}>Composta</span>
          </div>
        </div>

        {/* Eventos */}
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', color: '#1B4332', marginBottom: '1rem' }}>
          📋 Próximas Tareas
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {events.map((event) => (
            <div key={event.id} style={{
              background: 'white',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: `4px solid ${event.type === 'water' ? '#3498db' : '#4F772D'}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{event.type === 'water' ? '💧' : '🌱'}</span>
                <div>
                  <strong style={{ color: '#1B4332' }}>{event.plant}</strong>
                  <p style={{ color: '#6B705C', margin: 0, fontSize: '0.9rem' }}>
                    {event.type === 'water' ? 'Riego' : 'Aplicar composta'}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ 
                  color: event.done ? '#4F772D' : '#6B705C',
                  fontWeight: event.done ? 'bold' : 'normal'
                }}>
                  {event.done ? '✓ Hecho' : new Date(event.date).toLocaleDateString('es')}
                </span>
                {!event.done && (
                  <button style={{
                    background: '#1B4332',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}>
                    Marcar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
