export type Project = {
  title: string;
  titleEn?: string;
  category: string;
  categoryEn?: string;
  description: string;
  descriptionEn?: string;
  thumbnail: string;
  videoUrl: string;
  type: "shorts" | "video";
  beforeVideoUrl?: string;
  afterVideoUrl?: string;
  tags: string[];
};

export type BeforeAfterCase = {
  type: "before-after";
  title: string;
  description: string;
  beforeVideoUrl: string;
  afterVideoUrl: string;
};
