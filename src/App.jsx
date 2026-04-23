import { useEffect, useRef, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const rand = (a, b) => a + Math.random() * (b - a)
    let width = 0
    let height = 0
    let dpr = 1
    let particles = []

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(
        Math.max(40, Math.floor((width * height) / 16000)),
        140,
      )
      particles = []
      for (let i = 0; i < count; i++) {
        const r = Math.random()
        let type, radius, opacity, glow, speedMul
        if (r < 0.62) {
          type = 'dust'
          radius = rand(0.4, 1.2)
          opacity = rand(0.12, 0.3)
          glow = 0
          speedMul = 1
        } else if (r < 0.93) {
          type = 'molecule'
          radius = rand(1.3, 2.3)
          opacity = rand(0.35, 0.6)
          glow = rand(2.5, 5)
          speedMul = 0.85
        } else {
          type = 'bright'
          radius = rand(2.2, 3.4)
          opacity = rand(0.65, 0.9)
          glow = rand(7, 12)
          speedMul = 0.55
        }

        // direcciones variadas: mayoría subiendo, algunas diagonales
        const directionRoll = Math.random()
        let angle
        if (directionRoll < 0.55) {
          angle = rand(-Math.PI * 0.6, -Math.PI * 0.4) // arriba
        } else if (directionRoll < 0.8) {
          angle = rand(-Math.PI * 0.85, -Math.PI * 0.62) // diagonal arriba-izq
        } else if (directionRoll < 0.95) {
          angle = rand(-Math.PI * 0.38, -Math.PI * 0.15) // diagonal arriba-der
        } else {
          angle = rand(0, Math.PI * 2) // deriva libre
        }
        const speed = rand(0.08, 0.38) * speedMul

        particles.push({
          x: rand(0, width),
          y: rand(0, height),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius,
          opacity,
          glow,
          type,
          phase: rand(0, Math.PI * 2),
          twinkle: rand(0.008, 0.022),
        })
      }
    }

    build()
    const onResize = () => build()
    window.addEventListener('resize', onResize)

    const linkRange = 130
    const linkRangeSq = linkRange * linkRange

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.phase += p.twinkle

        if (p.y < -24) {
          p.y = height + 12
          p.x = rand(0, width)
        } else if (p.y > height + 24) {
          p.y = -12
          p.x = rand(0, width)
        }
        if (p.x < -24) p.x = width + 12
        else if (p.x > width + 24) p.x = -12
      }

      // líneas: desde partículas brillantes a vecinas
      ctx.lineWidth = 0.6
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        if (a.type !== 'bright') continue
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue
          const b = particles[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dsq = dx * dx + dy * dy
          if (dsq < linkRangeSq) {
            const d = Math.sqrt(dsq)
            const alpha = (1 - d / linkRange) * 0.18
            ctx.strokeStyle = `rgba(0, 229, 204, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // partículas
      for (const p of particles) {
        const twinkle = 0.82 + Math.sin(p.phase) * 0.18
        const alpha = p.opacity * twinkle
        if (p.glow > 0) {
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius + p.glow,
          )
          grad.addColorStop(0, `rgba(0, 229, 204, ${alpha})`)
          grad.addColorStop(0.45, `rgba(0, 229, 204, ${alpha * 0.35})`)
          grad.addColorStop(1, 'rgba(0, 229, 204, 0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius + p.glow, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = `rgba(0, 229, 204, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw)
    }

    if (reduceMotion) {
      draw()
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
  )
}

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    const { error } = await supabase.from('leads').insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    })
    setSubmitting(false)
    if (error) {
      setToast({
        type: 'error',
        msg: 'No hemos podido guardarte. Inténtalo de nuevo.',
      })
      return
    }
    setToast({
      type: 'success',
      msg: 'Registro completado. Bienvenido a Andrómeda.',
    })
    setName('')
    setEmail('')
  }

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4200)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <div className="app">
      <ParticleField />
      <div className="fog-stack" aria-hidden="true">
        <div className="fog-layer fog-layer-1" />
        <div className="fog-layer fog-layer-2" />
        <div className="fog-layer fog-layer-3" />
      </div>

      <main className="landing">
        <header className="intro">
          <p className="kicker">ADRIÁN RIVILLOS — PRESENTA</p>
          <h1 className="title">ANDRÓMEDA</h1>
        </header>

        <section className="pitch">
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
          <div className="vsl-frame">
            <div className="vsl-thumb" aria-hidden="true" />
            <div className="scanlines" aria-hidden="true" />
            <div className="vsl-vignette" aria-hidden="true" />
            <button type="button" className="play" aria-label="Reproducir vídeo">
              <span className="play-icon" aria-hidden="true" />
            </button>
          </div>
          <p className="vsl-title">
            Descubre cómo bajar costes de publicidad con anuncios creativos
          </p>
          <p className="vsl-hint">Primero regístrate</p>
        </section>

        <section className="signup" aria-label="Formulario de registro">
          <form onSubmit={handleSubmit} className="form" noValidate>
            <input
              type="text"
              className="field"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
            <input
              type="email"
              className="field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <button type="submit" className="cta" disabled={submitting}>
              <span className="cta-text">
                {submitting ? 'ENVIANDO…' : 'INICIAR EL VIAJE →'}
              </span>
            </button>
          </form>
        </section>

        <footer className="closing">
          <p>
            Puedes seguir comunicando como todos.
            <br />O puedes viajar más lejos.
          </p>
        </footer>
      </main>

      {toast && (
        <div className={`toast toast-${toast.type}`} role="status">
          {toast.msg}
        </div>
      )}
    </div>
  )
}

export default App
