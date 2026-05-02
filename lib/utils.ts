/**
 * Converts common YouTube links into embed links.
 * Accepts:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function toYouTubeEmbedUrl(input: string): string {
  try {
    const url = new URL(input);

    if (url.hostname.includes("youtube.com") && url.pathname === "/watch") {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : input;
    }

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "").split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : input;
    }

    if (url.hostname.includes("youtube.com") && url.pathname.startsWith("/shorts/")) {
      const id = url.pathname.split("/shorts/")[1]?.split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : input;
    }

    if (url.pathname.includes("/embed/")) {
      return input;
    }
  } catch {
    return input;
  }

  return input;
}

export function isYouTubeShortUrl(input: string): boolean {
  try {
    const url = new URL(input);
    return url.hostname.includes("youtube.com") && url.pathname.startsWith("/shorts/");
  } catch {
    return false;
  }
}

export function makeWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "").replace(/^0/, "");
  return `https://wa.me/20${cleanPhone}?text=${encodeURIComponent(message)}`;
}
