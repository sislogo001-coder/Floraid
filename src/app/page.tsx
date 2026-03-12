"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(rgba(135, 206, 235, 0.85), rgba(176, 224, 230, 0.9)), url('https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=1920&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      {/* Marco naranja */}
      <div style={{
        position: 'absolute',
        inset: '15px',
        border: '4px solid #E76F51',
        borderRadius: '24px',
        pointerEvents: 'none',
        boxShadow: '0 0 40px rgba(231, 111, 81, 0.4)'
      }} />

      {/* Header */}
      <header style={{
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            boxShadow: '0 6px 20px rgba(231, 111, 81, 0.5)'
          }}>
            🌿
          </div>
          <span style={{
            fontFamily: 'Georgia, serif',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1B4332',
            textShadow: '0 2px 8px rgba(255,255,255,0.8)'
          }}>
            FloraID
          </span>
        </div>
        <nav style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { href: "/identify", label: "Identificar" },
            { href: "/garden", label: "Mi Jardín" },
            { href: "/calendar", label: "Calendario" },
            { href: "/forums", label: "Foros" }
          ].map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              style={{
                background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: '700',
                padding: '0.7rem 1.3rem',
                borderRadius: '12px',
                fontSize: '0.95rem',
                boxShadow: '0 4px 15px rgba(27, 67, 50, 0.4)',
                border: '2px solid white'
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero Section */}
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          fontWeight: 'bold',
          color: '#1B4332',
          marginBottom: '1.5rem',
          lineHeight: 1.1,
          textShadow: '0 4px 12px rgba(255,255,255,0.9)',
          WebkitTextStroke: '1.5px white'
        }}>
          Descubre el mundo de<br/>
          <span style={{ color: '#E76F51', WebkitTextStroke: '1.5px white' }}>tus plantas</span>
        </h1>
        
        <p style={{
          fontSize: '1.4rem',
          color: '#1B4332',
          marginBottom: '3rem',
          maxWidth: '620px',
          margin: '0 auto 3rem',
          fontWeight: '600',
          textShadow: '0 1px 4px rgba(255,255,255,0.8)'
        }}>
          Identifica instantáneamente plantas, flores y frutos.
          Aprende sobre nombres científicos de tu región.
        </p>

        {/* BOTÓN PRINCIPAL HUGE Y LLAMATIVO */}
        <div style={{ marginBottom: '4rem' }}>
          <Link 
            href="/identify" 
            style={{
              background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 50%, #E9C46A 100%)',
              color: 'white',
              padding: '2rem 5rem',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.8rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.2rem',
              boxShadow: '0 12px 40px rgba(231, 111, 81, 0.6), 0 6px 20px rgba(0,0,0,0.2), inset 0 2px 10px rgba(255,255,255,0.3)',
              border: '5px solid white',
              animation: 'pulse 2s infinite'
            }}
          >
            📷 Identificar Planta
          </Link>
        </div>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem'
        }}>
          {[
            { icon: '🔍', title: 'Identificación IA', desc: 'Sube una foto y descubre tu planta' },
            { icon: '📚', title: 'Nombres Científicos', desc: 'Nombre común y científico regional' },
            { icon: '💧', title: 'Calendario de Riego', desc: 'Program recordatorios de cuidado' },
            { icon: '🌱', title: 'Composta Casera', desc: 'Tips de la comunidad' }
          ].map((feature, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(15px)',
              borderRadius: '20px',
              padding: '1.75rem',
              border: '4px solid #E76F51',
              boxShadow: '0 10px 30px rgba(231, 111, 81, 0.3)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#1B4332',
                marginBottom: '0.4rem'
              }}>
                {feature.title}
              </h3>
              <p style={{ color: '#6B705C', fontSize: '0.9rem', margin: 0 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '4rem',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(15px)',
          borderRadius: '24px',
          padding: '2.5rem',
          border: '4px solid #E76F51'
        }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '2rem',
            color: '#1B4332',
            marginBottom: '1rem'
          }}>
            ¿Listo para empezar?
          </h2>
          <p style={{ color: '#6B705C', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Únete a miles de jardineros que ya usan FloraID
          </p>
          <Link href="/identify" style={{
            background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 100%)',
            color: 'white',
            padding: '1rem 2.5rem',
            borderRadius: '14px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 6px 20px rgba(231, 111, 81, 0.4)'
          }}>
            🚀 Comenzar Gratis
          </Link>
        </div>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#1B4332',
        fontSize: '1rem',
        position: 'relative',
        zIndex: 10,
        fontWeight: '600',
        textShadow: '0 1px 4px rgba(255,255,255,0.8)'
      }}>
        © 2024 FloraID. Todos los derechos reservados.
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
}
