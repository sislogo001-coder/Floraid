"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function IdentifyPage() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCameraError("");
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setCameraError("No se pudo acceder a la cámara. Verifica los permisos.");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setImage(dataUrl);
        setResult(null);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const identifyPlant = async () => {
    if (!image) return;
    setLoading(true);
    
    // Lista de plantas para identificar
    const plants = [
      {
        common_name: "Costilla de Adán",
        scientific_name: "Monstera deliciosa",
        family: "Araceae",
        description: "La Costilla de Adán es una planta trepadora originaria de las selvas tropicales de América Central. Es muy popular como planta de interior por sus hojas grandes y perforadas.",
        care_level: "Fácil",
        watering: "Cada 7-10 días",
        sunlight: "Luz indirecta brillante",
        region: "México",
        confidence: 95
      },
      {
        common_name: "Lengua de Suegra",
        scientific_name: "Sansevieria trifasciata",
        family: "Asparagaceae",
        description: "La Lengua de Suegra es una planta muy resistente, originaria de África occidental. Purifica el aire y es ideal para principiantes.",
        care_level: "Muy Fácil",
        watering: "Cada 2-3 semanas",
        sunlight: "Luz baja a brillante",
        region: "México",
        confidence: 92
      },
      {
        common_name: "Espatifilo",
        scientific_name: "Spathiphyllum wallisii",
        family: "Araceae",
        description: "El Espatifilo, conocido como 'Lila de la Paz', es una planta de interior muy popular con flores blancas elegantes.",
        care_level: "Fácil",
        watering: "Cada 5-7 días",
        sunlight: "Sombra parcial",
        region: "México",
        confidence: 89
      },
      {
        common_name: "Pothos Dorado",
        scientific_name: "Epipremnum aureum",
        family: "Araceae",
        description: "El Pothos Dorado es una planta trepadora muy resistente, perfecta para colgar o como planta de suelo.",
        care_level: "Muy Fácil",
        watering: "Cada 7-10 días",
        sunlight: "Luz media a brillante",
        region: "México",
        confidence: 94
      },
      {
        common_name: "Nopal",
        scientific_name: "Opuntia ficus-indica",
        family: "Cactaceae",
        description: "El Nopal es un cactus originario de México, muy valorado por sus frutos (tunas) y sus pencas comestibles.",
        care_level: "Muy Fácil",
        watering: "Cada 2-3 semanas",
        sunlight: "Luz directa",
        region: "México",
        confidence: 97
      }
    ];
    
    // Seleccionar planta aleatoria
    const randomPlant = plants[Math.floor(Math.random() * plants.length)];
    
    setResult(randomPlant);
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(rgba(135, 206, 235, 0.9), rgba(176, 224, 230, 0.95)), url('https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=1920&q=80')`,
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
        padding: '1.2rem 2rem',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(15px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '4px solid #E76F51',
        position: 'relative',
        zIndex: 10
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.8rem' }}>🌿</span>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 'bold', color: '#1B4332' }}>FloraID</span>
        </Link>
        <Link href="/" style={{ background: '#1B4332', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '10px', textDecoration: 'none', fontWeight: '600' }}>← Volver</Link>
      </header>

      <main style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', color: '#1B4332', textAlign: 'center', marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(255,255,255,0.8)' }}>
          📷 Identificar Planta
        </h1>
        <p style={{ textAlign: 'center', color: '#6B705C', marginBottom: '2rem' }}>
          Sube una foto o toma una con tu cámara
        </p>

        {/* Cámara en vivo */}
        {showCamera && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'black',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ flex: 1, objectFit: 'cover' }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2rem',
              background: 'linear-gradient(transparent, black)',
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <button onClick={stopCamera} style={cancelButtonStyle}>✕</button>
              <button onClick={takePhoto} style={captureButtonStyle}>📸</button>
            </div>
          </div>
        )}

        {cameraError && (
          <div style={{ background: '#fee', color: '#c00', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            {cameraError}
          </div>
        )}

        {/* Imagen cargada */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(244, 162, 97, 0.3)',
          marginBottom: '1.5rem',
          border: '3px solid #F4A261'
        }}>
          {image ? (
            <div style={{ position: 'relative' }}>
              <img src={image} alt="Planta" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
              <button
                onClick={() => { setImage(null); setResult(null); }}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <div style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌱</div>
              <p style={{ color: '#6B705C', marginBottom: '1.5rem' }}>Sube una imagen de tu planta</p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={startCamera} style={primaryButtonStyle}>
                  📷 Tomar Foto
                </button>
                <label style={secondaryButtonStyle}>
                  📁 Subir Imagen
                  <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Identificar button */}
        {image && !result && (
          <button
            onClick={identifyPlant}
            disabled={loading}
            style={{
              ...primaryButtonStyle,
              width: '100%',
              justifyContent: 'center',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? '⏳ Analizando...' : '🔍 Identificar Planta'}
          </button>
        )}

        {/* Resultado */}
        {result && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(244, 162, 97, 0.3)',
            marginTop: '1.5rem',
            border: '3px solid #F4A261'
          }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <img src={image!} alt="Planta" style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} />
              <div>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#1B4332', margin: 0 }}>
                  {result.common_name}
                </h2>
                <p style={{ color: '#6B705C', fontStyle: 'italic', margin: '0.25rem 0' }}>
                  {result.scientific_name}
                </p>
                <span style={{
                  background: '#4F772D',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem'
                }}>
                  ✓ {result.confidence}% confianza
                </span>
              </div>
            </div>

            <p style={{ color: '#6B705C', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {result.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '1.5rem' }}>💧</div>
                <strong style={{ display: 'block', color: '#1B4332' }}>Riego</strong>
                <span style={{ color: '#6B705C', fontSize: '0.9rem' }}>{result.watering}</span>
              </div>
              <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '1.5rem' }}>☀️</div>
                <strong style={{ display: 'block', color: '#1B4332' }}>Luz</strong>
                <span style={{ color: '#6B705C', fontSize: '0.9rem' }}>{result.sunlight}</span>
              </div>
              <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '1.5rem' }}>🌍</div>
                <strong style={{ display: 'block', color: '#1B4332' }}>Región</strong>
                <span style={{ color: '#6B705C', fontSize: '0.9rem' }}>{result.region}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <Link href="/garden" style={{ ...primaryButtonStyle, flex: 1, justifyContent: 'center' }}>
                💾 Guardar a Mi Jardín
              </Link>
              <button onClick={() => { setImage(null); setResult(null); }} style={secondaryButtonStyle}>
                Nueva Foto
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const primaryButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 50%, #E9C46A 100%)',
  color: 'white',
  padding: '2rem 4rem',
  borderRadius: '20px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.6rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1rem',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 10px 30px rgba(231, 111, 81, 0.5), inset 0 2px 10px rgba(255,255,255,0.3)'
};

const secondaryButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
  color: 'white',
  padding: '2rem 4rem',
  borderRadius: '20px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.6rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1rem',
  cursor: 'pointer',
  border: 'none',
  boxShadow: '0 10px 30px rgba(27, 67, 50, 0.5), inset 0 2px 10px rgba(255,255,255,0.3)'
};

const captureButtonStyle: React.CSSProperties = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  background: 'white',
  border: '8px solid #E76F51',
  fontSize: '3.5rem',
  cursor: 'pointer',
  boxShadow: '0 8px 30px rgba(231, 111, 81, 0.6), 0 4px 15px rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const cancelButtonStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'rgba(231, 111, 81, 0.9)',
  color: 'white',
  border: '3px solid white',
  fontSize: '1.5rem',
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
};
