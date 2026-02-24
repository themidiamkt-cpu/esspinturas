import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CircleCheckBig,
  ClipboardList,
  FileCheck2,
  HardHat,
  LayoutGrid,
  MapPinned,
  MessageCircle,
  PaintRoller,
  ShieldCheck,
  Star,
  Waypoints,
  Wrench
} from "lucide-react";

const PHONE = "+55 11 99999-9999";
const WHATSAPP_NUMBER = "5511999999999";
const TARGET_AREA = "Estado de São Paulo";
const BRAND_NAME = "Ess Pinturas";

const navLinks = [
  { label: "Método", href: "#metodo" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Atendimento", href: "#atendimento" },
  { label: "Vistoria", href: "#vistoria" }
];

const authorityStats = [
  "50 Obras Executadas",
  "Atendemos em toda SP",
  "Responsável Técnico com CREA",
  "Garantia formal por contrato"
];

const logoPlaceholders = [
  "LOGO CLIENTE 01",
  "LOGO CLIENTE 02",
  "LOGO CLIENTE 03",
  "LOGO CLIENTE 04",
  "LOGO CLIENTE 05",
  "LOGO CLIENTE 06"
];

const testimonials = [
  {
    role: "Síndico Profissional",
    text: "A obra foi executada com prédio ocupado, cronograma controlado e comunicação técnica semanal. Reduzimos retrabalho e ganhamos previsibilidade.",
    author: "Condomínio Empresarial | São Paulo - SP"
  },
  {
    role: "Administradora de Condomínios",
    text: "A diferença foi o método: diagnóstico, sistema de pintura correto e entrega com garantia formal. Estrutura real para atender todo o estado de São Paulo.",
    author: "Gestora Regional | Interior de SP"
  }
];

const failurePoints = [
  {
    title: "Falta de preparo técnico",
    erro: "Diagnóstico superficial e início sem plano de intervenção.",
    consequencia: "Descascamento precoce e aumento de manutenção corretiva.",
    solucao: "Inspeção detalhada, ensaios de aderência e planejamento técnico por frente." 
  },
  {
    title: "Sistema de pintura inadequado",
    erro: "Produto definido por preço e não por substrato ou exposição.",
    consequencia: "Perda rápida de desempenho estético e proteção insuficiente.",
    solucao: "Especificação do sistema conforme base, clima e criticidade da fachada."
  },
  {
    title: "Ausência de tratamento de fissuras",
    erro: "Fissuras recebem apenas pintura de acabamento.",
    consequencia: "Retorno de infiltração, manchas e degradação da superfície.",
    solucao: "Tratamento técnico de fissuras antes da pintura final."
  },
  {
    title: "Impermeabilização insuficiente",
    erro: "Selagem incompleta e falta de proteção em pontos críticos.",
    consequencia: "Umidade recorrente, bolhas e patologias em ciclo curto.",
    solucao: "Camada de impermeabilização compatível com o sistema adotado."
  },
  {
    title: "Execução sem responsável técnico",
    erro: "Obra sem governança técnica e controle documentado.",
    consequencia: "Risco jurídico, qualidade inconsistente e baixa rastreabilidade.",
    solucao: "Condução com responsável técnico, ART e checklist de qualidade."
  }
];

const methodSteps = [
  "Inspeção e diagnóstico técnico",
  "Planejamento estrutural",
  "Preparação de superfície",
  "Tratamento de fissuras",
  "Sistema de pintura adequado",
  "Controle técnico de qualidade",
  "Entrega com garantia formal"
];

const services = [
  {
    title: "Pintura de Fachadas Comerciais",
    paraQuem: "Empresas, centros comerciais e galpões corporativos.",
    inclui: "Diagnóstico, especificação do sistema e execução por fases.",
    evita: "Paradas longas, perda de padrão visual e repintura precoce.",
    cta: "Solicitar escopo comercial",
    icon: Building2
  },
  {
    title: "Pintura Externa de Condomínios",
    paraQuem: "Condomínios residenciais e multiuso de médio e grande porte.",
    inclui: "Plano de obra para prédio ocupado e controle de comunicação.",
    evita: "Conflito operacional, retrabalho e inconsistência de acabamento.",
    cta: "Solicitar escopo para condomínio",
    icon: PaintRoller
  },
  {
    title: "Recuperação de Superfície",
    paraQuem: "Fachadas com desgaste, fissuras aparentes e perda de aderência.",
    inclui: "Tratamento técnico, regularização e reforço de base.",
    evita: "Falha estrutural leve e degradação antecipada da pintura.",
    cta: "Solicitar diagnóstico de superfície",
    icon: Wrench
  },
  {
    title: "Impermeabilização de Fachada",
    paraQuem: "Edifícios com histórico de umidade e infiltração externa.",
    inclui: "Selagem, proteção de pontos críticos e compatibilização de camadas.",
    evita: "Bolhas, manchas e custo recorrente de manutenção corretiva.",
    cta: "Solicitar plano de impermeabilização",
    icon: ShieldCheck
  },
  {
    title: "Trabalho em Altura NR-35",
    paraQuem: "Torres, fachadas altas e ativos com acesso crítico.",
    inclui: "Equipe certificada, protocolos de segurança e rastreabilidade.",
    evita: "Risco operacional, interrupções e não conformidade técnica.",
    cta: "Solicitar vistoria em altura",
    icon: HardHat
  }
];

const portfolioFilters = ["Todos", "Condomínio", "Comercial", "Corporativo", "Altura"];

const portfolioItems = [
  {
    city: "São Paulo - SP",
    type: "Corporativo",
    area: "12.800 m²",
    result: "Redução de retrabalho e padrão visual corporativo.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    city: "Campinas - SP",
    type: "Condomínio",
    area: "9.400 m²",
    result: "Execução com prédio ocupado e cronograma estável.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    city: "Santos - SP",
    type: "Comercial",
    area: "7.900 m²",
    result: "Fachada protegida contra umidade e insolação intensa.",
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    city: "Sorocaba - SP",
    type: "Altura",
    area: "10.300 m²",
    result: "Operação NR-35 com zero ocorrência e entrega técnica.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
  },
  {
    city: "Ribeirão Preto - SP",
    type: "Condomínio",
    area: "8.100 m²",
    result: "Recuperação de superfície com maior durabilidade.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80"
  },
  {
    city: "São José dos Campos - SP",
    type: "Corporativo",
    area: "11.600 m²",
    result: "Entrega por etapas sem impacto crítico na operação.",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80"
  }
];

const regions = [
  "Capital e Grande São Paulo",
  "Campinas e Região Metropolitana",
  "Baixada Santista e Litoral",
  "Vale do Paraíba",
  "Sorocaba e Região",
  "Ribeirão Preto e Região"
];

const faqItems = [
  {
    question: "Como funciona atendimento fora da capital?",
    answer:
      "Atuamos em todo o estado de São Paulo com mobilização planejada por região, cronograma técnico validado antes do início e coordenação central para manter padrão único de execução."
  },
  {
    question: "Vocês emitem ART?",
    answer:
      "Sim. A emissão de ART é parte da governança técnica da obra, com responsável técnico habilitado e documentação vinculada ao escopo contratado."
  },
  {
    question: "Como funciona a garantia?",
    answer:
      "A garantia é formalizada em contrato, com critérios objetivos de cobertura, prazo e responsabilidades definidas para assegurar previsibilidade ao cliente."
  },
  {
    question: "Qual o prazo médio de uma obra predial?",
    answer:
      "Depende de área, complexidade e nível de preparação de superfície. Após diagnóstico técnico, apresentamos prazo por fase e marcos de controle."
  },
  {
    question: "Vocês trabalham com prédio ocupado?",
    answer:
      "Sim. Nosso planejamento considera circulação, ruído, isolamento e comunicação com gestão predial para manter operação segura durante a execução."
  }
];

const sectionCta = (label = "Agendar Vistoria Técnica") => (
  <div className="mt-8 flex flex-wrap gap-3">
    <a
      href="#vistoria"
      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-300/60 bg-gradient-to-r from-signal to-signalDark px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:-translate-y-1 hover:brightness-110 sm:w-auto sm:px-6 sm:text-sm"
    >
      {label}
      <ArrowUpRight size={18} />
    </a>
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Quero falar com o time técnico da Ess Pinturas.`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-300/60 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink transition hover:bg-ink hover:text-fog sm:w-auto sm:px-6 sm:text-sm"
    >
      Falar com nosso time
      <MessageCircle size={18} />
    </a>
  </div>
);

function App() {
  const pageRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredPortfolio =
    activeFilter === "Todos"
      ? portfolioItems
      : portfolioItems.filter((item) => item.type === activeFilter);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-line", { y: 42, opacity: 0, duration: 0.7, stagger: 0.12 })
        .from(".hero-copy", { y: 26, opacity: 0, duration: 0.62 }, "-=0.28")
        .from(".hero-cta", { y: 18, opacity: 0, duration: 0.55 }, "-=0.2");

      gsap.utils.toArray("[data-reveal]").forEach((section) => {
        gsap.from(section, {
          y: 54,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 84%"
          }
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.title = `Pintura Predial no Estado de São Paulo | ${BRAND_NAME}`;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute(
        "content",
        "Empresa de pintura predial para todo o estado de São Paulo. Execução técnica, NR-35, ART e garantia contratual para condomínios e empresas."
      );
    }
  }, []);

  const schemaData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": "https://alturaprime.com.br/#negocio",
          name: `${BRAND_NAME} — Engenharia em Pintura Predial Comercial`,
          url: "https://alturaprime.com.br/",
          description:
            "Empresa de pintura predial para todo o estado de São Paulo com execução técnica e equipe certificada.",
          telephone: PHONE,
          image:
            "https://images.unsplash.com/photo-1594988930347-30d449190da0?auto=format&fit=crop&w=1600&q=80",
          address: {
            "@type": "PostalAddress",
            addressRegion: "SP",
            addressCountry: "BR"
          },
          areaServed: {
            "@type": "AdministrativeArea",
            name: TARGET_AREA
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              telephone: PHONE,
              availableLanguage: ["pt-BR"],
              areaServed: "BR"
            }
          ]
        },
        {
          "@type": "Service",
          "@id": "https://alturaprime.com.br/#servico-pintura-predial-sao-paulo",
          name: "Pintura Predial e Comercial em Todo o Estado de São Paulo",
          serviceType:
            "Pintura predial no estado de São Paulo, pintura de fachada comercial, impermeabilização e trabalho em altura NR-35",
          provider: {
            "@id": "https://alturaprime.com.br/#negocio"
          },
          areaServed: {
            "@type": "AdministrativeArea",
            name: TARGET_AREA
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: "https://alturaprime.com.br/#vistoria",
            description: "Agendamento de vistoria técnica com diagnóstico especializado para fachadas prediais.",
            seller: {
              "@id": "https://alturaprime.com.br/#negocio"
            }
          }
        },
        {
          "@type": "Offer",
          "@id": "https://alturaprime.com.br/#oferta-vistoria-tecnica",
          category: "Vistoria Técnica",
          description: "Análise técnica de fachada para obras prediais e comerciais em todo o estado de São Paulo.",
          itemOffered: {
            "@id": "https://alturaprime.com.br/#servico-pintura-predial-sao-paulo"
          },
          offeredBy: {
            "@id": "https://alturaprime.com.br/#negocio"
          },
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock"
        }
      ]
    }),
    []
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-fog text-ink">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(46,168,255,0.24),transparent_36%),radial-gradient(circle_at_88%_4%,rgba(20,119,209,0.18),transparent_33%)]" />
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3 sm:top-5 sm:px-4">
        <div className="pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border border-sky-300/55 bg-fog/80 px-3 py-2.5 shadow-brutal backdrop-blur-xl sm:gap-4 sm:px-4 sm:py-3 md:px-6">
          <p className="font-heading text-lg leading-none tracking-[0.04em] sm:text-xl md:text-2xl">{BRAND_NAME}</p>
          <nav className="hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.08em] md:flex lg:gap-5">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-signal">
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#vistoria"
            className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/60 bg-gradient-to-r from-signal to-signalDark px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-fog transition hover:brightness-110 sm:gap-2 sm:px-4 sm:text-xs md:text-sm"
          >
            Agendar Vistoria Técnica
            <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      <main className="pb-24 md:pb-0">
        <section className="relative overflow-hidden border-b border-sky-900/15 pb-16 pt-32 sm:pt-36 md:pt-44">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1594988930347-30d449190da0?auto=format&fit=crop&w=1920&q=80"
              alt="Prédio sendo pintado por equipe técnica em obra de fachada"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(7,19,42,0.88),rgba(7,19,42,0.58),rgba(20,119,209,0.44))]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 md:px-6">
            <div className="max-w-5xl rounded-3xl border border-fog/70 bg-ink/55 p-5 shadow-brutal backdrop-blur-md sm:p-6 md:p-10">
              <h1 className="hero-line max-w-4xl text-2xl font-bold leading-tight text-fog sm:text-3xl md:text-5xl">
                Pintura Predial com Execução Técnica para Condomínios e Empresas em Todo o Estado de São Paulo.
              </h1>
              <p className="hero-copy mt-4 max-w-3xl text-sm leading-relaxed text-fog/95 sm:text-base md:mt-5 md:text-lg">
                Atuação em todo o estado de São Paulo com protocolo técnico certificado, foco em durabilidade,
                proteção estrutural e redução de retrabalho.
              </p>

              <div className="hero-copy mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2">
                {authorityStats.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-fog/35 bg-fog/10 px-4 py-3 text-xs font-semibold text-fog sm:text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="hero-cta mt-8 flex flex-wrap gap-3">
                <a
                  href="#vistoria"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-fog/70 bg-gradient-to-r from-signal to-signalDark px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:brightness-110 sm:w-auto sm:px-6 sm:text-sm"
                >
                  Agendar Vistoria Técnica
                  <ArrowUpRight size={18} />
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-fog/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:bg-fog hover:text-ink sm:w-auto sm:px-6 sm:text-sm"
                >
                  Ver Obras Executadas
                  <LayoutGrid size={18} />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Quero falar com o time técnico da Ess Pinturas.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-fog/70 bg-fog/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:bg-fog hover:text-ink sm:w-auto sm:px-6 sm:text-sm"
                >
                  Falar com nosso time
                  <MessageCircle size={18} />
                </a>
              </div>
              <p className="hero-copy mt-4 text-xs font-medium text-fog/90 sm:text-sm">
                Atendimento em todo o estado de São Paulo.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" data-reveal>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Prova Estrutural e Confiança de Execução</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80">
            Gestão técnica, documentação e governança de obra para contratos prediais de alto impacto.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 md:grid-cols-6">
            {logoPlaceholders.map((logo) => (
              <div
                key={logo}
                className="flex h-16 items-center justify-center rounded-2xl border border-sky-300/55 bg-concrete/85 text-xs font-semibold tracking-[0.08em] text-ink/70"
              >
                {logo}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="grid gap-4 md:grid-cols-2">
              {testimonials.map((item) => (
                <article key={item.author} className="rounded-2xl border border-sky-300/55 bg-white p-6 shadow-brutalSoft">
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/85">{item.text}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink/65">
                    {item.author}
                  </p>
                </article>
              ))}
            </div>

            <aside className="rounded-3xl border border-sky-300/55 bg-gradient-to-b from-signal to-signalDark p-6 text-fog shadow-brutal">
              <h3 className="text-lg font-semibold">Avaliação Média de Atendimento</h3>
              <p className="mt-3 text-4xl font-bold leading-none sm:text-5xl">4.9</p>
              <p className="mt-1 text-sm">Base em projetos corporativos e condominiais.</p>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={18} className="fill-fog text-fog" />
                ))}
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <p className="inline-flex items-center gap-2">
                  <CircleCheckBig size={16} />
                  Relatórios técnicos por etapa
                </p>
                <p className="inline-flex items-center gap-2">
                  <CircleCheckBig size={16} />
                  Governança de prazo e escopo
                </p>
              </div>
            </aside>
          </div>
          {sectionCta()}
        </section>

        <section className="border-y border-sky-900/15 bg-concrete/75 py-16 md:py-24" data-reveal>
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="max-w-3xl text-2xl font-bold sm:text-3xl md:text-4xl">
              Por que grande parte das pinturas prediais falham antes de 3 anos?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80">
              Decisão técnica ruim compromete desempenho, segurança e custo total do ativo.
            </p>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {failurePoints.map((item) => (
                <article key={item.title} className="rounded-2xl border border-sky-300/55 bg-white p-6 shadow-brutalSoft">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed">
                    <p>
                      <span className="font-semibold">Erro:</span> {item.erro}
                    </p>
                    <p>
                      <span className="font-semibold">Consequência:</span> {item.consequencia}
                    </p>
                    <p>
                      <span className="font-semibold">Como resolvemos:</span> {item.solucao}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            {sectionCta("Agendar Diagnóstico Técnico")}
          </div>
        </section>

        <section id="metodo" className="border-b border-sky-900/15 bg-ink py-16 text-fog md:py-24" data-reveal>
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Protocolo Paulista Prime 7X - Execução Técnica em 7 Etapas</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-fog/85">
              Estrutura proprietária para padronizar qualidade em obras prediais em todo o estado de São Paulo.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {methodSteps.map((step, index) => (
                <article key={step} className="rounded-2xl border border-sky-300/40 bg-fog/10 p-5">
                  <p className="text-4xl font-bold text-signal">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-base font-semibold">{step}</h3>
                </article>
              ))}
            </div>
            {sectionCta()}
          </div>
        </section>

        <section id="servicos" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" data-reveal>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Serviços Técnicos para Pintura Predial no Estado de São Paulo</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80">
            Escopos objetivos, linguagem executiva e aplicação com foco em resultado.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-2xl border border-sky-300/55 bg-white p-6 shadow-brutalSoft">
                <service.icon size={24} className="text-signal" />
                <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">
                  <span className="font-semibold">Para quem é:</span> {service.paraQuem}
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  <span className="font-semibold">O que inclui:</span> {service.inclui}
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  <span className="font-semibold">O que evita:</span> {service.evita}
                </p>
                <a
                  href="#vistoria"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-signal transition hover:text-signalDark"
                >
                  {service.cta}
                  <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio" className="border-y border-sky-900/15 bg-concrete/75 py-16 md:py-24" data-reveal>
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Portfólio de Obras no Estado de São Paulo</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80">
              Histórico executivo com cidade, tipo, área e resultado técnico.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {portfolioFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                    activeFilter === filter
                      ? "border-sky-400 bg-signal text-fog"
                      : "border-sky-300/55 bg-white text-ink hover:border-sky-400"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPortfolio.map((work) => (
                <article key={`${work.city}-${work.type}`} className="overflow-hidden rounded-2xl border border-sky-300/55 bg-white shadow-brutalSoft">
                  <img src={work.image} alt={`Obra predial em ${work.city}`} className="h-44 w-full object-cover" loading="lazy" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{work.city}</h3>
                    <p className="mt-2 text-sm text-ink/80">Tipo: {work.type}</p>
                    <p className="text-sm text-ink/80">Área: {work.area}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/85">Resultado: {work.result}</p>
                  </div>
                </article>
              ))}
            </div>
            {sectionCta("Ver disponibilidade de equipe")}
          </div>
        </section>

        <section id="atendimento" className="border-b border-sky-900/15 bg-ink py-16 text-fog md:py-24" data-reveal>
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Atendimento em Todo o Estado de São Paulo para Pintura Predial</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-fog/85">
              Operação estruturada para obras em todo o estado de São Paulo, com padrão único de execução e controle técnico.
            </p>

            <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_1.2fr]">
              <div className="rounded-3xl border border-sky-300/45 bg-fog/10 p-6">
                <h3 className="text-lg font-semibold">Mapa do Estado de São Paulo - Cobertura Operacional</h3>
                <div className="relative mt-6 flex justify-center">
                  <div className="h-[190px] w-[220px] bg-gradient-to-b from-signal to-signalDark [clip-path:polygon(8%_38%,24%_28%,42%_16%,63%_20%,84%_13%,94%_33%,89%_50%,95%_64%,79%_77%,60%_72%,48%_86%,29%_80%,14%_86%,6%_70%,10%_56%)] shadow-brutal sm:h-[240px] sm:w-[280px]" />
                  <span className="absolute left-6 top-[72px] hidden rounded-full bg-fog px-2 py-1 text-[10px] font-semibold text-ink sm:block">Campinas</span>
                  <span className="absolute right-6 top-[56px] hidden rounded-full bg-fog px-2 py-1 text-[10px] font-semibold text-ink sm:block">Vale do Paraíba</span>
                  <span className="absolute left-20 top-[132px] hidden rounded-full bg-fog px-2 py-1 text-[10px] font-semibold text-ink sm:block">Capital / Grande SP</span>
                  <span className="absolute right-10 top-[170px] hidden rounded-full bg-fog px-2 py-1 text-[10px] font-semibold text-ink sm:block">Baixada Santista</span>
                  <span className="absolute left-10 top-[188px] hidden rounded-full bg-fog px-2 py-1 text-[10px] font-semibold text-ink sm:block">Sorocaba</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Regiões Atendidas</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {regions.map((region) => (
                    <div key={region} className="rounded-2xl border border-sky-300/45 bg-fog/10 px-4 py-3">
                      <p className="flex items-start gap-2 text-sm font-semibold">
                        <MapPinned size={16} className="text-signal" />
                        {region}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-base leading-relaxed text-fog/85">
                  Somos uma <strong>empresa de pintura predial em todo o estado de São Paulo</strong> com capacidade de mobilização regional.
                  Atendemos <strong>pintura predial no estado de São Paulo</strong> e entregamos <strong>pintura predial para condomínios e empresas</strong>
                  com protocolo técnico e governança contratual.
                </p>
                {sectionCta("Agendar vistoria em qualquer cidade de SP")}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" data-reveal>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">FAQ Estratégico para Decisores</h2>
          <div className="mt-8 divide-y divide-sky-200 border-y border-sky-200">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer list-none text-lg font-semibold">{item.question}</summary>
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-ink/85">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="vistoria" className="border-y border-sky-900/15 bg-concrete/75 py-16 md:py-24" data-reveal>
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Solicite uma Análise Técnica da Sua Fachada</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80">
              Envie os dados do ativo e receba direcionamento técnico para tomada de decisão.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
              <form
                className="grid gap-4 rounded-3xl border border-sky-300/55 bg-white p-6 shadow-brutalSoft md:grid-cols-2"
                onSubmit={(event) => event.preventDefault()}
              >
                <label className="text-sm font-semibold">
                  Nome
                  <input
                    type="text"
                    required
                    className="mt-2 w-full rounded-xl border border-sky-300/55 bg-fog px-3 py-2 outline-none focus:border-signal"
                  />
                </label>

                <label className="text-sm font-semibold">
                  Telefone
                  <input
                    type="tel"
                    required
                    className="mt-2 w-full rounded-xl border border-sky-300/55 bg-fog px-3 py-2 outline-none focus:border-signal"
                  />
                </label>

                <label className="text-sm font-semibold">
                  Cidade
                  <input
                    type="text"
                    required
                    className="mt-2 w-full rounded-xl border border-sky-300/55 bg-fog px-3 py-2 outline-none focus:border-signal"
                  />
                </label>

                <label className="text-sm font-semibold">
                  Tipo de imóvel
                  <select
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-xl border border-sky-300/55 bg-fog px-3 py-2 outline-none focus:border-signal"
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option>Condomínio Residencial</option>
                    <option>Condomínio Comercial</option>
                    <option>Prédio Corporativo</option>
                    <option>Centro Logístico / Industrial</option>
                  </select>
                </label>

                <label className="text-sm font-semibold">
                  Área aproximada
                  <input
                    type="text"
                    placeholder="Ex: 8.000 m²"
                    className="mt-2 w-full rounded-xl border border-sky-300/55 bg-fog px-3 py-2 outline-none focus:border-signal"
                  />
                </label>

                <label className="text-sm font-semibold md:col-span-2">
                  Descreva o problema
                  <textarea
                    rows={5}
                    placeholder="Informe sintomas da fachada, urgência e restrições operacionais."
                    className="mt-2 w-full rounded-xl border border-sky-300/55 bg-fog px-3 py-2 outline-none focus:border-signal"
                  />
                </label>

                <div className="md:col-span-2">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-300/60 bg-gradient-to-r from-signal to-signalDark px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:brightness-110 sm:w-auto sm:px-6 sm:text-sm"
                    >
                      Agendar Vistoria Técnica
                      <ArrowUpRight size={18} />
                    </button>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Quero falar com o time técnico da Ess Pinturas.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-300/60 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink transition hover:bg-ink hover:text-fog sm:w-auto sm:px-6 sm:text-sm"
                    >
                      Falar com nosso time
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </form>

              <aside className="rounded-3xl border border-sky-300/55 bg-ink p-6 text-fog shadow-brutal">
                <h3 className="text-xl font-semibold">Bloco de Confiança</h3>
                <div className="mt-6 space-y-3 text-sm">
                  <p className="inline-flex items-center gap-2">
                    <BadgeCheck size={18} className="text-signal" />
                    50 obras executadas
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Waypoints size={18} className="text-signal" />
                    Atendemos em toda SP
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <FileCheck2 size={18} className="text-signal" />
                    Garantia contratual e rastreabilidade técnica
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <ClipboardList size={18} className="text-signal" />
                    ART e governança de documentação de obra
                  </p>
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Quero agendar uma vistoria técnica predial.`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-fog/60 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:bg-fog hover:text-ink sm:w-auto sm:text-sm"
                >
                  Falar com Engenharia Técnica
                  <MessageCircle size={17} />
                </a>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-sky-900/15 bg-ink py-8 text-fog">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm md:px-6">
          <p className="font-semibold">{BRAND_NAME} — Engenharia em Pintura Predial Comercial</p>
          <p>
            Pintura predial em todo o estado de São Paulo para condomínios e empresas com execução técnica, segurança NR-35 e garantia formal.
          </p>
          <p>Telefone comercial: {PHONE}</p>
        </div>
      </footer>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Quero falar com o time técnico da Ess Pinturas.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 left-4 right-4 z-50 inline-flex items-center justify-center gap-2 rounded-full border border-sky-300/65 bg-gradient-to-r from-signal to-signalDark px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-fog shadow-brutal md:hidden"
      >
        Falar com nosso time
        <MessageCircle size={16} />
      </a>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Quero falar com o time técnico da Ess Pinturas.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full border border-sky-300/65 bg-gradient-to-r from-signal to-signalDark px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-fog shadow-brutal transition hover:-translate-y-1 lg:inline-flex"
      >
        Falar com nosso time
        <MessageCircle size={16} />
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </div>
  );
}

export default App;
