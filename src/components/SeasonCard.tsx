"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProductoImagen } from "@/lib/db";

export function SeasonCard({
  href,
  title,
  portadaUrl,
  portadaAlt,
  galeria,
}: {
  href: string;
  title: string;
  portadaUrl: string;
  portadaAlt: string;
  galeria: ProductoImagen[];
}) {
  const [backImage, setBackImage] = useState<ProductoImagen>({ url: portadaUrl, alt: portadaAlt });

  // ponytail: random pick must run client-only to avoid SSR/client hydration mismatch.
  useEffect(() => {
    if (galeria.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBackImage(galeria[Math.floor(Math.random() * galeria.length)]);
    }
  }, [galeria]);

  return (
    <Link href={href} className="group block h-[300px] sm:h-[360px] md:h-[400px] rounded-2xl [perspective:1500px]">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden]">
          <Image
            src={portadaUrl}
            alt={portadaAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-on-secondary-fixed-variant/40" />
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
            <h3 className="font-display-sm-mobile text-white mb-2">{title}</h3>
            <span className="font-label-caps text-white/80 tracking-widest">Explorar colección</span>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Image
            src={backImage.url}
            alt={backImage.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-on-secondary-fixed-variant/30" />
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
            <span className="font-label-caps text-white tracking-widest">Explorar colección</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
