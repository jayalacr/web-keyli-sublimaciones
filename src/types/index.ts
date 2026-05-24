export interface Technique {
  id: string;
  label: string;
  tagline: string;
  desc: string;
  includes: string[];
}

export interface Season {
  id: string;
  label: string;
  emoji: string;
  month: string;
  tint: string;
}

export interface Product {
  id: string;
  name: string;
  technique: string;
  seasons: string[];
  category: string;
  priceFrom: number;
  blurb: string;
  colors: string[];
  sizes: string[];
  gradient: [string, string];
  icon: "shirt" | "mug" | "bottle" | "key" | "tag";
  featured?: boolean;
  stock?: number;
  badge?: string;
}

export interface BuyingStep {
  step: number;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CancellationPolicy {
  title: string;
  body: string;
}
