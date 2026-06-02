import { useState, useEffect, useRef } from 'react'

// ---- Iconos SVG inline ----
const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>
  </svg>
)
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
)
const BarChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
)
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const AlertTriangleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const ArrowDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
)
const SmartphoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
)
const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/>
  </svg>
)
const DollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
)
const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
)
const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/>
  </svg>
)

// ---- Componentes Auxiliares ----
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const duration = 1800
        const step = (timestamp) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          setCount(Math.floor(progress * target))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <div
      className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-orange-400/40 transition-all duration-500 cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function RoadDamageIcon({ type }) {
  const icons = {
    bache: '🕳️', derrumbe: '⛰️', señalizacion: '🚧', inundacion: '🌊', otro: '⚠️'
  }
  return <span className="text-2xl">{icons[type]}</span>
}

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-white/10 bg-slate-900/40 rounded-2xl overflow-hidden transition-colors hover:border-white/20">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-5 text-left font-bold text-white hover:bg-white/5 transition-colors"
      >
        <span>{title}</span>
        <svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] border-t border-white/5 p-5' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  )
}

function MockPhone() {
  const [activeReport, setActiveReport] = useState(null)
  const reports = [
    { id: 1, type: 'bache', label: 'Bache', loc: 'Av. Central, Tuxtla', status: 'pendiente', color: 'bg-red-500' },
    { id: 2, type: 'señalizacion', label: 'Señalización', loc: 'Blvd. Belisario, SCLC', status: 'en proceso', color: 'bg-amber-500' },
    { id: 3, type: 'derrumbe', label: 'Derrumbe', loc: 'Carretera 190, km 34', status: 'resuelto', color: 'bg-green-500' },
  ]

  return (
    <div className="relative mx-auto w-[260px]">
      <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-150 pointer-events-none"></div>
      <div className="relative bg-slate-900 border-2 border-slate-700 rounded-[36px] p-3 shadow-2xl">
        <div className="mx-auto w-20 h-5 bg-slate-800 rounded-full mb-2"></div>
        <div className="bg-slate-950 rounded-[24px] overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <AlertTriangleIcon />
              </div>
              <span className="text-white font-bold text-sm">BACHI</span>
              <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="relative h-28 bg-slate-800 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute border-slate-500" style={{ left: `${i * 14}%`, top: 0, bottom: 0, borderLeftWidth: 1 }}></div>
              ))}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute border-slate-500" style={{ top: `${i * 20}%`, left: 0, right: 0, borderTopWidth: 1 }}></div>
              ))}
            </div>
            <div className="absolute top-4 left-8 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="absolute top-10 right-10 w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: '600ms' }}></div>
          </div>
          <div className="p-3 space-y-2">
            {reports.map(r => (
              <div
                key={r.id}
                className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all ${activeReport === r.id ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-slate-800'}`}
                onClick={() => setActiveReport(activeReport === r.id ? null : r.id)}
              >
                <RoadDamageIcon type={r.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{r.label}</p>
                  <p className="text-slate-400 text-[10px] truncate">{r.loc}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${r.color}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto w-16 h-1 bg-slate-600 rounded-full mt-2"></div>
      </div>
    </div>
  )
}

// ---- App Principal ----
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('ciudadano')

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const userTabs = {
    ciudadano: {
      label: '👤 Ciudadano',
      items: [
        'Registrarse e iniciar sesión mediante correo o teléfono.',
        'Reportar incidencias viales de forma geolocalizada.',
        'Tomar fotografías del daño como evidencia física.',
        'Consultar el estado de sus reportes en tiempo real.',
        'Visualizar incidencias activas en el mapa de su zona.',
        'Recibir notificaciones push para el seguimiento institucional.',
      ]
    },
    admin: {
      label: '🛡️ Autoridad',
      items: [
        'Gestionar reportes ciudadanos de forma organizada.',
        'Actualizar el estado de incidencias (Pendiente / En proceso / Resuelto).',
        'Visualizar estadísticas generales del municipio.',
        'Filtrar reportes detalladamente por categoría y municipio.',
        'Exportar información de reportes en formato compatible CSV.',
      ]
    },
    visitante: {
      label: '🌐 Visitante',
      items: [
        'Consultar incidencias viales activas sin necesidad de registro.',
        'Visualizar fotografías y categorías de daños reportados.',
        'Consultar el estado general de las vialidades públicas de la región.',
      ]
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* Fondo global */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl"></div>
      </div>

      {/* ===== NAV ===== */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/img/bachii.png" alt="Bachi" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-black text-lg tracking-tight">Ba<span className="text-orange-400">chi</span></span>
            <span className="text-xs text-slate-500 font-medium hidden sm:block">Chiapas</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            {['problema', 'objetivos', 'competencia', 'funcionalidades', 'arquitectura', 'ingresos'].map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="hover:text-orange-400 transition-colors capitalize">
                {s === 'problema' ? 'Problema' : s === 'funcionalidades' ? 'Módulos' : s === 'ingresos' ? 'Monetización' : s}
              </button>
            ))}
          </div>
          <button className="md:hidden text-slate-400" onClick={() => setMenuOpen(!menuOpen)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold rounded-full">
                Eje: Social
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-400 text-xs rounded-full">
                Proyecto Integrador · Mayo–Agosto 2026
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-4">
              Ba<span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">chi</span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Plataforma ciudadana de reporte de incidencias viales con geolocalización. Diseñada para transformar la infraestructura vial mediante el uso de tecnología móvil moderna.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo('objetivos')} className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-all shadow-xl shadow-orange-500/25">
                Ver Propuesta Académica
              </button>
              <button onClick={() => scrollTo('competencia')} className="px-6 py-3 border border-white/10 hover:border-white/30 text-slate-300 rounded-xl transition-all">
                Ventaja Competitiva
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <MockPhone />
          </div>
        </div>
      </section>

      {/* ===== PLANTEAMIENTO DEL PROBLEMA ===== */}
      <section id="problema" className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-4">
            <AlertTriangleIcon /> Planteamiento del Problema
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-6">El rezago en infraestructura vial</h2>
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              <strong className="text-white">Chiapas</strong> es uno de los estados con mayor rezago en infraestructura vial de México. Las lluvias torrenciales, los deslaves y la falta de mantenimiento oportuno generan baches, derrumbes, hundimientos y señalización deteriorada que representan riesgos constantes para la movilidad y seguridad de la población.
            </p>
            <p>
              El problema central radica en que los ciudadanos no cuentan con un canal digital accesible para reportar estas incidencias de forma geolocalizada y en tiempo real. Los mecanismos actuales de reporte son burocráticos, presenciales o ineficaces, tales como llamadas telefónicas sin seguimiento, formularios físicos o publicaciones en redes sociales que no generan acciones institucionales verificables.
            </p>
            <p>
              Esta falta de comunicación entre ciudadanos y autoridades provoca reparaciones tardías, incremento de accidentes y mala priorización de recursos destinados al mantenimiento vial. Además, disminuye la confianza ciudadana en los mecanismos de participación pública.
            </p>
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 font-medium mt-6">
              💡 <strong>Propuesta de solución:</strong> Se propone el desarrollo de una aplicación móvil que permita reportar incidencias viales de forma rápida, visual y geolocalizada, facilitando a las autoridades la gestión y priorización de las problemáticas detectadas.
            </div>
          </div>
        </div>
      </section>

      {/* ===== OBJETIVOS ===== */}
      <section id="objetivos" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <TargetIcon /> Estructura de Objetivos del Proyecto
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-8">Estructura Metodológica</h2>

          {/* Objetivo General */}
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 mb-6">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-2">Objetivo General</span>
            <p className="text-white text-base leading-relaxed font-medium">
              <span className="text-orange-400 underline decoration-wavy">Desarrollar</span> una aplicación móvil multiplataforma para Android denominada Bachi, que permita a los ciudadanos reportar incidencias viales de forma geolocalizada y con evidencia fotográfica, facilitando a las autoridades municipales la gestión, seguimiento y priorización de dichas incidencias mediante información en tiempo real.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-white/5 text-[11px] text-slate-500">
              <div><strong className="text-slate-400">Acción:</strong> Desarrollar</div>
              <div><strong className="text-slate-400">Objeto:</strong> App Móvil Bachi</div>
              <div><strong className="text-slate-400">Herramientas:</strong> Flutter / Firebase</div>
              <div><strong className="text-slate-400">Finalidad:</strong> Gestión y Priorización</div>
            </div>
          </div>

          {/* Objetivos Específicos */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Objetivos Específicos (Fases de Desarrollo)</h3>
            {[
              'Diseñar e implementar un módulo de registro e inicio de sesión de usuarios mediante correo electrónico o número telefónico.',
              'Desarrollar un sistema de reportes con captura fotográfica, categorías de incidencias y geolocalización automática.',
              'Integrar un Mapa para visualizar reportes activos mediante un mapa interactivo.',
              'Implementar seguimiento del estado de los reportes mediante notificaciones push.',
              'Construir un panel administrativo para la gestión y actualización de reportes.',
              'Realizar pruebas de usabilidad con usuarios reales para validar la funcionalidad de la aplicación.'
            ].map((obj, i) => (
              <div key={i} className="flex gap-3 items-start p-3 bg-white/3 border border-white/5 rounded-xl text-slate-300 text-sm">
                <span className="text-orange-400 font-bold">{i + 1}.</span>
                <p>{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPETENCIA Y VALOR AGREGADO ===== */}
      <section id="competencia" className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            📊 Análisis de Competencia
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">¿Contra qué competimos y qué ofrecemos?</h2>
          <p className="text-slate-400 text-sm mb-8">Diferenciación estratégica de nuestra propuesta frente a soluciones actuales del mercado.</p>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-white/5 text-slate-300 border-b border-white/10">
                  <th className="p-4 font-bold">Característica</th>
                  <th className="p-4 font-bold text-red-400">Redes Sociales / Waze</th>
                  <th className="p-4 font-bold text-amber-400">Plataformas CDMX (072)</th>
                  <th className="p-4 font-bold text-emerald-400 bg-emerald-500/10">Bachi (Nuestra App)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="p-4 font-semibold text-white">Geolocalización exacta</td>
                  <td className="p-4 text-xs text-slate-400">Sí (Waze) / No (Redes)</td>
                  <td className="p-4 text-xs text-slate-400">Manual / Burocrática</td>
                  <td className="p-4 text-xs text-white font-medium bg-emerald-500/5">Automática mediante GPS</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Evidencia fotográfica</td>
                  <td className="p-4 text-xs text-slate-400">Informal</td>
                  <td className="p-4 text-xs text-slate-400">No obligatoria / Opcional</td>
                  <td className="p-4 text-xs text-white font-medium bg-emerald-500/5">Captura directa in-app</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Seguimiento Institucional</td>
                  <td className="p-4 text-xs text-red-400">Nulo (Solo es denuncia)</td>
                  <td className="p-4 text-xs text-slate-400">Lento vía folios web</td>
                  <td className="p-4 text-xs text-white font-medium bg-emerald-500/5">Notificaciones Push Directas</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Panel para Municipios</td>
                  <td className="p-4 text-xs text-slate-400">No disponible</td>
                  <td className="p-4 text-xs text-slate-400">Sistemas heredados opacos</td>
                  <td className="p-4 text-xs text-white font-medium bg-emerald-500/5">Panel SaaS y Estadísticas Avanzadas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-white/5 bg-slate-900/40 rounded-xl">
              <h4 className="font-bold text-white mb-2 text-sm">❌ El Vacío en la Competencia</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Las apps comerciales de navegación (Waze) alertan del bache al usuario pero no notifican a la autoridad. Las apps gubernamentales existentes están centralizadas en grandes urbes y no se adaptan al entorno geográfico ni institucional de los municipios de Chiapas.
              </p>
            </div>
            <div className="p-5 border border-emerald-500/20 bg-emerald-500/5 rounded-xl">
              <h4 className="font-bold text-emerald-400 mb-2 text-sm">✨ Nuestro Valor Agregado</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Bachi cierra el ciclo completo: empodera al ciudadano con un canal intuitivo y provee a los ayuntamientos de herramientas analíticas organizadas (paneles estadísticos, bases exportables) para optimizar recursos de bacheo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ALCANCES / PERFILES DE USUARIO ===== */}
      <section id="funcionalidades" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
            <SmartphoneIcon /> Alcances y Usuarios
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Roles de Usuario Disponibles</h2>
          <p className="text-slate-400 text-sm mb-8">Definición de permisos y acciones permitidas para cada perfil dentro de la plataforma.</p>

          <div className="flex gap-2 mb-6 border-b border-white/10 pb-2">
            {Object.entries(userTabs).map(([key, tab]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === key ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {userTabs[activeTab].items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <div className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== ARQUITECTURA TÉCNICA (MÓDULOS DEL PROYECTO) ===== */}
      <section id="arquitectura" className="py-24 bg-slate-900/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
            <CpuIcon /> Estructura del Software
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Módulos del Sistema</h2>
          <p className="text-slate-400 text-sm mb-8">Desglose integral de los componentes de código que conforman el ecosistema de Bachi.</p>

          <div className="space-y-3">
            <Accordion title="🔒 Módulo de Autenticación">
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                <li>Registro de usuarios mediante correo electrónico.</li>
                <li>Inicio de sesión seguro para resguardo de identidad.</li>
                <li>Flujo de recuperación de contraseñas automatizado.</li>
              </ul>
            </Accordion>
            <Accordion title="📸 Módulo de Reportes">
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                <li>Captura de fotografías optimizada para dispositivos móviles.</li>
                <li>Selección estructurada de categorías de daño vial.</li>
                <li>Geolocalización automática a través del dispositivo.</li>
                <li>Descripción textual opcional y generación automática de folio único de reporte.</li>
              </ul>
            </Accordion>
            <Accordion title="🗺️ Módulo de Mapa Interactivo">
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                <li>Visualización de reportes geolocalizados directamente en el mapa.</li>
                <li>Filtros organizados por categoría y estado actual.</li>
                <li>Consulta detallada de incidencias y desglose de puntos activos.</li>
              </ul>
            </Accordion>
            <Accordion title="🔔 Módulo de Seguimiento y Panel Administrativo">
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                <li>Consulta de historial de reportes enviados por el usuario.</li>
                <li>Notificaciones push en tiempo real ante cambios de estatus.</li>
                <li>Gestión, actualización de estados, estadísticas generales y exportación de datos en formato CSV para la autoridad.</li>
              </ul>
            </Accordion>
          </div>
        </div>
      </section>

      {/* ===== IMPACTO DEL PROYECTO ===== */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-center text-2xl font-black mb-12">Viabilidad e Impacto del Proyecto</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Técnico', desc: 'El uso de Flutter y Firebase permitirá desarrollar una aplicación moderna, escalable y multiplataforma con una sola base de código, reduciendo costos y tiempos.' },
              { title: 'Social', desc: 'La aplicación facilitará la comunicación entre ciudadanos y autoridades, permitiendo reportar problemas viales de forma sencilla y accesible para todos.' },
              { title: 'Institucional', desc: 'La plataforma proporcionará datos geolocalizados y estadísticas útiles para apoyar la toma de decisiones y la priorización de mantenimiento por ayuntamientos.' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="font-bold text-orange-400 text-sm uppercase mb-2">Ámbito {item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MONETIZACIÓN (SaaS GOBIERNOS) ===== */}
      <section id="ingresos" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-4">
              <DollarIcon /> Sustentabilidad Financiera
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Propuesta de Monetización</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Esquema de licenciamiento de software orientado a garantizar el mantenimiento técnico del proyecto.</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-orange-500/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-2xl flex-shrink-0 mx-auto md:mx-0">🏛️</div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-white font-bold text-lg mb-2">Gobernanza SaaS (Gubernamental)</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  La plataforma es <strong className="text-white">100% gratuita para la ciudadanía</strong>. Los ingresos se generan mediante un modelo SaaS (Software as a Service) contratado por ayuntamientos municipales y secretarías de obras públicas mediante suscripciones que otorgan acceso al panel de control integral, servidores y reportes de gestión.
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-left text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">▪ Acceso a Paneles Estadísticos</div>
                  <div className="flex items-center gap-1">▪ Exportación de Reportes Validados</div>
                  <div className="flex items-center gap-1">▪ Infraestructura de Nube Firebase</div>
                  <div className="flex items-center gap-1">▪ Soporte y Actualizaciones Técnicas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EQUIPO / TECNOLOGÍAS ===== */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-lg font-bold mb-6">Stack Tecnológico</h3>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-400 mb-12">
            {['Flutter / Dart', 'Firebase Firestore', 'Google Maps API'].map(t => (
              <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-mono">{t}</span>
            ))}
          </div>

          <div className="bg-white/3 border border-white/5 rounded-2xl p-6 max-w-xl mx-auto">
            <h4 className="text-sm font-bold mb-4 text-slate-400 uppercase tracking-widest">Equipo de Desarrollo</h4>
            <div className="grid sm:grid-cols-3 gap-2 text-xs text-slate-300">
              <div>Angel Gabriel Garcia Samayoa</div>
              <div>Samuel Morales Rodríguez</div>
              <div>Martin Eduardo Estrada Garcia</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-600">
        <p>Bachi Chiapas · Proyecto Integrador 9° Cuatrimestre · 2026</p>
      </footer>
    </div>
  )
}