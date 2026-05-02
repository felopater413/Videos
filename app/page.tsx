import projects from "@/data/projects.json";
import HomePage from "@/components/home-page";
import type { Project } from "@/lib/types";

export default function Home() {
  const portfolioProjects = projects.filter((item) => item.type !== "before-after") as Project[];

  return <HomePage projects={portfolioProjects} />;
}
