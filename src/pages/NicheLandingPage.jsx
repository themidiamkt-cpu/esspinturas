import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CircleCheckBig,
  ClipboardList,
  HardHat,
  LayoutGrid,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Star,
  Waypoints
} from "lucide-react";
import SmartImage from "../components/SmartImage";
import {
  BRAND_NAME,
  PHONE,
  PRIMARY_WHATSAPP_URL,
  TARGET_AREA,
  TEAM_WHATSAPP_URL,
  buildWhatsAppUrl
} from "../lib/siteConfig";

const featureIcons = [ShieldCheck, ClipboardList, CircleCheckBig, Building2, Waypoints, HardHat];

function BrandedImage({ src, alt, className = "", loading = "lazy" }) {
  return (
    <div className="relative overflow-hidden">
      <SmartImage src={src} alt={alt} loading={loading} className={className} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end p-3">
        <span className="rounded-full border border-fog/55 bg-ink/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-fog sm:text-xs">
          E2SPinturas
        </span>
      </div>
    </div>
  );
}

function NicheLandingPage({ page }) {
  const pageRef = useRef(null);

  useEffect(() => {
    document.title = page.seo.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", page.seo.description);
    }
  }, [page]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".niche-hero-line", { y: 38, opacity: 0, duration: 0.68, stagger: 0.1 })
        .from(".niche-hero-copy", { y: 22, opacity: 0, duration: 0.56 }, "-=0.22")
        .from(".niche-hero-cta", { y: 16, opacity: 0, duration: 0.5 }, "-=0.16");

      gsap.utils.toArray("[data-reveal]").forEach((section) => {
        gsap.from(section, {
          y: 48,
          opacity: 0,
          duration: 0.74,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 84%"
          }
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [page.slug]);

  const pagePrimaryWhatsapp = useMemo(
    () => buildWhatsAppUrl(`Olá! Quero ${page.finalCta.primary.toLowerCase()} com a ${BRAND_NAME}.`),
    [page]
  );

  const schemaData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": `https://alturaprime.com.br/${page.slug}#negocio`,
          name: `${BRAND_NAME} — Engenharia em Pintura Predial Comercial`,
          url: `https://alturaprime.com.br/${page.slug}`,
          telephone: PHONE,
          areaServed: {
            "@type": "AdministrativeArea",
            name: TARGET_AREA
          }
        },
        {
          "@type": "Service",
          "@id": `https://alturaprime.com.br/${page.slug}#servico`,
          name: page.seo.h1,
          description: page.seo.description,
          areaServed: {
            "@type": "AdministrativeArea",
            name: TARGET_AREA
          },
          provider: {
            "@id": `https://alturaprime.com.br/${page.slug}#negocio`
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: pagePrimaryWhatsapp,
            description: page.finalCta.description
          }
        }
      ]
    }),
    [page, pagePrimaryWhatsapp]
  );

  const recurrentCta = (label) => (
    <div className="mt-8 flex flex-wrap gap-3">
      <a
        href={pagePrimaryWhatsapp}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-300/60 bg-gradient-to-r from-signal to-signalDark px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:-translate-y-1 hover:brightness-110 sm:w-auto sm:px-6 sm:text-sm"
      >
        {label}
        <ArrowUpRight size={18} />
      </a>
      <a
        href={TEAM_WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-300/60 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink transition hover:bg-ink hover:text-fog sm:w-auto sm:px-6 sm:text-sm"
      >
        Falar com especialista
        <MessageCircle size={18} />
      </a>
    </div>
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-fog text-ink">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(46,168,255,0.24),transparent_36%),radial-gradient(circle_at_88%_4%,rgba(20,119,209,0.18),transparent_33%)]" />

      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3 sm:top-5 sm:px-4">
        <div className="pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border border-sky-300/55 bg-fog/80 px-3 py-2.5 shadow-brutal backdrop-blur-xl sm:gap-4 sm:px-4 sm:py-3 md:px-6">
          <a href="/" className="font-heading text-lg leading-none tracking-[0.04em] sm:text-xl md:text-2xl">
            {BRAND_NAME}
          </a>

          <nav className="hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.08em] md:flex lg:gap-5">
            <a href="/" className="transition hover:text-signal">Início</a>
            <a href="/condominio" className="transition hover:text-signal">Condomínio</a>
            <a href="/empresa" className="transition hover:text-signal">Empresa</a>
            <a href="#servicos" className="transition hover:text-signal">Serviços</a>
            <a href="#portfolio" className="transition hover:text-signal">Portfólio</a>
          </nav>

          <a
            href={pagePrimaryWhatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/60 bg-gradient-to-r from-signal to-signalDark px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-fog transition hover:brightness-110 sm:gap-2 sm:px-4 sm:text-xs md:text-sm"
          >
            {page.hero.primaryCta}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      <main className="pb-24 md:pb-0">
        <section className="relative overflow-hidden border-b border-sky-900/15 pb-16 pt-32 sm:pt-36 md:pt-44">
          <div className="absolute inset-0">
            <BrandedImage
              src={page.hero.image}
              alt={page.hero.alt}
              loading="eager"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(7,19,42,0.9),rgba(7,19,42,0.62),rgba(20,119,209,0.44))]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 md:px-6">
            <div className="max-w-5xl rounded-3xl border border-fog/70 bg-ink/55 p-5 shadow-brutal backdrop-blur-md sm:p-6 md:p-10">
              <h1 className="niche-hero-line max-w-4xl text-2xl font-bold leading-tight text-fog sm:text-3xl md:text-5xl">
                {page.seo.h1}
              </h1>
              <p className="niche-hero-copy mt-4 max-w-3xl text-sm leading-relaxed text-fog/95 sm:text-base md:mt-5 md:text-lg">
                {page.hero.subtitle}
              </p>

              <div className="niche-hero-copy mt-6 grid gap-3 sm:grid-cols-2">
                {page.hero.badges.map((badge) => (
                  <p
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-2xl border border-fog/35 bg-fog/10 px-4 py-3 text-xs font-semibold text-fog sm:text-sm"
                  >
                    <BadgeCheck size={15} className="shrink-0" />
                    {badge}
                  </p>
                ))}
              </div>

              <div className="niche-hero-cta mt-8 flex flex-wrap gap-3">
                <a
                  href={pagePrimaryWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-fog/70 bg-gradient-to-r from-signal to-signalDark px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:brightness-110 sm:w-auto sm:px-6 sm:text-sm"
                >
                  {page.hero.primaryCta}
                  <ArrowUpRight size={18} />
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-fog/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:bg-fog hover:text-ink sm:w-auto sm:px-6 sm:text-sm"
                >
                  {page.hero.secondaryCta}
                  <LayoutGrid size={18} />
                </a>
                <a
                  href={TEAM_WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-fog/70 bg-fog/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:bg-fog hover:text-ink sm:w-auto sm:px-6 sm:text-sm"
                >
                  Falar com especialista
                  <MessageCircle size={18} />
                </a>
              </div>

              <p className="niche-hero-copy mt-4 text-xs font-medium text-fog/90 sm:text-sm">{page.hero.microcopy}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" data-reveal>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{page.painPoints.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80">{page.painPoints.subtitle}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.painPoints.items.map((item) => (
              <article key={item} className="rounded-2xl border border-sky-300/55 bg-white p-5 shadow-brutalSoft">
                <h3 className="text-base font-semibold">Necessidade crítica</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/85">{item}</p>
              </article>
            ))}
          </div>
          {recurrentCta("Solicitar análise da fachada")}
        </section>

        <section className="border-y border-sky-900/15 bg-ink py-16 text-fog md:py-24" data-reveal>
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{page.differentials.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-fog/85">{page.differentials.subtitle}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.differentials.cards.map((item, index) => {
                const Icon = featureIcons[index % featureIcons.length];
                return (
                  <article key={item.title} className="rounded-2xl border border-sky-300/40 bg-fog/10 p-5">
                    <Icon size={20} className="text-signal" />
                    <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fog/85">{item.description}</p>
                  </article>
                );
              })}
            </div>
            {recurrentCta("Pedir avaliação técnica")}
          </div>
        </section>

        <section id="servicos" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" data-reveal>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{page.services.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80">{page.services.subtitle}</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.services.items.map((service) => (
              <article key={service.title} className="rounded-2xl border border-sky-300/55 bg-white p-6 shadow-brutalSoft">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/85">{service.description}</p>
                <a
                  href={pagePrimaryWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-signal transition hover:text-signalDark"
                >
                  Solicitar escopo técnico
                  <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="processo" className="border-y border-sky-900/15 bg-concrete/75 py-16 md:py-24" data-reveal>
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{page.process.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80">{page.process.subtitle}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.process.steps.map((step, index) => (
                <article key={step} className="rounded-2xl border border-sky-300/55 bg-white p-5 shadow-brutalSoft">
                  <p className="text-4xl font-bold text-signal">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-base font-semibold">{step}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" data-reveal>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{page.trust.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80">{page.trust.subtitle}</p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                {page.trust.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-sky-300/55 bg-white p-5 shadow-brutalSoft">
                    <p className="text-3xl font-bold text-signal">{stat.value}</p>
                    <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-ink/75">{stat.label}</h3>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {page.trust.testimonials.map((testimonial) => (
                  <article key={testimonial.author} className="rounded-2xl border border-sky-300/55 bg-white p-5 shadow-brutalSoft">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} size={14} className="fill-signal text-signal" />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink/85">{testimonial.text}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink/65">{testimonial.author}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="overflow-hidden rounded-3xl border border-sky-300/55 bg-ink p-6 text-fog shadow-brutal">
              <BrandedImage src={page.trust.image} alt={page.trust.alt} className="h-56 w-full rounded-2xl object-cover" />
              <h3 className="mt-5 text-lg font-semibold">Diferenciais institucionais</h3>
              <div className="mt-4 space-y-3 text-sm">
                {page.trust.highlights.map((item) => (
                  <p key={item} className="inline-flex items-start gap-2">
                    <CircleCheckBig size={16} className="mt-0.5 text-signal" />
                    {item}
                  </p>
                ))}
              </div>
              <a
                href={TEAM_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-fog/60 bg-fog/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:bg-fog hover:text-ink sm:text-sm"
              >
                Falar com especialista
                <MessageCircle size={16} />
              </a>
            </aside>
          </div>
        </section>

        <section id="portfolio" className="border-y border-sky-900/15 bg-concrete/75 py-16 md:py-24" data-reveal>
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{page.portfolio.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80">{page.portfolio.subtitle}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {page.portfolio.items.map((project) => (
                <article key={project.name} className="overflow-hidden rounded-2xl border border-sky-300/55 bg-white shadow-brutalSoft">
                  <BrandedImage src={project.image} alt={project.alt} className="h-44 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="mt-2 text-sm text-ink/80">Local: {project.location}</p>
                    <p className="text-sm text-ink/80">Tipo: {project.type}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/85">{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
            {recurrentCta("Solicitar orçamento técnico")}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" data-reveal>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{page.faq.title}</h2>
          <div className="mt-8 divide-y divide-sky-200 border-y border-sky-200">
            {page.faq.items.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer list-none text-lg font-semibold">{item.question}</summary>
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-ink/85">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-y border-sky-900/15 bg-ink py-16 text-fog md:py-24" data-reveal>
          <div className="mx-auto max-w-5xl px-4 text-center md:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{page.finalCta.title}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-fog/85">{page.finalCta.description}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={pagePrimaryWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-fog/70 bg-gradient-to-r from-signal to-signalDark px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:brightness-110 sm:w-auto sm:px-6 sm:text-sm"
              >
                {page.finalCta.primary}
                <ArrowUpRight size={18} />
              </a>
              <a
                href={TEAM_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-fog/70 bg-fog/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-fog transition hover:bg-fog hover:text-ink sm:w-auto sm:px-6 sm:text-sm"
              >
                {page.finalCta.secondary}
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-sky-900/15 bg-ink py-8 text-fog">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm md:px-6">
          <p className="font-semibold">{BRAND_NAME} — Engenharia em Pintura Predial Comercial</p>
          <p>
            Pintura predial no estado de São Paulo para condomínios e empresas com execução técnica, segurança NR-35 e padrão profissional.
          </p>
          <p>Telefone comercial: {PHONE}</p>
        </div>
      </footer>

      <a
        href={TEAM_WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 left-4 right-4 z-50 inline-flex items-center justify-center gap-2 rounded-full border border-sky-300/65 bg-gradient-to-r from-signal to-signalDark px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-fog shadow-brutal md:hidden"
      >
        Falar com especialista
        <MessageCircle size={16} />
      </a>

      <a
        href={TEAM_WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full border border-sky-300/65 bg-gradient-to-r from-signal to-signalDark px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-fog shadow-brutal transition hover:-translate-y-1 lg:inline-flex"
      >
        Falar com especialista
        <MessageCircle size={16} />
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </div>
  );
}

export default NicheLandingPage;
