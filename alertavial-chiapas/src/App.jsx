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

// ---- Componentes ----
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

function TechBadge({ name, category, color }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${color}`}>
      <div className="w-2 h-2 rounded-full bg-current opacity-70"></div>
      <span>{name}</span>
      <span className="text-xs opacity-50">· {category}</span>
    </div>
  )
}

function RoadDamageIcon({ type }) {
  const icons = {
    bache: '🕳️', derrumbe: '⛰️', señalizacion: '🚧', inundacion: '🌊', otro: '⚠️'
  }
  return <span className="text-2xl">{icons[type]}</span>
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
      {/* Glow */}
      <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-150 pointer-events-none"></div>
      {/* Phone frame */}
      <div className="relative bg-slate-900 border-2 border-slate-700 rounded-[36px] p-3 shadow-2xl">
        {/* Notch */}
        <div className="mx-auto w-20 h-5 bg-slate-800 rounded-full mb-2"></div>
        {/* Screen */}
        <div className="bg-slate-950 rounded-[24px] overflow-hidden">
          {/* App header */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <AlertTriangleIcon />
              </div>
              <span className="text-white font-bold text-sm">BACHI</span>
              <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          {/* Map placeholder */}
          <div className="relative h-28 bg-slate-800 overflow-hidden">
            {/* Grid lines simulating map */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute border-slate-500" style={{
                  left: `${i * 14}%`, top: 0, bottom: 0, borderLeftWidth: 1
                }}></div>
              ))}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute border-slate-500" style={{
                  top: `${i * 20}%`, left: 0, right: 0, borderTopWidth: 1
                }}></div>
              ))}
            </div>
            {/* Map pins */}
            <div className="absolute top-4 left-8 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="absolute top-10 right-10 w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: '600ms' }}></div>
            {/* Heat overlay */}
            <div className="absolute top-2 left-4 w-16 h-16 bg-red-500/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-2 right-6 w-12 h-12 bg-orange-500/20 rounded-full blur-xl"></div>
          </div>
          {/* Reports list */}
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
          {/* Bottom nav */}
          <div className="flex justify-around py-2 border-t border-slate-800">
            {['🗺️', '📋', '🔔', '👤'].map((icon, i) => (
              <button key={i} className={`text-base p-1 rounded-lg ${i === 0 ? 'bg-orange-500/20' : ''}`}>{icon}</button>
            ))}
          </div>
        </div>
        {/* Home indicator */}
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
        'Registrarse e iniciar sesión',
        'Fotografiar y reportar incidencias con categoría',
        'Ver ubicación del daño en el mapa interactivo',
        'Dar seguimiento al estado de sus reportes',
        'Recibir notificaciones push al cambiar estado',
        'Visualizar mapa de incidencias en su zona',
      ]
    },
    admin: {
      label: '🛡️ Autoridad',
      items: [
        'Panel de administración web / in-app',
        'Ver todos los reportes por zona y categoría',
        'Actualizar estado: pendiente → en proceso → resuelto',
        'Visualizar mapa de calor de incidencias',
        'Exportar reportes por período y zona en CSV',
        'Gestionar usuarios reportadores',
      ]
    },
    visitante: {
      label: '🌐 Visitante',
      items: [
        'Consultar el mapa público sin registrarse',
        'Ver categoría y foto de cada reporte',
        'Conocer el estado de la infraestructura vial',
      ]
    }
  }

  const technologies = [
    { name: 'Flutter / Dart', category: 'Mobile', color: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10' },
    { name: 'Firebase Firestore', category: 'Database', color: 'border-orange-500/40 text-orange-300 bg-orange-500/10' },
    { name: 'Firebase Auth', category: 'Seguridad', color: 'border-amber-500/40 text-amber-300 bg-amber-500/10' },
    { name: 'Firebase Storage', category: 'Storage', color: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/10' },
    { name: 'Cloud Messaging', category: 'Push', color: 'border-green-500/40 text-green-300 bg-green-500/10' },
    { name: 'Google Maps API', category: 'Mapas', color: 'border-blue-500/40 text-blue-300 bg-blue-500/10' },
    { name: 'Geolocator', category: 'GPS', color: 'border-purple-500/40 text-purple-300 bg-purple-500/10' },
    { name: 'Image Picker', category: 'Multimedia', color: 'border-pink-500/40 text-pink-300 bg-pink-500/10' },
    { name: 'Cloud Functions', category: 'Serverless', color: 'border-red-500/40 text-red-300 bg-red-500/10' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* Fondo global con textura */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-red-700/8 rounded-full blur-3xl"></div>
      </div>

      {/* ===== NAV ===== */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <AlertTriangleIcon />
            </div>
            <span className="font-black text-lg tracking-tight">
              Ba<span className="text-orange-400">chi</span>
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:block">Chiapas</span>
          </div>
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            {['problema', 'solucion', 'funcionalidades', 'tecnologias', 'equipo'].map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="hover:text-orange-400 transition-colors capitalize">
                {s === 'solucion' ? 'Solución' : s === 'tecnologias' ? 'Tecnologías' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
         
          {/* Hamburger */}
          <button className="md:hidden text-slate-400" onClick={() => setMenuOpen(!menuOpen)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              {menuOpen
                ? <path d="M18 6L6 18M6 6l12 12"/>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2 bg-slate-950/95">
            {['problema', 'solucion', 'funcionalidades', 'tecnologias', 'equipo'].map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="block w-full text-left py-2 text-slate-300 hover:text-orange-400 transition-colors capitalize">
                {s}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-6">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
              Proyecto Integrador · 9° Cuatrimestre · Mayo–Agosto 2026
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-4">
              Ba
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">chi</span>
              <br />
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
              Plataforma ciudadana de reporte de incidencias viales con <strong className="text-white">geolocalización en tiempo real</strong> — conectando a ciudadanos con autoridades para vías más seguras.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => scrollTo('solucion')}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-all shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 duration-200"
              >
                Explorar la App
              </button>
              <button
                onClick={() => scrollTo('problema')}
                className="px-6 py-3 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2"
              >
                Ver Problemática <ArrowDownIcon />
              </button>
            </div>
            {/* Tech pills */}
            <div className="flex flex-wrap gap-2">
              {['Flutter', 'Firebase', 'Google Maps', 'Dart'].map(t => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">{t}</span>
              ))}
            </div>
          </div>
          {/* Phone mockup */}
          <div className="flex justify-center">
            <MockPhone />
          </div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce">
          <ArrowDownIcon />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 122, suffix: '', label: 'Municipios en Chiapas' },
            { value: 35, suffix: '%', label: 'Carreteras en mal estado' },
            { value: 5, suffix: '', label: 'Tipos de incidencias' },
            { value: 3, suffix: '', label: 'Tipos de usuario' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-black text-orange-400 mb-1">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <p className="text-slate-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROBLEMÁTICA ===== */}
      <section id="problema" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-4">
              <AlertTriangleIcon /> El Problema
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Una brecha entre<br />
              <span className="text-red-400">ciudadanos y gobierno</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Chiapas lidera el rezago en infraestructura vial a nivel nacional. Las lluvias, deslaves y falta de mantenimiento generan riesgos constantes — pero no existe un canal digital eficaz para reportarlos.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '📞', title: 'Reportes sin seguimiento', desc: 'Llamadas telefónicas que no generan ninguna acción institucional verificable ni registro de estado.' },
              { icon: '🗂️', title: 'Burocracia presencial', desc: 'Formularios físicos y trámites en persona que desincentivan la participación ciudadana.' },
              { icon: '🚗', title: 'Accidentes evitables', desc: 'Zonas con daños no reportados formalmente acumulan incidentes viales que podrían prevenirse.' },
              { icon: '📊', title: 'Sin datos para priorizar', desc: 'Los recursos de mantenimiento se asignan sin información real sobre las zonas más críticas.' },
            ].map((p, i) => (
              <div key={i} className="flex gap-4 p-6 bg-red-500/5 border border-red-500/10 rounded-2xl hover:border-red-500/20 transition-colors">
                <span className="text-3xl flex-shrink-0">{p.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUCIÓN ===== */}
      <section id="solucion" className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold mb-4">
              <ShieldIcon /> La Solución
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Tecnología cívica al<br />
              <span className="text-orange-400">servicio de Chiapas</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Una app multiplataforma (Android) que democratiza la participación ciudadana y provee a las autoridades un panel de gestión basado en datos en tiempo real.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <CameraIcon />, title: 'Reporta en segundos', desc: 'Foto + categoría + geolocalización GPS automática. Sin trámites burocráticos.' },
              { icon: <MapPinIcon />, title: 'Mapa interactivo', desc: 'Visualiza todos los reportes activos con filtros por tipo, municipio y estado.' },
              { icon: <BellIcon />, title: 'Notificaciones push', desc: 'El ciudadano recibe alertas cuando su reporte cambia de estado.' },
              { icon: <BarChartIcon />, title: 'Mapa de calor', desc: 'Identifica zonas críticas para priorizar intervenciones de mantenimiento.' },
            ].map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FUNCIONALIDADES ===== */}
      <section id="funcionalidades" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
              <SmartphoneIcon /> Funcionalidades
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Diseñada para <span className="text-blue-400">todos</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">Tres perfiles de usuario con acceso adaptado a sus necesidades.</p>
          </div>
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {Object.entries(userTabs).map(([key, tab]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === key
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6">
            <ul className="space-y-3">
              {userTabs[activeTab].items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </div>
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tipos de incidencia */}
          <div className="mt-16">
            <h3 className="text-center text-2xl font-bold mb-8">Tipos de incidencia reportables</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { type: 'bache', label: 'Bache', color: 'border-red-500/30 bg-red-500/5' },
                { type: 'derrumbe', label: 'Derrumbe', color: 'border-amber-500/30 bg-amber-500/5' },
                { type: 'señalizacion', label: 'Señalización', color: 'border-yellow-500/30 bg-yellow-500/5' },
                { type: 'inundacion', label: 'Inundación', color: 'border-blue-500/30 bg-blue-500/5' },
                { type: 'otro', label: 'Otro', color: 'border-slate-500/30 bg-slate-500/5' },
              ].map(({ type, label, color }) => (
                <div key={type} className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${color}`}>
                  <RoadDamageIcon type={type} />
                  <span className="text-white font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FLUJO ===== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">¿Cómo funciona?</h2>
            <p className="text-slate-400">El ciclo completo de un reporte ciudadano</p>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-amber-500 to-green-500 hidden md:block"></div>
            <div className="space-y-8">
              {[
                { num: '01', icon: '📸', title: 'El ciudadano detecta una incidencia', desc: 'Abre la app, toma una foto y selecciona la categoría del daño (bache, derrumbe, señalización, etc.).' },
                { num: '02', icon: '📍', title: 'Geolocalización automática', desc: 'El GPS del dispositivo captura la ubicación exacta. El ciudadano puede ajustar el pin si lo necesita.' },
                { num: '03', icon: '📤', title: 'Reporte enviado con folio', desc: 'La incidencia se sube a Firebase con foto, coordenadas, categoría y un número de folio único.' },
                { num: '04', icon: '🗺️', title: 'Aparece en el mapa en tiempo real', desc: 'El reporte es visible para todos los usuarios en el mapa interactivo, con filtros por categoría y zona.' },
                { num: '05', icon: '🛠️', title: 'La autoridad gestiona el reporte', desc: 'El administrador actualiza el estado: Pendiente → En Proceso → Resuelto desde el panel.' },
                { num: '06', icon: '✅', title: 'El ciudadano recibe notificación', desc: 'Push notification al dispositivo informando el cambio de estado de su reporte.' },
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-start pl-0 md:pl-14 relative">
                  <div className="absolute left-0 top-3 w-12 h-12 rounded-full bg-slate-900 border-2 border-orange-500 flex items-center justify-center text-orange-400 font-black text-xs hidden md:flex">
                    {step.num}
                  </div>
                  <div className="flex gap-4 bg-white/3 border border-white/8 rounded-2xl p-5 w-full hover:bg-white/5 transition-colors">
                    <span className="text-2xl flex-shrink-0">{step.icon}</span>
                    <div>
                      <h4 className="font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== JUSTIFICACIÓN ===== */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">¿Por qué Bachi?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '⚙️', color: 'from-cyan-500 to-blue-500', title: 'Técnico', desc: 'Flutter permite una única base de código para Android. Firebase elimina la necesidad de servidor propio y garantiza escalabilidad desde día uno.' },
              { icon: '🤝', color: 'from-orange-500 to-amber-500', title: 'Social', desc: 'Chiapas ocupa los últimos lugares en infraestructura vial. La participación ciudadana es una estrategia reconocida para reducir accidentes y mejorar la respuesta gubernamental.' },
              { icon: '🏛️', color: 'from-green-500 to-teal-500', title: 'Institucional', desc: 'Se alinea con los principios de gobierno abierto y transparencia, generando datos geolocalizados para la planeación municipal y la rendición de cuentas.' },
            ].map((j, i) => (
              <div key={i} className="text-center p-8 bg-white/3 border border-white/8 rounded-3xl hover:border-white/15 transition-colors">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${j.color} flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg`}>
                  {j.icon}
                </div>
                <h3 className="font-black text-xl mb-3">{j.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{j.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EQUIPO / CTA ===== */}
      <section id="equipo" className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-6">
            <UsersIcon /> Proyecto Integrador
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Construyendo el futuro<br />
            <span className="text-orange-400">vial de Chiapas</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Proyecto Integrador de 3er Ciclo — 9° Cuatrimestre<br />
            Periodo: <strong className="text-white">Mayo – Agosto 2026</strong>
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-10 text-sm">
            {[
              { label: 'Categoría', value: 'Social / Impacto comunitario' },
              { label: 'Plataforma', value: 'Android (Flutter)' },
              { label: 'Backend', value: 'Firebase (Google Cloud)' },
            ].map((d, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-slate-500 text-xs mb-1">{d.label}</div>
                <div className="text-white font-semibold">{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="contacto" className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
              <AlertTriangleIcon />
            </div>
            <span className="font-bold text-slate-300">Bachi Chiapas</span>
          </div>
          <p>Proyecto Integrador · 9° Cuatrimestre · Mayo–Agosto 2026</p>
          <div className="flex items-center gap-2">
            <FlameIcon />
          </div>
        </div>
      </footer>
    </div>
  )
}