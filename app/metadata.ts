import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "MusicAdvisor - Expert Music Industry Guidance",
    template: "%s | MusicAdvisor"
  },
  description: "Expert guidance for musicians and artists to succeed in today's music industry. Get professional advice on music marketing, distribution, and promotion.",
  keywords: ["music industry", "music marketing", "music promotion", "music distribution", "artist development", "music consulting"],
  authors: [{ name: "MusicAdvisor" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://musicadvisor.xyz",
    siteName: "MusicAdvisor",
    title: "MusicAdvisor - Expert Music Industry Guidance",
    description: "Expert guidance for musicians and artists to succeed in today's music industry.",
    images: [
      {
        url: "/malogomark.png",
        width: 1200,
        height: 630,
        alt: "MusicAdvisor Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MusicAdvisor - Expert Music Industry Guidance",
    description: "Expert guidance for musicians and artists to succeed in today's music industry.",
    images: ["/malogomark.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};
