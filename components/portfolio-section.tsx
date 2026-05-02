"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { isYouTubeShortUrl, toYouTubeEmbedUrl } from "@/lib/utils";
import SectionTitle from "@/components/section-title";
import { motion, AnimatePresence } from "framer-motion";

type PortfolioSectionProps = {
  projects: Project[];
  lang: "ar" | "en";
  eyebrow: string;
  title: string;
  description: string;
  closeLabel: string;
  watchLabel: string;
  footerNote: string;
};

type ProjectWithMeta = Project & {
  isShort: boolean;
};

export default function PortfolioSection({
  projects,
  lang,
  eyebrow,
  title,
  description,
  closeLabel,
  watchLabel,
  footerNote
}: PortfolioSectionProps) {
  const [active, setActive] = useState<ProjectWithMeta | null>(null);

  const normalizedProjects = useMemo(
    () =>
      projects
        .filter((project) => Boolean(project.videoUrl))
        .map((project) => ({
          ...project,
          // Converts watch/short links to embeddable links automatically.
          videoUrl: toYouTubeEmbedUrl(project.videoUrl),
          isShort: project.type === "shorts" || isYouTubeShortUrl(project.videoUrl)
        })),
    [projects]
  );

  return (
    <section id="portfolio" className="section-space container-x">
      <SectionTitle eyebrow={eyebrow} title={title} description={description} />

      <motion.div
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } }
        }}
      >
        {normalizedProjects.map((project) => (
          <motion.article
            key={project.title}
            variants={{ hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6 }}
            className="glass hover-lift overflow-hidden rounded-2xl"
          >
            <button
              onClick={() => setActive(project)}
              className="group relative block w-full text-right"
              aria-label={`عرض فيديو ${project.title}`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  project.isShort ? "aspect-[9/16] max-h-[420px]" : "aspect-video"
                }`}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/45 transition group-hover:bg-black/25" />
                <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-accent text-xl text-white shadow-glow">
                  ▶
                </span>
              </div>
              <div className="space-y-2 p-4">
                <p className="text-xs tracking-wider text-accent">
                  {lang === "en" ? project.categoryEn || project.category : project.category}
                </p>
                <h3 className="text-lg font-semibold">
                  {lang === "en" ? project.titleEn || project.title : project.title}
                </h3>
                <p className="line-clamp-2 text-sm text-textSoft">
                  {lang === "en" ? project.descriptionEn || project.description : project.description}
                </p>
                <span className="inline-flex rounded-lg border border-accent/60 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-white transition group-hover:border-accent group-hover:bg-accent/20">
                  {watchLabel}
                </span>
              </div>
            </button>
          </motion.article>
        ))}
      </motion.div>
      <p className="mt-5 text-sm text-textSoft">{footerNote}</p>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div
              className="glass w-full max-w-4xl rounded-2xl p-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold md:text-xl">
                    {lang === "en" ? active.titleEn || active.title : active.title}
                  </h3>
                  <p className="text-sm text-textSoft">
                    {lang === "en" ? active.categoryEn || active.category : active.category}
                  </p>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-lg border border-line px-3 py-1 text-sm hover:border-accent"
                >
                  {closeLabel}
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-line">
                {active.isShort ? (
                  <div className="flex justify-center bg-black/40 p-3">
                    <div className="relative aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-xl border border-line">
                      <iframe
                        key={active.videoUrl}
                        src={active.videoUrl}
                        title={active.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video">
                    <iframe
                      key={active.videoUrl}
                      src={active.videoUrl}
                      title={active.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-textSoft">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
