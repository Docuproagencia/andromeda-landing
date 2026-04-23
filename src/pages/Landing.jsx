import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const TITLE_LETTERS = Array.from('ANDRÓMEDA')

export default function Landing() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setErrorMsg(null)
    const { error } = await supabase.from('leads').insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    })
    if (error) {
      setSubmitting(false)
      setErrorMsg('No hemos podido guardarte. Inténtalo de nuevo.')
      return
    }
    navigate('/vsl', { replace: true })
  }

  useEffect(() => {
    if (!errorMsg) return
    const t = setTimeout(() => setErrorMsg(null), 4200)
    return () => clearTimeout(t)
  }, [errorMsg])

  return (
    <div className="landing-page">
      <main className="landing">
        <header className="intro">
          <img
            src="/logo-andromeda.png"
            alt="Andrómeda"
            className="brand-logo fade-up"
            style={{ '--delay': '0.1s' }}
          />
          <h1 className="title" aria-label="ANDRÓMEDA">
            {TITLE_LETTERS.map((ch, i) => (
              <span
                key={i}
                className="title-char"
                aria-hidden="true"
                style={{ animationDelay: `${0.35 + i * 0.07}s` }}
              >
                {ch}
              </span>
            ))}
          </h1>
        </header>

        <section className="pitch fade-up" style={{ '--delay': '1.25s' }}>
          <p className="lead">
            La mayoría de marcas comunican.
            <br />
            Muy pocas cuentan historias.
          </p>
          <p className="sub">
            Descubre cómo bajar costes de publicidad con anuncios creativos que
            conectan.
          </p>
        </section>

        <section className="vsl">
          <div className="vsl-frame materialize" style={{ '--delay': '1.6s' }}>
            <div className="vsl-thumb" aria-hidden="true" />
            <div className="scanlines" aria-hidden="true" />
            <div className="vsl-vignette" aria-hidden="true" />
            <button type="button" className="play" aria-label="Reproducir vídeo">
              <span className="play-icon" aria-hidden="true" />
            </button>
          </div>
          <p className="vsl-title fade-up" style={{ '--delay': '2.5s' }}>
            Descubre cómo bajar costes de publicidad con anuncios creativos
          </p>
          <p className="vsl-hint fade-up" style={{ '--delay': '2.6s' }}>
            Primero regístrate
          </p>
        </section>

        <section
          className="signup fade-up"
          style={{ '--delay': '2.8s' }}
          aria-label="Formulario de registro"
        >
          <form onSubmit={handleSubmit} className="form" noValidate>
            <div className="field-wrap">
              <input
                type="text"
                className="field"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
              <span className="field-scan" aria-hidden="true" />
            </div>
            <div className="field-wrap">
              <input
                type="email"
                className="field"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <span className="field-scan" aria-hidden="true" />
            </div>
            <button type="submit" className="cta" disabled={submitting}>
              <span className="cta-text">
                {submitting ? 'ENVIANDO…' : 'INICIAR EL VIAJE →'}
              </span>
            </button>
          </form>
        </section>

        <footer className="closing fade-up" style={{ '--delay': '3.1s' }}>
          <p>
            Puedes seguir comunicando como todos.
            <br />O puedes viajar más lejos.
          </p>
        </footer>
      </main>

      {errorMsg && (
        <div className="toast toast-error" role="status">
          {errorMsg}
        </div>
      )}
    </div>
  )
}
