"use client";

import SectionTitle from "@/components/section-title";
import { motion } from "framer-motion";
import { isYouTubeShortUrl, toYouTubeEmbedUrl } from "@/lib/utils";

type BeforeAfterProps = {
  eyebrow: string;
  title: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  beforeVideoUrl: string;
  afterVideoUrl: string;
};

export default function BeforeAfter({
  eyebrow,
  title,
  description,
  beforeLabel,
  afterLabel,
  beforeVideoUrl,
  afterVideoUrl
}: BeforeAfterProps) {
  const beforeEmbed = toYouTubeEmbedUrl(beforeVideoUrl);
  const afterEmbed = toYouTubeEmbedUrl(afterVideoUrl);
  const isShortCase = isYouTubeShortUrl(beforeVideoUrl) || isYouTubeShortUrl(afterVideoUrl);

  return (
    <motion.section
      className="section-space container-x"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle eyebrow={eyebrow} title={title} description={description} />

      <div className="glass overflow-hidden rounded-2xl p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-line/90 bg-black/30 p-3 shadow-glow">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-textSoft">{beforeLabel}</p>
            <div
              className={`relative mx-auto overflow-hidden rounded-xl border border-line ${
                isShortCase ? "aspect-[9/16] max-w-[360px]" : "aspect-video w-full"
              }`}
            >
              <iframe
                src={beforeEmbed}
                title={beforeLabel}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="rounded-xl border border-accent/40 bg-black/30 p-3 shadow-glow">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent">{afterLabel}</p>
            <div
              className={`relative mx-auto overflow-hidden rounded-xl border border-line ${
                isShortCase ? "aspect-[9/16] max-w-[360px]" : "aspect-video w-full"
              }`}
            >
              <iframe
                src={afterEmbed}
                title={afterLabel}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
