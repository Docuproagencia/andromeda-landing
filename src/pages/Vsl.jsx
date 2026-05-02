import { useEffect, useRef, useState } from 'react'

// ==================== DATA ====================
const pains = [
  {
    icon: '🎬',
    text: 'Grabas vídeos sin guion, sin estructura, sin intención — y se nota',
  },
  {
    icon: '📉',
    text: 'Tus anuncios se pierden entre miles porque parecen iguales a los de todos',
  },
  {
    icon: '🤷',
    text: 'No sabes cómo convertir una idea en un vídeo que enganche desde el primer segundo',
  },
  {
    icon: '💸',
    text: 'Gastas en producción o en ads pero el contenido no conecta con nadie',
  },
]

const results = [
  {
    label: 'Antes',
    headline: 'Vídeos sin estrategia',
    foot: 'Improvisación · Contenido genérico',
  },
  {
    label: 'Después',
    headline: 'Piezas con narrativa',
    foot: 'Guiones claros · Identidad audiovisual',
  },
  {
    label: 'Resultado',
    headline: 'Director, no improvisador',
    foot: 'Anuncios que conectan · Costes más bajos',
  },
]

const orbits = [
  {
    n: '01',
    title: 'Guion y concepto creativo',
    body: 'Aprende a crear guiones y encontrar ideas que conecten con tu audiencia',
  },
  {
    n: '02',
    title: 'Storyboard y storytelling visual',
    body: 'Narrativa aplicada al vídeo: construye historias a partir de cualquier idea',
  },
  {
    n: '03',
    title: 'Grabación sencilla y organizada',
    body: 'Planifica, graba con lo que tengas (incluso el móvil) y organiza tu material',
  },
  {
    n: '04',
    title: 'Edición eficiente con IA',
    body: 'Edita de forma profesional en Premiere y aprovecha la inteligencia artificial',
  },
]

const fitYes = [
  'Quieres que tus vídeos dejen de parecer improvisados',
  'Tienes un negocio o marca que necesita contenido que conecte',
  'Te interesa aprender narrativa y cine aplicado a publicidad',
  'Estás dispuesto a pensar como director, no como improvisador',
]

const fitNo = [
  'Buscas un curso de edición técnica avanzada',
  'No quieres grabar ni ponerte delante o detrás de la cámara',
  'Esperas resultados sin aplicar lo aprendido',
  'Solo quieres trucos rápidos sin entender la narrativa detrás',
]

const offerIncludes = [
  'Las 4 órbitas completas: guion, storyboard, grabación y edición',
  'Plantillas de guion y herramientas de planificación',
  'Acceso a recursos de música, referencias y organización',
  'Formación en edición con Adobe Premiere e inteligencia artificial',
]

const faqs = [
  {
    q: '¿Necesito experiencia en vídeo o cine?',
    a: 'No. Andrómeda está diseñado para que cualquier persona — con o sin experiencia — aprenda desde los fundamentos de la narrativa hasta la edición profesional.',
  },
  {
    q: '¿Necesito equipo profesional para grabar?',
    a: 'No. Aprenderás a grabar de forma sencilla incluso con tu móvil. Lo importante no es la cámara, es la historia.',
  },
  {
    q: '¿En qué se diferencia de otros cursos de vídeo?',
    a: 'Andrómeda no enseña a grabar vídeos. Enseña a provocar reacciones. El enfoque es cine aplicado a publicidad: narrativa, guion, estructura visual y edición con propósito.',
  },
  {
    q: '¿Cuánto tiempo tengo acceso al contenido?',
    a: 'Acceso de por vida. Puedes ir a tu ritmo y volver a cualquier módulo cuando lo necesites.',
  },
  {
    q: '¿Sirve para mi negocio o solo para creativos?',
    a: 'Sirve para cualquier persona o marca que quiera comunicar mejor con vídeo. Negocios, agencias, freelancers y creadores de contenido.',
  },
]

// ==================== Section wrapper (con render-prop) ====================
function Section({ className = '', children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`section reveal ${className} ${visible ? 'is-visible' : ''}`.trim()}
    >
      {typeof children === 'function' ? children(visible) : children}
    </section>
  )
}

// Helper: estilo inline para .fade-up que arranca en pausa hasta que la
// sección entra en viewport. Combina el --delay con animationPlayState.
const fade = (delay, visible) => ({
  '--delay': `${delay}s`,
  animationPlayState: visible ? 'running' : 'paused',
})

// ==================== FAQ item (accordion) ====================
function FaqItem({ q, a, isOpen, onToggle, className = '', style }) {
  return (
    <div
      className={`faq-item ${isOpen ? 'is-open' : ''} ${className}`.trim()}
      style={style}
    >
      <button
        type="button"
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{q}</span>
        <span className="faq-icon" aria-hidden="true">
          +
        </span>
      </button>
      <div className="faq-answer" aria-hidden={!isOpen}>
        <p>{a}</p>
      </div>
    </div>
  )
}

// ==================== PAGE ====================
export default function Vsl() {
  const [playing, setPlaying] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="vsl-page">
      {/* 1. HERO */}
      <Section className="section-hero">
        {(visible) => (
          <div className="section-inner">
            <div
              className="authority-bar fade-up"
              style={fade(0, visible)}
            >
              Aprende a crear anuncios cinematográficos que conectan
            </div>

            <p className="kicker fade-up" style={fade(0.1, visible)}>
              ADRIÁN RIVILLOS — PRESENTA
            </p>

            <h1 className="hero-tagline fade-up" style={fade(0.25, visible)}>
              Deja de hacer vídeos. Empieza a contar historias que venden.
            </h1>

            <p className="hero-sub fade-up" style={fade(0.4, visible)}>
              Andrómeda es el viaje que te enseña cine aplicado a los anuncios.
              Guion, narrativa, grabación y edición — todo lo que necesitas
              para que tus vídeos dejen de ser ruido.
            </p>

            <div
              className="video-embed vsl-cover-frame fade-up"
              style={fade(0.55, visible)}
            >
              {playing ? (
                <iframe
                  src="https://www.youtube.com/embed/kWIv4DUuDIE?autoplay=1&rel=0&modestbranding=1"
                  title="Andrómeda — Vídeo principal"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="vsl-cover-trigger"
                  onClick={() => setPlaying(true)}
                  aria-label="Reproducir vídeo"
                >
                  <div className="vsl-cover-bg" aria-hidden="true" />
                  <div className="vsl-cover-overlay" aria-hidden="true" />
                  <div className="scanlines" aria-hidden="true" />
                  <div className="vsl-cover-content">
                    <p className="vsl-cover-kicker">EL MÉTODO</p>
                    <h2 className="vsl-cover-title">
                      DESCUBRE CÓMO HACER{' '}
                      <span className="accent">CINE EN TUS ANUNCIOS</span>
                    </h2>
                    <p className="vsl-cover-sub">
                      Narrativa cinematográfica aplicada a la publicidad
                    </p>
                    <span className="play play-big" aria-hidden="true">
                      <span className="play-icon" />
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </Section>

      {/* 2. PROBLEMA */}
      <Section>
        {(visible) => (
          <div className="section-inner">
            <h2 className="section-title fade-up" style={fade(0, visible)}>
              El problema no son tus vídeos. Es cómo los cuentas.
            </h2>

            <div className="pain-grid">
              {pains.map((p, i) => (
                <div
                  key={i}
                  className="pain-card fade-up"
                  style={fade(0.1 + i * 0.1, visible)}
                >
                  <span className="pain-card-icon" aria-hidden="true">
                    {p.icon}
                  </span>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>

            <p className="bridge fade-up" style={fade(0.6, visible)}>
              La mayoría de marcas comunican. Muy pocas cuentan historias.
            </p>
          </div>
        )}
      </Section>

      {/* 3. RESULTADOS */}
      <Section>
        {(visible) => (
          <div className="section-inner">
            <h2 className="section-title fade-up" style={fade(0, visible)}>
              Esto es lo que pasa cuando aplicas Andrómeda
            </h2>

            <div className="results-grid">
              {results.map((r, i) => (
                <article
                  key={i}
                  className="result-card fade-up"
                  style={fade(0.15 + i * 0.15, visible)}
                >
                  <p className="result-label">{r.label}</p>
                  <span className="result-value">{r.headline}</span>
                  <p className="result-foot">{r.foot}</p>
                </article>
              ))}
            </div>

            <p className="results-note fade-up" style={fade(0.7, visible)}>
              Resultados reales. Sin trucos. Sin inflar números.
            </p>
          </div>
        )}
      </Section>

      {/* 4. MÉTODO — 4 ÓRBITAS */}
      <Section>
        {(visible) => (
          <div className="section-inner">
            <h2 className="section-title fade-up" style={fade(0, visible)}>
              Las 4 órbitas del viaje
            </h2>
            <p className="section-subtitle fade-up" style={fade(0.1, visible)}>
              Cada fase te acerca a crear anuncios cinematográficos. Ninguna
              es opcional.
            </p>

            <div className="orbits-grid">
              {orbits.map((o, i) => (
                <article
                  key={o.n}
                  className="orbit-card fade-up"
                  style={fade(0.2 + i * 0.15, visible)}
                >
                  <div className="orbit-head">
                    <span className="orbit-ring" aria-hidden="true">
                      <span className="orbit-dot" />
                    </span>
                    <span className="orbit-number">{o.n}</span>
                  </div>
                  <h3 className="orbit-title">{o.title}</h3>
                  <p className="orbit-body">{o.body}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* 5. PARA QUIÉN ES */}
      <Section>
        {(visible) => (
          <div className="section-inner">
            <h2 className="section-title fade-up" style={fade(0, visible)}>
              ¿Es para ti?
            </h2>

            <div className="fit-grid">
              <div
                className="fit-col fit-yes fade-up"
                style={fade(0.15, visible)}
              >
                <h3 className="fit-title">Esto es para ti si…</h3>
                <ul className="fit-list">
                  {fitYes.map((item, i) => (
                    <li key={i} className="fit-item">
                      <span className="fit-mark" aria-hidden="true">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="fit-col fit-no fade-up"
                style={fade(0.3, visible)}
              >
                <h3 className="fit-title">NO es para ti si…</h3>
                <ul className="fit-list">
                  {fitNo.map((item, i) => (
                    <li key={i} className="fit-item">
                      <span className="fit-mark" aria-hidden="true">
                        ✗
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* 6. SOBRE ADRIÁN */}
      <Section>
        {(visible) => (
          <div className="section-inner">
            <h2 className="section-title fade-up" style={fade(0, visible)}>
              ¿Quién está detrás?
            </h2>

            <div className="about-block fade-up" style={fade(0.15, visible)}>
              <img
                src="/logo-andromeda.png"
                alt="Adrián Rivillos"
                className="about-photo"
              />
              <div className="about-text">
                <p className="about-name">Adrián Rivillos</p>
                <p>
                  Soy el comandante de esta nave. Descubrí el cine del mismo
                  modo en que uno descubre los planetas: comprendiendo que una
                  historia bien trazada puede alterar la gravedad de todo lo
                  que creemos ver. Hoy convierto esa pasión en misión —
                  acompañar a otros a desarrollar su propia mirada creativa y
                  construir relatos que importen.
                </p>
                <p className="about-tagline">
                  Mi objetivo no es solo transmitir técnicas, sino que cada
                  persona que se forme conmigo sienta que puede crear algo que
                  le pertenezca verdaderamente.
                </p>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* 7. CTA FINAL */}
      <Section className="section-cta">
        {(visible) => (
          <div className="section-inner">
            <h2 className="section-title fade-up" style={fade(0, visible)}>
              ¿Listo para dejar de improvisar?
            </h2>

            <div className="offer-stack">
              <ul className="offer-list">
                {offerIncludes.map((item, i) => (
                  <li
                    key={i}
                    className="offer-item fade-up"
                    style={fade(0.1 + i * 0.1, visible)}
                  >
                    <span className="offer-mark" aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div
                className="price-block fade-up"
                style={fade(0.6, visible)}
              >
                <p className="price-old">
                  Valor: <s>697&nbsp;€</s>
                </p>
                <p className="price-now">
                  Hoy: <strong>399&nbsp;€</strong>
                </p>
              </div>

              <a
                href="#"
                className="cta cta-big fade-up"
                style={fade(0.75, visible)}
              >
                <span className="cta-text">
                  Iniciar el viaje a Andrómeda
                </span>
              </a>

              <p className="guarantee fade-up" style={fade(0.9, visible)}>
                Garantía de 14 días. Si no es lo que esperabas, te devolvemos
                el dinero.
              </p>
            </div>
          </div>
        )}
      </Section>

      {/* 8. FAQ */}
      <Section>
        {(visible) => (
          <div className="section-inner">
            <h2 className="section-title fade-up" style={fade(0, visible)}>
              Preguntas frecuentes
            </h2>

            <div className="faq-list">
              {faqs.map((f, i) => (
                <FaqItem
                  key={i}
                  q={f.q}
                  a={f.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  className="fade-up"
                  style={fade(0.1 + i * 0.1, visible)}
                />
              ))}
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}
