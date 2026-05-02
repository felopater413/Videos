"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { BeforeAfterCase, Project } from "@/lib/types";
import projectsData from "@/data/projects.json";
import Navbar from "@/components/navbar";
import SectionTitle from "@/components/section-title";
import PortfolioSection from "@/components/portfolio-section";
import BeforeAfter from "@/components/before-after";
import { makeWhatsAppLink } from "@/lib/utils";

type HomePageProps = {
  projects: Project[];
};

const content = {
  ar: {
    dir: "rtl" as const,
    navLinks: [
      { id: "about", label: "الاستوديو" },
      { id: "services", label: "الخدمات" },
      { id: "portfolio", label: "الأعمال" },
      { id: "testimonials", label: "العملاء" },
      { id: "contact", label: "تواصل" }
    ],
    navCta: "اطلب عرض سعر",
    heroTitle: "فيلوباتير | Video Production Studio",
    heroSubtitle: "نحوّل الأفكار إلى محتوى بصري احترافي يحقق نتائج",
    heroDesc:
      "خدمات مونتاج احترافية لصناع المحتوى والشركات، بمعالجة سينمائية دقيقة وهوية بصرية ترفع قيمة مشروعك.",
    heroPrimary: "اطلب عرض سعر",
    heroSecondary: "ابدأ مشروعك الآن",
    urgencyText: "خدمات مونتاج احترافية لصناع المحتوى والشركات",
    aboutTitle: "لماذا يختارني العملاء؟",
    aboutDesc:
      "نقدّم إنتاجًا بصريًا متكاملًا يركز على جودة الصورة، قوة الرسالة، ونتائج فعلية في الوصول والتفاعل.",
    aboutCards: ["سرعة التنفيذ", "جودة احترافية", "فهم محتوى السوشيال ميديا", "تحسين الوصول (Engagement)"],
    servicesTitle: "خدمات الاستوديو",
    servicesDesc: "باقات إنتاج ومونتاج مصممة لعلامتك التجارية ومحتواك.",
    services: [
      {
        title: "Podcast Editing",
        desc: "تنظيف الصوت، ضبط الإيقاع، وإخراج حلقة احترافية جاهزة للنشر."
      },
      {
        title: "YouTube Editing",
        desc: "مونتاج طويل يحافظ على الانتباه ويرفع جودة المحتوى البصري."
      },
      {
        title: "Shorts Editing",
        desc: "محتوى سريع الإيقاع مصمم لرفع المشاهدة والانتشار."
      },
      {
        title: "Reels Editing",
        desc: "إخراج عمودي احترافي بأسلوب يناسب إنستجرام وتيك توك."
      },
      {
        title: "Ads Editing",
        desc: "إعلانات قصيرة تُبرز القيمة وتدعم هدف الحملة التسويقية."
      },
      {
        title: "Color Grading",
        desc: "معالجة لونية سينمائية تمنح الفيديو هوية بصرية قوية."
      },
      {
        title: "Sound Design",
        desc: "تصميم صوتي متوازن يزيد التأثير ويعزز جودة المشاهدة."
      },
      {
        title: "Visual Enhancement",
        desc: "تحسينات بصرية نهائية لنتيجة أنظف وأكثر احترافية."
      }
    ],
    clientsTitle: "عملاؤنا",
    clientsDesc: "خبرة عملية مع صناع محتوى وشركات تبحث عن جودة إنتاج احترافية.",
    clients: [
      {
        name: "أحمد محمد",
        service: "YouTube Editing",
        quote: "شكراً لك على المونتاج الرائع! الفيديو أصبح أكثر جاذبية وارتفع عدد المشاهدات بشكل ملحوظ. الجودة احترافية جداً."
      },
      {
        name: "سارة علي",
        service: "Shorts & Reels",
        quote: "المونتاج سريع وممتع، ساعدني في زيادة التفاعل على إنستجرام. أنصح الجميع بالتعامل معكم!"
      },
      {
        name: "محمد حسن",
        service: "Social Media Ads",
        quote: "الإعلانات اللي عملتها لمتجري أدت لزيادة المبيعات بنسبة 30%. المعالجة اللونية رائعة والمونتاج واضح."
      },
      {
        name: "فاطمة خالد",
        service: "Podcast Editing",
        quote: "البودكاست أصبح احترافي جداً بعد التنظيف الصوتي والمونتاج. المستمعون لاحظوا الفرق!"
      }
    ],
    statsTitle: "أهم أرقامنا",
    statsDesc: "نتائج ملموسة وسرعة تنفيذ لكل مشروع.",
    stats: [
      { value: "50+", label: "مشروع ناجح" },
      { value: "48h", label: "تنفيذ سريع" },
      { value: "100%", label: "رضا العملاء" },
      { value: "40+", label: "عملاء راضون" }
    ],
    whatsappCardsTitle: "اطلب عرض سعر بسهولة",
    whatsappCardsDesc: "اختر رقم واتساب وابدأ دردشة فورية مع رسالة جاهزة.",
    whatsappCards: [
      {
        label: "طلب عرض سعر",
        phone: "01554803002",
        button: "راسلني على واتساب",
        text: "مرحبًا، أريد عرض سعر لمونتاج فيديو احترافي."
      },
      {
        label: "استشارة سريعة",
        phone: "01214694736",
        button: "استشارة واتساب",
        text: "مرحبًا، أحتاج استشارة حول خدمة المونتاج وسرعة التنفيذ."
      }
    ],
    ctaTitle: "ابدأ مشروعك الآن",
    ctaDesc: "إذا كنت تبحث عن إنتاج بصري احترافي يعكس قيمة علامتك، فريقنا جاهز لتنفيذ مشروعك.",
    ctaButton: "اطلب عرض سعر الآن",
    ctaMidTitle: "جاهز ترفع مستوى محتواك؟",
    ctaMidButton: "ابدأ مشروعك الآن",
    ctaEndTitle: "خلينا نحول فكرتك لفيديو احترافي",
    ctaEndButton: "تواصل واتساب الآن",
    contactTitle: "التواصل التجاري",
    contactSub: "للتواصل التجاري أو طلب العروض",
    close: "إغلاق",
    watchVideo: "مشاهدة الفيديو",
    portfolioNote: "كل مشروع يعكس جودة إنتاج حقيقية",
    floatingWhatsapp: "واتساب"
  },
  en: {
    dir: "ltr" as const,
    navLinks: [
      { id: "about", label: "Studio" },
      { id: "services", label: "Services" },
      { id: "portfolio", label: "Portfolio" },
      { id: "testimonials", label: "Clients" },
      { id: "contact", label: "Contact" }
    ],
    navCta: "Request a Quote",
    heroTitle: "Felopater | Video Production Studio",
    heroSubtitle: "We turn ideas into professional visual content that delivers results",
    heroDesc:
      "Premium post-production services for creators and businesses with cinematic quality and strategic storytelling.",
    heroPrimary: "Request a Quote",
    heroSecondary: "Start Your Project",
    urgencyText: "Professional editing services for creators and businesses",
    aboutTitle: "Why Clients Choose Me",
    aboutDesc:
      "I don't just edit videos. I build content that helps you attract attention, build trust, and convert viewers.",
    aboutCards: ["Fast Delivery", "Professional Quality", "Social Media Expertise", "Engagement Optimization"],
    servicesTitle: "Studio Services",
    servicesDesc: "Premium production packages tailored for brands and creators.",
    services: [
      {
        title: "Podcast Editing",
        desc: "Clean audio, strong pacing, and polished episode delivery."
      },
      {
        title: "YouTube Editing",
        desc: "Long-form editing designed for retention and clarity."
      },
      {
        title: "Shorts Editing",
        desc: "Fast short-form cuts optimized for reach and replay."
      },
      {
        title: "Reels Editing",
        desc: "Vertical edits tailored for modern social platforms."
      },
      {
        title: "Ads Editing",
        desc: "Conversion-focused ad cuts with clear visual storytelling."
      },
      {
        title: "Color Grading",
        desc: "Cinematic color polish for premium brand perception."
      },
      {
        title: "Sound Design",
        desc: "Balanced and impactful sound built for attention."
      },
      {
        title: "Visual Enhancement",
        desc: "Final visual cleanup and enhancement for pro delivery."
      }
    ],
    clientsTitle: "Our Clients",
    clientsDesc: "Studio-level results for creators, channels, and growing businesses.",
    clients: [
      {
        name: "Ahmed Mohamed",
        service: "YouTube Editing",
        quote: "Thanks for the amazing editing! The video became much more engaging and views increased noticeably. The quality is very professional."
      },
      {
        name: "Sara Ali",
        service: "Shorts & Reels",
        quote: "The editing is fast and fun, helped me increase engagement on Instagram. I recommend everyone to work with you!"
      },
      {
        name: "Mohamed Hassan",
        service: "Social Media Ads",
        quote: "The ads I made for my store led to a 30% increase in sales. The color grading is amazing and the editing is clear."
      },
      {
        name: "Fatima Khalid",
        service: "Podcast Editing",
        quote: "The podcast became very professional after the audio cleaning and editing. Listeners noticed the difference!"
      }
    ],
    statsTitle: "Key Numbers",
    statsDesc: "Real results and fast delivery for every project.",
    stats: [
      { value: "50+", label: "Projects Delivered" },
      { value: "48h", label: "Fast Turnaround" },
      { value: "100%", label: "Client Satisfaction" },
      { value: "40+", label: "Happy Clients" }
    ],
    whatsappCardsTitle: "Get a Quote Quickly",
    whatsappCardsDesc: "Choose a WhatsApp line and start chatting with a ready message.",
    whatsappCards: [
      {
        label: "Quote Request",
        phone: "01554803002",
        button: "Message on WhatsApp",
        text: "Hi, I want a quote for a professional video edit."
      },
      {
        label: "Quick Consultation",
        phone: "01214694736",
        button: "Chat on WhatsApp",
        text: "Hi, I need a quick consultation about editing services."
      }
    ],
    ctaTitle: "Start Your Project Now",
    ctaDesc: "If you need premium edits that make your brand stand out, let's work together.",
    ctaButton: "Book on WhatsApp",
    ctaMidTitle: "Ready to level up your content?",
    ctaMidButton: "Start Your Project Now",
    ctaEndTitle: "Let's turn your idea into a professional video",
    ctaEndButton: "Contact on WhatsApp",
    contactTitle: "Business Contact",
    contactSub: "For business inquiries and project quotations",
    close: "Close",
    watchVideo: "Watch Video",
    portfolioNote: "Every project reflects real production quality.",
    floatingWhatsapp: "WhatsApp"
  }
};

export default function HomePage({ projects }: HomePageProps) {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isPulling, setIsPulling] = useState(false);
  const t = content[lang];
  const whatsappLink = makeWhatsAppLink(
    "1554803002",
    "مرحبًا، أود طلب عرض سعر لمشروع مونتاج فيديو احترافي"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light-mode", theme === "light");
  }, [theme]);

  const handleClickLamp = () => {
    setIsPulling(true);
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    window.setTimeout(() => setIsPulling(false), 300);
  };
  const whatsappLinkSecond = makeWhatsAppLink(
    "1214694736",
    "مرحبًا، أود طلب عرض سعر لمشروع مونتاج فيديو احترافي"
  );
  const beforeAfterCase = projectsData.find(
    (item) => item.type === "before-after"
  ) as BeforeAfterCase | undefined;
  return (
    <main id="home" className="bg-radial-accent pb-20 md:pb-0" dir={t.dir}>
      <Navbar
        links={t.navLinks}
        ctaLabel={t.navCta}
        lang={lang}
        onToggleLang={() => setLang(lang === "ar" ? "en" : "ar")}
      />

      <div
        onClick={handleClickLamp}
        className="fixed right-6 top-24 z-50 flex cursor-pointer select-none items-start gap-2"
        aria-label={lang === "ar" ? "حبل الإضاءة" : "Lamp cord"}
      >
        <div className="relative flex h-44 w-10 items-start justify-center">
          <div className="absolute top-0 h-8 w-1 rounded-full bg-slate-400 shadow-[0_1px_6px_rgba(0,0,0,0.15)]" />
          <div className="absolute top-8 h-3 w-3 rounded-full bg-slate-400 shadow-[0_0_4px_rgba(255,255,255,0.18)]" />
          <motion.div
            animate={{ y: isPulling ? 16 : 0, rotate: isPulling ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="absolute top-12 flex h-20 w-20 flex-col items-center"
          >
            <div className="h-10 w-14 rounded-b-[60px] rounded-t-[18px] border border-white/10 bg-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.25)]" />
            <div className="-mt-3 h-7 w-7 rounded-full bg-[#ffdf80] shadow-[0_0_20px_rgba(255,223,128,0.45)]" />
            <div className="mt-2 h-2 w-8 rounded-full bg-slate-700" />
          </motion.div>
        </div>
        <div className="mt-8 rounded-full bg-slate-700 px-2 py-1 text-[11px] text-white/80 shadow-md">
          {lang === "ar" ? "اسحب الحبل" : "Pull the cord"}
        </div>
      </div>

      <section id="home" className="container-x section-space pt-16 md:pt-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
            <p className="text-sm tracking-[0.2em] text-accent font-semibold">VIDEO PRODUCTION STUDIO</p>
            <h1 className="hero-title text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              {t.heroTitle}
              <span className="mt-3 block text-xl font-bold text-textSoft md:text-2xl">{t.heroSubtitle}</span>
            </h1>
            <p className="max-w-xl text-base text-textSoft md:text-lg leading-relaxed">{t.heroDesc}</p>
            <div className="glass inline-flex rounded-xl px-4 py-2 text-sm text-accent font-medium">{t.urgencyText}</div>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="accent-gradient rounded-xl px-6 py-3 text-base font-bold text-white shadow-glow transition hover:brightness-110 md:px-7 md:py-3.5"
              >
                {t.heroPrimary}
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-accent/60 bg-accent/10 px-6 py-3 text-base font-bold text-white transition hover:border-accent"
              >
                {t.heroSecondary}
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="glass rounded-2xl p-4 shadow-glow">
            <div className="aspect-video rounded-xl border border-line bg-gradient-to-br from-accent/20 via-surface to-bg p-6">
              <p className="text-sm text-textSoft">Cinematic Finishing • Studio Quality • Measurable Impact</p>
              <div className="mt-6 space-y-3">
                <div className="h-2 rounded bg-white/20" />
                <div className="h-2 w-5/6 rounded bg-white/20" />
                <motion.div className="h-2 w-4/6 rounded bg-accent/70" animate={{ width: ["40%", "78%", "66%"] }} transition={{ duration: 3, repeat: Infinity }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-x section-space">
        <div className="glass rounded-3xl p-6 shadow-glow">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">{lang === "ar" ? "أرقام سريعة" : "Quick Facts"}</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{t.statsTitle}</h2>
              <p className="mt-4 max-w-2xl text-textSoft">{t.statsDesc}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.stats.map((item) => (
              <div key={item.label} className="rounded-3xl bg-surface/90 p-5 text-center shadow-sm border border-line/70">
                <p className="text-3xl font-extrabold text-main">{item.value}</p>
                <p className="mt-2 text-sm text-textSoft">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section-space container-x">
        <SectionTitle eyebrow="WHY US" title={t.aboutTitle} description={t.aboutDesc} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.aboutCards.map((card) => (
            <motion.article
              key={card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="text-lg font-semibold">{card}</h3>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="services" className="section-space container-x">
        <SectionTitle eyebrow="SERVICES" title={t.servicesTitle} description={t.servicesDesc} />
        <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
          {t.services.map((service) => (
            <motion.article key={service.title} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="glass hover-lift rounded-2xl p-5">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-7 text-textSoft">{service.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <PortfolioSection
        projects={projects}
        lang={lang}
        eyebrow="PORTFOLIO"
        title={lang === "ar" ? "أعمال مختارة تُظهر الجودة والنتيجة" : "Featured Work That Delivers Results"}
        description={
          lang === "ar"
            ? "كل مشروع هنا يعكس أسلوب مونتاج سينمائي سريع ومصمم لتحقيق مشاهدة أعلى وتأثير أقوى."
            : "Every project reflects cinematic pacing, premium finishing, and performance-first editing."
        }
        closeLabel={t.close}
        watchLabel={t.watchVideo}
        footerNote={t.portfolioNote}
      />

      <section className="container-x pb-2">
        <motion.div
          className="glass rounded-2xl p-6 text-center shadow-glow md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-extrabold md:text-3xl">{t.ctaMidTitle}</h3>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="accent-gradient mt-5 inline-flex rounded-xl px-7 py-3 text-base font-bold text-white shadow-glow transition hover:brightness-110"
          >
            {t.ctaMidButton}
          </a>
        </motion.div>
      </section>

      {beforeAfterCase ? (
        <BeforeAfter
          eyebrow="BEFORE / AFTER"
          title={lang === "ar" ? "نتائج قبل وبعد المونتاج" : "Before & After Results"}
          description={
            lang === "ar"
              ? "مقارنة مباشرة بين النسخة الخام والنسخة النهائية بعد المعالجة واللمسات السينمائية."
              : "A direct comparison between the raw cut and the final polished cinematic delivery."
          }
          beforeLabel="RAW FOOTAGE"
          afterLabel="FINAL EDIT"
          beforeVideoUrl={beforeAfterCase.beforeVideoUrl}
          afterVideoUrl={beforeAfterCase.afterVideoUrl}
        />
      ) : null}

      <section id="testimonials" className="section-space container-x">
        <SectionTitle eyebrow="CLIENTS" title={t.clientsTitle} description={t.clientsDesc} />
        <div className="grid gap-5 md:grid-cols-2">
          {t.clients.map((client, index) => (
            <motion.div
              key={client.name}
              className="rounded-3xl bg-surface/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-white/10"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-slate-900 text-white grid place-items-center text-sm font-semibold shadow-lg">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{client.name}</p>
                  <p className="text-xs text-textSoft">{client.service}</p>
                </div>
              </div>
              <div className="mt-4 relative rounded-[28px] bg-[#163e2b] px-5 py-4 text-sm leading-7 text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                <p>{client.quote}</p>
                <span className="absolute -left-2 top-5 h-0 w-0 border-y-4 border-y-transparent border-r-4 border-r-[#163e2b]" />
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] text-textSoft">
                <span>WhatsApp</span>
                <span className="flex items-center gap-1 text-accent">
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.1 5.3L5 9.2L12.9 1.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.1 5.3L5 9.2L12.9 1.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-space container-x">
        <motion.div className="glass rounded-2xl p-7 text-center shadow-glow md:p-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-textSoft">{t.ctaDesc}</p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="accent-gradient mt-6 inline-flex rounded-xl px-6 py-3 font-semibold text-white transition hover:brightness-110">
            {t.ctaButton}
          </a>
        </motion.div>
      </section>

      <section id="quick-contact" className="section-space container-x">
        <SectionTitle eyebrow={lang === "ar" ? "واتساب" : "WhatsApp"} title={t.whatsappCardsTitle} description={t.whatsappCardsDesc} />
        <div className="grid gap-4 md:grid-cols-2">
          {t.whatsappCards.map((card) => (
            <div key={card.label} className="rounded-3xl border border-line bg-surface/80 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">{card.label}</p>
              <p className="mt-3 text-lg font-semibold text-white">{card.button}</p>
              <p className="mt-2 text-sm leading-6 text-textSoft">{lang === "ar" ? "رسالة جاهزة للتواصل الفوري عبر واتساب." : "Ready-to-send WhatsApp message for instant contact."}</p>
              <a
                href={makeWhatsAppLink(card.phone, card.text)}
                target="_blank"
                rel="noopener noreferrer"
                className="accent-gradient mt-5 inline-flex rounded-xl px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:brightness-110"
              >
                {card.button}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section-space container-x pt-0">
        <SectionTitle eyebrow="CONTACT" title={t.contactTitle} description={t.contactSub} />
        <div className="glass grid gap-4 rounded-2xl p-6 md:grid-cols-2">
          <a className="rounded-xl border border-accent bg-accent/10 p-4 text-base font-bold shadow-glow hover:border-accent" href={makeWhatsAppLink("01554803002", "مرحبا، أريد الاستفسار عن خدمات الاستوديو")} target="_blank" rel="noopener noreferrer">WhatsApp: 01554803002</a>
          <a className="rounded-xl border border-accent/70 bg-accent/5 p-4 text-base font-semibold hover:border-accent" href={makeWhatsAppLink("01214694736", "مرحبا، أريد الاستفسار عن خدمات الاستوديو")} target="_blank" rel="noopener noreferrer">WhatsApp: 01214694736</a>
          <a className="rounded-xl border border-line p-4 hover:border-accent" href="mailto:g0161181@outlook.com">Email: g0161181@outlook.com</a>
          <a className="rounded-xl border border-line p-4 hover:border-accent" href="https://www.facebook.com/share/1c3GQ3dgc6/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a className="rounded-xl border border-line p-4 hover:border-accent" href="https://www.tiktok.com/@.felopater6?_r=1&_t=ZS-961ZxUKR0HC" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a className="rounded-xl border border-line p-4 hover:border-accent" href="https://youtube.com/@felopater-videoeditor?si=COj4qqTiEZdcGxqS" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </section>

      <section className="container-x pb-10">
        <motion.div
          className="glass rounded-2xl p-7 text-center shadow-glow md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-extrabold md:text-4xl">{t.ctaEndTitle}</h2>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="accent-gradient mt-6 inline-flex rounded-xl px-8 py-3.5 text-base font-bold text-white shadow-glow transition hover:brightness-110"
          >
            {t.ctaEndButton}
          </a>
        </motion.div>
      </section>

      <footer className="border-t border-line/60 py-8">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-sm text-textSoft md:flex-row">
          <p>© {new Date().getFullYear()} Felopater Nady Ramses. All rights reserved.</p>
          <p>Video Production Studio</p>
        </div>
      </footer>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="accent-gradient fixed bottom-6 left-6 z-40 hidden h-14 items-center justify-center rounded-full px-5 text-sm font-bold text-white shadow-glow transition hover:brightness-110 md:inline-flex"
      >
        {t.floatingWhatsapp}
      </a>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-bg/95 p-3 md:hidden">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="accent-gradient inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-base font-bold text-white shadow-glow"
        >
          {t.heroPrimary}
        </a>
      </div>
    </main>
  );
}
