import { useEffect, useRef, useState } from 'react'
import { Activity, CircleDot, Cpu, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const diagnosticCards = ['후성유전 나이', '마이크로바이옴 점수', '코르티솔 최적화']
const telemetryMessages = ['일주기 리듬 최적화 중...', '신경-내분비 노이즈 정렬 중...', '회복 탄성 메타볼릭 패턴 계산 중...']
const weekDays = ['일', '월', '화', '수', '목', '금', '토']

function SlideButton({ children, className = '' }) {
  return (
    <button
      className={`group relative overflow-hidden rounded-soft border px-6 py-3 text-sm font-semibold tracking-[0.08em] transition-transform duration-500 hover:scale-[1.03] ${className}`}
    >
      <span className="absolute inset-0 translate-y-full bg-clay transition-transform duration-500 group-hover:translate-y-0" />
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default function App() {
  const navRef = useRef(null)
  const appRef = useRef(null)
  const philosophyRef = useRef(null)
  const [diagIndex, setDiagIndex] = useState(0)
  const [telemetryIndex, setTelemetryIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDiagIndex((prev) => (prev + 1) % diagnosticCards.length)
      setTelemetryIndex((prev) => (prev + 1) % telemetryMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 70,
        opacity: 0,
        stagger: 0.17,
        duration: 1.4,
        ease: 'power3.out'
      })

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top -40',
        onEnter: () => navRef.current?.classList.add('scrolled'),
        onLeaveBack: () => navRef.current?.classList.remove('scrolled')
      })

      gsap.from('.manifest-reveal', {
        yPercent: 120,
        opacity: 0,
        stagger: 0.2,
        duration: 1.25,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: 'top 65%'
        }
      })

      const stackCards = gsap.utils.toArray('.stack-card')
      stackCards.forEach((card, index) => {
        if (index === stackCards.length - 1) return
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(20px)',
          transformOrigin: 'center center',
          scrollTrigger: {
            trigger: stackCards[index + 1],
            start: 'top 80%',
            end: 'top 35%',
            scrub: true
          }
        })
      })

      gsap.to('.helix-outer', { rotate: 360, repeat: -1, ease: 'none', duration: 12 })
      gsap.to('.helix-inner', { rotate: -360, repeat: -1, ease: 'none', duration: 8 })
      gsap.to('.laser-scan', { xPercent: 260, repeat: -1, duration: 2.4, yoyo: true, ease: 'sine.inOut' })
      gsap.fromTo('.ekg-line', { strokeDashoffset: 350 }, { strokeDashoffset: 0, repeat: -1, duration: 2.7, ease: 'none' })
      gsap.fromTo('.cursor-protocol', { x: 0 }, { x: 280, duration: 3, repeat: -1, yoyo: true, ease: 'power1.inOut' })
      gsap.fromTo('.save-fade', { opacity: 1 }, { opacity: 0.2, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }, appRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={appRef} className="bg-cream text-charcoal">
      <nav
        ref={navRef}
        className="floating-nav fixed left-1/2 top-6 z-50 flex w-[min(92vw,960px)] -translate-x-1/2 items-center justify-between rounded-full px-5 py-4 text-white transition-all duration-500 md:px-8"
      >
        <span className="text-sm font-semibold tracking-[0.2em]">NURA HEALTH</span>
        <div className="hidden gap-6 text-xs uppercase md:flex">
          <a href="#features">Features</a>
          <a href="#philosophy">Philosophy</a>
          <a href="#protocols">Protocols</a>
          <a href="#membership">Membership</a>
        </div>
        <SlideButton className="border-white/40 text-xs">진단 시작</SlideButton>
      </nav>

      <section className="relative flex h-[100dvh] items-end overflow-hidden rounded-b-softer px-[8vw] pb-[12vh] text-cream">
        <img
          src="https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=2200&q=80"
          alt="숲의 어두운 텍스처"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-moss/90 to-moss/25" />
        <div className="relative z-10 ml-0 max-w-5xl space-y-4 md:ml-[4vw]">
          <p className="hero-stagger font-mono text-xs tracking-[0.28em] text-cream/80">HIGH-END ORGANIC TECH · CLINIC BOUTIQUE</p>
          <h1 className="hero-stagger text-5xl font-extrabold leading-[0.88] tracking-tightest md:text-8xl">자연이</h1>
          <h2 className="hero-stagger font-serifAccent text-6xl italic leading-none md:text-[9rem]">알고리즘이다.</h2>
          <p className="hero-stagger max-w-xl text-base text-cream/85 md:text-lg">
            생물학 신호를 임상적 해상도의 결정으로 전환하는 오케스트레이션 엔진. Nura는 몸의 언어를 읽고 삶의 리듬을 설계합니다.
          </p>
        </div>
      </section>

      <section id="features" className="mx-auto grid w-[min(93vw,1320px)] gap-6 py-24 md:grid-cols-3">
        <article className="rounded-softer bg-moss p-8 text-cream">
          <p className="mb-6 flex items-center gap-2 text-xs tracking-[0.18em]"><Cpu size={16} />진단 셔플러</p>
          <div className="relative h-52 overflow-hidden rounded-soft border border-white/15 bg-white/5 p-4">
            {diagnosticCards.map((label, index) => {
              const delta = (index - diagIndex + diagnosticCards.length) % diagnosticCards.length
              const yMap = ['translate-y-0', 'translate-y-[72px]', '-translate-y-[72px]']
              return (
                <div
                  key={label}
                  className={`absolute left-4 right-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 font-semibold transition-all duration-700 ${
                    delta === 0 ? `${yMap[0]} opacity-100` : delta === 1 ? `${yMap[1]} opacity-45` : `${yMap[2]} opacity-25`
                  }`}
                >
                  {label}
                </div>
              )
            })}
          </div>
        </article>

        <article className="rounded-softer border border-moss/15 bg-white p-8">
          <p className="mb-6 flex items-center gap-2 text-xs tracking-[0.18em] text-moss"><Activity size={16} />텔레메트리 타이프라이터</p>
          <div className="rounded-soft bg-charcoal p-6 font-mono text-cream">
            <span>{telemetryMessages[telemetryIndex]}</span>
            <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-clay align-middle" />
            <div className="mt-4 flex items-center gap-2 text-xs text-cream/70">
              <CircleDot size={12} className="text-clay" />
              Live Feed
            </div>
          </div>
        </article>

        <article className="rounded-softer border border-moss/15 bg-white p-8">
          <p className="mb-6 flex items-center gap-2 text-xs tracking-[0.18em] text-moss"><Sparkles size={16} />목 커서 프로토콜 스케줄러</p>
          <div className="grid grid-cols-7 gap-2 text-center font-mono text-[11px]">
            {weekDays.map((day, idx) => (
              <div key={day} className={`rounded-xl px-1 py-3 ${idx === 4 ? 'bg-clay text-cream' : 'bg-cream text-charcoal/80'}`}>
                {day}
              </div>
            ))}
          </div>
          <div className="relative mt-6 h-12 overflow-hidden rounded-soft bg-cream">
            <svg className="cursor-protocol absolute left-2 top-2 h-8 w-8" viewBox="0 0 24 24">
              <path fill="#2E4036" d="M5 3l14 8-6 2-2 6z" />
            </svg>
            <button className="save-fade absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-moss px-4 py-2 text-xs text-cream">SAVE</button>
          </div>
        </article>
      </section>

      <section id="philosophy" ref={philosophyRef} className="relative overflow-hidden rounded-softer bg-charcoal px-[8vw] py-28 text-cream">
        <div className="organic-texture" />
        <div className="relative z-10 space-y-8 text-3xl font-semibold leading-[1.08] md:text-6xl">
          <p className="overflow-hidden"><span className="manifest-reveal inline-block">현대 의학은 묻는다: 무엇이 잘못되었는가?</span></p>
          <p className="overflow-hidden"><span className="manifest-reveal inline-block font-serifAccent text-clay italic">우리는 묻는다: 무엇이 최적인가?</span></p>
        </div>
      </section>

      <section id="protocols" className="mx-auto w-[min(95vw,1420px)] space-y-16 py-24">
        <article className="stack-card sticky top-14 flex min-h-[88vh] items-center rounded-softer border border-moss/20 bg-white p-10 shadow-xl md:p-14">
          <div className="mx-auto text-center">
            <h3 className="mb-8 text-xl font-semibold tracking-[0.12em] text-moss">ROTARY DOUBLE HELIX GEAR</h3>
            <div className="relative mx-auto h-64 w-64">
              <div className="helix-outer absolute inset-0 rounded-full border-4 border-dashed border-moss/60" />
              <div className="helix-inner absolute inset-8 rounded-full border-4 border-clay/70" />
            </div>
          </div>
        </article>

        <article className="stack-card sticky top-14 flex min-h-[88vh] items-center rounded-softer border border-moss/20 bg-white p-10 shadow-xl md:p-14">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h3 className="mb-8 text-xl font-semibold tracking-[0.12em] text-moss">LASER SCAN ON MEDICAL CELL GRID</h3>
            <div className="relative mx-auto h-64 overflow-hidden rounded-softer bg-moss/10">
              <div className="absolute inset-0 bg-[radial-gradient(#2E4036_1px,transparent_1px)] [background-size:22px_22px]" />
              <div className="laser-scan absolute left-[-40%] top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-clay/70 to-transparent" />
            </div>
          </div>
        </article>

        <article className="stack-card sticky top-14 flex min-h-[88vh] items-center rounded-softer border border-moss/20 bg-white p-10 shadow-xl md:p-14">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h3 className="mb-8 text-xl font-semibold tracking-[0.12em] text-moss">PULSE EKG WAVEFORM</h3>
            <svg className="mx-auto h-60 w-full max-w-3xl" viewBox="0 0 360 100">
              <path
                className="ekg-line"
                d="M0 60 L60 60 L86 25 L110 78 L135 18 L165 60 L212 60 L238 36 L264 82 L302 60 L360 60"
                fill="none"
                stroke="#2E4036"
                strokeWidth="4"
                strokeDasharray="350"
              />
            </svg>
          </div>
        </article>
      </section>

      <section id="membership" className="mx-auto w-[min(92vw,1240px)] py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {['Foundation', 'Performance', 'Sovereign'].map((tier, idx) => (
            <article key={tier} className={`rounded-softer border p-8 ${idx === 1 ? 'border-moss bg-moss text-cream' : 'border-moss/20 bg-white text-charcoal'}`}>
              <h3 className="text-2xl font-semibold">{tier}</h3>
              <p className="mt-4 font-mono text-sm">{idx === 0 ? '₩390,000/mo' : idx === 1 ? '₩760,000/mo' : '₩1,420,000/mo'}</p>
              <p className="mt-4 text-sm opacity-80">{idx === 1 ? '최적화 코어 + 라이브 의료 코칭' : '정밀 데이터 리포트 & 주기별 프로토콜'}</p>
              <SlideButton className={`mt-8 w-full ${idx === 1 ? 'border-clay text-cream' : 'border-moss/30 text-moss'}`}>Join Protocol</SlideButton>
            </article>
          ))}
        </div>
      </section>

      <footer className="rounded-t-topHuge bg-charcoal px-[8vw] py-12 text-cream">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm tracking-[0.18em]">NURA HEALTH SYSTEM CORE</p>
          <p className="flex items-center gap-2 font-mono text-xs text-green-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />시스템 정상 가동
          </p>
        </div>
      </footer>
    </main>
  )
}
