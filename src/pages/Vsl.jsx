const pains = [
  'Grabas vídeos sin estrategia y nadie los ve.',
  'Tus anuncios cuestan cada vez más y convierten menos.',
  'No sabes cómo estructurar un vídeo que enganche.',
  'Improvisas cada vez que enciendes la cámara.',
]

const orbits = [
  {
    n: '01',
    title: 'Guiones y concepto creativo',
    body: 'Deja de improvisar. Diseña ganchos, estructura y storytelling antes de pulsar grabar.',
  },
  {
    n: '02',
    title: 'Storyboard y storytelling visual',
    body: 'Planifica cada plano como un director de cine. Que tu marca cuente historias, no anuncios.',
  },
  {
    n: '03',
    title: 'Grabar de forma sencilla',
    body: 'Con el móvil, tu cámara actual y la luz que ya tienes. Sin excusas técnicas.',
  },
  {
    n: '04',
    title: 'Editar con IA',
    body: 'Flujos de edición rápidos y modernos. Haz en 30 min lo que antes te llevaba tardes.',
  },
]

export default function Vsl() {
  return (
    <div className="vsl-page">
      {/* 1. VSL */}
      <section className="section section-hero">
        <div className="section-inner">
          <p className="kicker">ADRIÁN RIVILLOS — PRESENTA</p>
          <h1 className="hero-tagline">
            Descubre el método que está cambiando las reglas del contenido
            audiovisual
          </h1>
          <div className="video-embed">
            <iframe
              src="https://www.youtube.com/embed/kWIv4DUuDIE?rel=0&modestbranding=1"
              title="Andrómeda — Vídeo principal"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 2. PROBLEMA */}
      <section className="section">
        <div className="section-inner">
          <h2 className="section-title">¿Te suena esto?</h2>
          <ul className="pain-list">
            {pains.map((p, i) => (
              <li key={i} className="pain-item">
                <span className="pain-icon" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. MÉTRICAS */}
      <section className="section">
        <div className="section-inner">
          <h2 className="section-title">
            Reduce hasta un 50% el coste por lead de tus campañas en Meta
          </h2>
          <p className="section-subtitle">
            Anuncios creativos con narrativa cinematográfica generan mejores
            resultados por menos dinero.
          </p>

          <div className="compare-grid">
            <article className="compare-card compare-before">
              <svg
                className="compare-icon"
                viewBox="0 0 48 24"
                aria-hidden="true"
              >
                <polyline
                  points="2,5 11,9 20,7 29,14 38,16 46,21"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="compare-label">Antes</p>
              <p className="compare-body">
                Anuncios genéricos, sin estructura, sin storytelling. CPL alto y
                resultados impredecibles.
              </p>
            </article>

            <article className="compare-card compare-after">
              <svg
                className="compare-icon"
                viewBox="0 0 48 24"
                aria-hidden="true"
              >
                <polyline
                  points="2,21 11,16 20,17 29,10 38,8 46,3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="compare-label">Después</p>
              <p className="compare-body">
                Anuncios con narrativa cinematográfica, guion estructurado y
                dirección creativa. CPL reducido y resultados consistentes.
              </p>
            </article>

            <article className="compare-card compare-result">
              <p className="compare-label">Resultado</p>
              <p className="compare-big">
                50<span className="compare-big-unit">%</span>
              </p>
              <p className="compare-body">
                Hasta un 50% menos en coste por lead. Más conversiones con menos
                presupuesto.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. QUÉ INCLUYE — LAS 4 ÓRBITAS */}
      <section className="section">
        <div className="section-inner">
          <h2 className="section-title">Las 4 órbitas del viaje</h2>
          <div className="orbits-grid">
            {orbits.map((o) => (
              <article key={o.n} className="orbit-card">
                <div className="orbit-head">
                  <span className="orbit-ring" aria-hidden="true">
                    <span className="orbit-dot" />
                  </span>
                  <span className="orbit-n">Órbita {o.n}</span>
                </div>
                <h3 className="orbit-title">{o.title}</h3>
                <p className="orbit-body">{o.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA FINAL */}
      <section className="section section-cta">
        <div className="section-inner">
          <h2 className="section-title">¿Listo para viajar más lejos?</h2>
          <p className="cta-subtitle">
            Puedes seguir comunicando como todos.
            <br />O puedes viajar a Andrómeda.
          </p>
          <a href="#" className="cta cta-big">
            <span className="cta-text">RESERVAR MI PLAZA →</span>
          </a>
          <p className="cta-fine">Plazas limitadas · Acceso inmediato</p>
        </div>
      </section>
    </div>
  )
}
