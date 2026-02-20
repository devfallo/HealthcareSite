import { useEffect, useRef, useState } from 'react'
import { Activity, CircleDot, Cpu, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const diagnostics = ['후성유전 나이', '마이크로바이옴 점수', '코르티솔 최적화']
const telemetryMessages = ['일주기 리듬 최적화 중...', '염증 신호 재보정 중...', '회복 탄력성 프로파일 업데이트 중...']

function Button({ children, className = '' }) {
  return (
    <button className={`group relative overflow-hidden rounded-soft border border-white/30 px-6 py-3 text-sm font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.03] ${className}`}>
      <span className="pointer-events-none absolute inset-0 translate-y-full bg-clay/80 transition-transform duration-500 group-hover:translate-y-0" />
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default function App() {
  const navRef = useRef(null)
  const heroRef = useRef(null)
  const philosophyRef = useRef(null)
  const protocolsRef = useRef(null)
  const [activeDiag, setActiveDiag] = useState(0)
  const [activeMessage, setActiveMessage] = useState(0)

  useEffect(() => {
    const diagInterval = setInterval(() => setActiveDiag((v) => (v + 1) % diagnostics.length), 3000)
    const telemetryInterval = setInterval(() => setActiveMessage((v) => (v + 1) % telemetryMessages.length), 2400)
    return () => {
      clearInterval(diagInterval)
      clearInterval(telemetryInterval)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-item', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      })

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -40',
        onEnter: () => navRef.current?.classList.add('scrolled'),
        onLeaveBack: () => navRef.current?.classList.remove('scrolled')
      })

      gsap.from('.manifest-line', {
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: 'top center+=120'
        },
        yPercent: 140,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power4.out'
      })

      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(20px)',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1
          }
        })
      })

      gsap.to('.helix', {
        rotation: 360,
        repeat: -1,
        duration: 12,
        ease: 'none'
      })
      gsap.to('.laser-line', {
        xPercent: 220,
        repeat: -1,
        duration: 3,
        yoyo: true,
        ease: 'sine.inOut'
      })
      gsap.fromTo('.ekg-path', { strokeDashoffset: 280 }, { strokeDashoffset: 0, repeat: -1, duration: 2.3, ease: 'none' })
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="bg-cream text-charcoal">
      <nav ref={navRef} className="floating-nav fixed left-1/2 top-6 z-50 flex w-[min(90vw,920px)] -translate-x-1/2 items-center justify-between rounded-full px-6 py-4 text-white transition-all duration-500">
        <span className="text-sm font-semibold tracking-[0.2em]">NURA HEALTH</span>
        <div className="hidden gap-6 text-xs uppercase md:flex">
          <a href="#features">Features</a>
          <a href="#philosophy">Philosophy</a>
          <a href="#protocols">Protocols</a>
          <a href="#membership">Membership</a>
        </div>
        <Button className="text-xs">진단 시작</Button>
      </nav>

      <section ref={heroRef} className="relative flex h-[100dvh] items-end overflow-hidden rounded-b-softer px-[8vw] pb-[10vh] text-cream">
        <img src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=80" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-moss/85 to-moss/20" />
        <div className="relative z-10 max-w-4xl space-y-5">
          <p className="hero-item font-mono text-xs tracking-[0.3em] text-cream/80">ORGANIC TECHNOLOGY · CLINIQUE BOUTIQUE</p>
          <h1 className="hero-item text-5xl font-bold leading-[0.9] tracking-tightest md:text-8xl">자연이</h1>
          <h2 className="hero-item font-serifAccent text-6xl italic leading-none md:text-9xl">알고리즘이다.</h2>
          <p className="hero-item max-w-xl text-base text-cream/90 md:text-lg">생물학의 신호를 임상 수준 데이터 오케스트레이션으로 전환합니다. Nura는 신체의 언어를 읽고, 생활의 리듬을 설계합니다.</p>
        </div>
      </section>

      <section id="features" className="mx-auto grid w-[min(92vw,1300px)] gap-6 py-24 md:grid-cols-3">
        <article className="rounded-softer bg-moss p-8 text-cream">
          <p className="mb-6 flex items-center gap-2 text-xs tracking-[0.18em]"><Cpu size={16} />진단 셔플러</p>
          <div className="space-y-4 font-semibold">
            {diagnostics.map((item, i) => (
              <div key={item} className={`rounded-soft border border-white/20 px-5 py-4 transition-all duration-500 ${i === activeDiag ? 'translate-y-0 bg-white/20 opacity-100' : 'translate-y-4 opacity-40'}`}>{item}</div>
            ))}
          </div>
        </article>

        <article className="rounded-softer border border-moss/10 bg-white p-8">
          <p className="mb-6 flex items-center gap-2 text-xs tracking-[0.18em] text-moss"><Activity size={16} />텔레메트리 타이프라이터</p>
          <div className="rounded-soft bg-charcoal p-6 font-mono text-cream">
            <span>{telemetryMessages[activeMessage]}</span>
            <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-clay align-middle" />
            <div className="mt-4 flex items-center gap-2 text-xs text-cream/70"><CircleDot size={12} className="text-clay" />Live Feed</div>
          </div>
        </article>

        <article className="rounded-softer border border-moss/10 bg-white p-8">
          <p className="mb-6 flex items-center gap-2 text-xs tracking-[0.18em] text-moss"><Sparkles size={16} />목 커서 프로토콜 스케줄러</p>
          <div className="grid grid-cols-7 gap-2 text-center font-mono text-[11px]">
            {['일', '월', '화', '수', '목', '금', '토'].map((d, idx) => (
              <div key={d} className={`rounded-xl px-1 py-3 ${idx === 4 ? 'bg-clay text-cream' : 'bg-cream'}`}>{d}</div>
            ))}
          </div>
          <div className="mt-5 relative h-10 overflow-hidden rounded-soft bg-cream">
            <svg className="absolute left-2 top-1 h-8 w-8 animate-[cursorPath_3s_ease-in-out_infinite]" viewBox="0 0 24 24"><path fill="#2E4036" d="M5 3l14 8-6 2-2 6z"/></svg>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-moss px-4 py-2 text-xs text-cream animate-[fadeOut_3s_ease-in-out_infinite]">SAVE</button>
          </div>
        </article>
      </section>

      <section id="philosophy" ref={philosophyRef} className="relative overflow-hidden rounded-softer bg-charcoal px-[8vw] py-28 text-cream">
        <div className="organic-texture" />
        <div className="relative z-10 space-y-6 text-3xl font-semibold md:text-6xl">
          <p className="manifest-line overflow-hidden">현대 의학은 묻는다: 무엇이 잘못되었는가?</p>
          <p className="manifest-line overflow-hidden font-serifAccent text-clay italic">우리는 묻는다: 무엇이 최적인가?</p>
        </div>
      </section>

      <section id="protocols" ref={protocolsRef} className="relative mx-auto w-[min(95vw,1400px)] space-y-16 py-24">
        {[1, 2, 3].map((id) => (
          <article key={id} className="protocol-card sticky top-14 flex min-h-[85vh] items-center rounded-softer border border-moss/20 bg-white p-10 shadow-xl md:p-14">
            {id === 1 && <div className="helix mx-auto h-64 w-64 rounded-full border-4 border-dashed border-moss/50" />}
            {id === 2 && <div className="relative mx-auto h-64 w-full max-w-xl overflow-hidden rounded-soft bg-moss/10"><div className="absolute inset-0 bg-[radial-gradient(#2E4036_1px,transparent_1px)] [background-size:20px_20px]" /><div className="laser-line absolute left-[-40%] top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-clay/70 to-transparent" /></div>}
            {id === 3 && <svg className="mx-auto h-60 w-full max-w-xl" viewBox="0 0 320 100"><path className="ekg-path" d="M0 60 L50 60 L70 30 L90 75 L120 20 L150 60 L200 60 L230 40 L250 80 L280 60 L320 60" fill="none" stroke="#2E4036" strokeWidth="4" strokeDasharray="280" /></svg>}
          </article>
        ))}
      </section>

      <section id="membership" className="mx-auto w-[min(92vw,1200px)] py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {['Foundation', 'Performance', 'Sovereign'].map((tier, idx) => (
            <article key={tier} className={`rounded-softer border p-8 ${idx === 1 ? 'border-moss bg-moss text-cream' : 'border-moss/20 bg-white'}`}>
              <h3 className="text-2xl font-semibold">{tier}</h3>
              <p className="mt-4 font-mono text-sm">{idx === 0 ? '₩390,000/mo' : idx === 1 ? '₩760,000/mo' : '₩1,420,000/mo'}</p>
              <Button className={`mt-8 w-full ${idx === 1 ? 'border-clay text-cream' : 'border-moss text-moss'}`}>Join Protocol</Button>
            </article>
          ))}
        </div>
      </section>

      <footer className="rounded-t-topHuge bg-charcoal px-[8vw] py-12 text-cream">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm tracking-[0.18em]">NURA HEALTH SYSTEM CORE</p>
          <p className="flex items-center gap-2 text-xs font-mono text-green-400"><span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />시스템 정상 가동</p>
        </div>
      </footer>
    </main>
  )
}
