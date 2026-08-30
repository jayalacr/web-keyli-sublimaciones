export type SeasonProduct = {
  title: string;
  category: string;
  src: string;
  alt: string;
  aspect: string;
};

export type Season = {
  slug: string;
  title: string;
  tagline: string;
  pieces: string;
  src: string;
  alt: string;
  wrap: string;
  title2xl?: boolean;
  padLg?: boolean;
  /** Piezas curadas de la colección — sólo Navidad tiene diseño de Stitch, el resto queda vacío hasta que se diseñen. */
  products: SeasonProduct[];
};

export const SEASONS: Season[] = [
  {
    slug: "san-valentin",
    title: "San Valentín",
    tagline: "El arte de regalar con intención",
    pieces: "24 piezas",
    alt: "Taza de cerámica con motivos románticos, tonos rosa suave y rojo profundo.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpoy5LDHvALLypeW1kfe7pnQk7jxax_qg6xXBaS--jjzSafOjG4mq0rf1sXz2FJ7JKC-FTxosxz5VCqgeKflr7DaU7lu_Niiy24p1GncrNzu7qNN5obBiePsOOhi0EY6jawWXUBNwud5sBDek-gvdFz9gNEtV3RSKZpCfKck38Va2FATvz7898qeCSFI4lIXTO_X3yiJLdbQmleaG0GaxGd4yKw4ZJiqqKsxij4O-nAGo2bmdNZBS9",
    wrap: "md:col-span-5 h-[600px] md:h-[700px]",
    products: [],
  },
  {
    slug: "primavera",
    title: "Primavera",
    tagline: "Colores que despiertan espacios",
    pieces: "42 piezas",
    alt: "Textiles y termos sublimados con patrones florales, luz solar y paleta verde-amarilla.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5XxhEbkkC2ByA6UKdWbtFjD9aRI3w-BcM-ZjbwyI6S7gVoxauh8lMHyfIRZ9-iEUN4P43MVSOQ6k31Vr1uEGL7DfRkbAfGNPE4-KDQFc1suzycNf4D5xf58BqqF_ynrNrTssdF6qeM0Ld2uNPJnytprElY_2uD6ID3HvWVUJrvHuGmgj48xmAMJ4t-U8OqMXq3Pg9aMaqSTNzm4OqqoAHNWaYuuSh70ui3y2MuvrnJEJxMLRKTI7C",
    wrap: "md:col-span-7 h-[450px] md:h-[550px] md:mt-24",
    products: [],
  },
  {
    slug: "dia-de-las-madres",
    title: "Día de las Madres",
    tagline: "Detalles que celebran su historia",
    pieces: "36 piezas",
    alt: "Papelería personalizada, libreta y marco sublimado en tonos pastel.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtrPxWN0KrQay-3SSrjJbwCQWylqHji3aZR1XoRQ3NDDKfUWBI38CjqNQ_Wkj8-I5-3M-EmjOKTIamzJAz3lEulDzQz3nTv4meXgCf0lOsjwt4ZbVLpcGbSzmKRBKN1fFARzcvN6iM9wivH0bPiJs2GA5XSvgmG2CNuHo6bzZN73mdBnCey7W97Pw5MZp_J7RH01pq6EdzIDYTQAfilrWTRHRrhzb6C5Jl8Oq9_tVsl0bNyJY-cLdP",
    wrap: "md:col-span-6 h-[500px] md:h-[600px]",
    products: [],
  },
  {
    slug: "regreso-a-clases",
    title: "Regreso a Clases",
    tagline: "Organización con estilo propio",
    pieces: "18 piezas",
    alt: "Mochilas, estuches y botellas sublimadas en colores gráficos de alto contraste.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbkKHT_2UHtWaohP34wt0in6pFKJG44bpq7ok9Il1FuCIetaDRnytXVPZqdmzy8U2az3Nqafm3u8Xe0cPMojhUInQtkGLhestKbcTozrYCOAO2OAr0wjwehpGhNrTx7eotWaT77Khc2f5hd1Vvh86fyPx5XCJ5ao7xGiBLyu1z_m5O7pj83Cl7zsv5CiWGrv3w2HrMcleLwMqBwM9Q8M4NnrCrdOhbPmPnqXnkxLTt55_cWlZm0cB9",
    wrap: "md:col-span-5 md:col-start-8 h-[550px] md:h-[650px] md:-mt-16",
    products: [],
  },
  {
    slug: "dia-de-muertos",
    title: "Día de Muertos",
    tagline: "Tradición en cada trazo",
    pieces: "30 piezas",
    alt: "Velas y platos de cerámica sublimados con motivos de catrina y cempasúchil.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwLNlU5N0p1pPQVb-O6yrTqAKtl3KroKstScRs_tKlMoL3ENSBXefdV2Izg4Ngu76aTf2aJcVWkuaN7B-m7YvKZmt9Vkg7u95I3HjrCoGYuRAnnZaw85bfjvJXSBUnhjTWpY5BsClZh3ImGWVcOJqYw41bvUUem6amOm5jGrqero0sdVMM_bSJ-uFmyF9uL7oY2_ET-YX0iBeacW7lDBKxvVQP9azzldAHv40RS9J6NZE8p_v0EfGC",
    wrap: "md:col-span-4 h-[600px]",
    title2xl: true,
    products: [],
  },
  {
    slug: "navidad",
    title: "Navidad",
    tagline: "La calidez de lo hecho a mano",
    pieces: "55 piezas",
    alt: "Ambiente navideño con esferas, envoltorios y tazas personalizadas.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_SYEseN_zJQrHa4j9KGvUdU8zRhGep7dCwIhFb46_SUBTSfCrv3CtMV78wdn4Cm7Oq954kFB4oCklXbelp3nrfTtdftV3sa4pHsGkxZD4ZDRHL0bL9fG_6Ng67DshGwfnMmQ7SP20Jua0hxPd-FEX5p0dQDDHDNQ435rHQ-YwftHbu6WMDYuxhQVqthRg_yRVdYhu7HmYG1iXwIuHJIQ7F4jeRApjgJiBrbLCcI1tTiFskIQkpaLJ",
    wrap: "md:col-span-8 h-[500px] md:h-[600px] md:mt-32",
    padLg: true,
    products: [
      {
        title: "Taza Nevado",
        category: "Tazas",
        aspect: "aspect-[3/4]",
        alt: "Taza de cerámica sublimada con diseño minimalista de copo de nieve, con chocolate caliente y malvaviscos.",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgvHOf1Z-DsEGuw3U-87BPLpBt4YfyD_J-l-xf92T1D9bupa9tFfLDivbIRvbt7Il9PX4sidUSqlqlpy8dgMrKIk_rJuflR3RxWF_oBiV3fbbAYFsPW4Ln9UavdxgoH3PWYpyv84tIH02J0gTZNnOaxtVBFdO9WAsMQ_q6twJqs4jFMieW_NHSPJVN-o4kcbgEjL0fzfRNvobgzJNK_kMFtPcjNX96jPx5akjuefcM-eqSDR8Tnxsp",
      },
      {
        title: "Termo Nochebuena",
        category: "Termos",
        aspect: "aspect-square",
        alt: "Termo de acero inoxidable con patrón geométrico festivo de pino, junto a regalos envueltos en papel kraft.",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrAXCYV4wVMRIO61Ko3gqmiMs65dhH9bder8Ao8JuVc2KlKDkAmCnj5T1Cu1XfsdDL4Lga-PB7UBJEgORyokHaOTqc4pyVrg0nQ0RevGFF-AtwRniKDDD1MX89WGbOR83I2EHgvRori6zGHRHbAhkRkz7TuPT-5KA1uz4sMgWdjHsch85VYW1qiRzvrAdUVnR4LlAMvIKLqMeVyR0XgNFks-TXxvmMS1L65fFTVU9Zo6dFd6jGRHba",
      },
      {
        title: "Adorno Iniciales",
        category: "Adornos",
        aspect: "aspect-square",
        alt: "Set de esferas de cerámica sublimadas con monograma familiar en tipografía serif, colgando de una rama de pino.",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAswm9HMG6nb4fK-ZrS9AI20-xWcllwWRaOrsAnGwrsYTXl4pKyuPHgn--I_tmXPxsZRZMDzFH0EkELj-0OaZmDfwasMvM20lY2mrzOad1iJUd2SV_Ock6KcGrKNyiNspn6pWj9pxzbS9D9GdpC7iPFAlt2umVGE5mGjLB7POauq-nbG8QmMyEtbcR1ky_BBsNZMV0hCumNhvkhjhWQAZYM-1jR3_d5TYgXuCbL_dfMC7wboJjK2Tsc",
      },
      {
        title: "Playera Vintage Renos",
        category: "Playeras",
        aspect: "aspect-[3/4]",
        alt: "Playera de algodón suave con ilustración vintage sublimada de un reno en un bosque nevado.",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe1jmeClt1Nt-7WJrvwV8wy-HgnK22YEx4jrpY2GXfkYq_AB7xUHw3xOf0ljgSOA-4YrKvzPIBwxKT5QA32Q0yPA9PYlsVUEQmniHSFHsfEiOeyIENAkMOKOuNyLOMSG2cTtD4cpvoIFku6WaKoLZbsj2DPXGjapAscv0dTHwGgNWc1jBSid2nRctfPzmnT9eapIPd__P1WWBO4EvgI9_PVoZdq2ZlxQJ054jFB8CrCHHKkSU3tRZt",
      },
      {
        title: "Plato Festivo",
        category: "Tazas",
        aspect: "aspect-[3/5]",
        alt: "Plato de cerámica sublimado con diseño de acebo y bayas, con galletas de jengibre recién horneadas.",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6Qx3V1YNZ1Ad71eBJ7b65h0TKLCr5I82o3Q4ziO3A817HKxDhc5Td44162Z7O9e1i2_7RRkgn7tD2kJAeuxJBxV0tt7Y8t6VC7Ga8R7_43HPSHlMvoNyu3MHCoV7WcKhExUxnKLBdmiKEd72M_bHBKQ9iFSj_jZk-DjZgDfwsHfPeoCk3PVeh5t6Pa0cZUbOVIyu7O48sKv3roMBNHoXmCGyk1sNTuxMWmlrSWsOWPmPJUloli3oV",
      },
    ],
  },
];

export function getSeason(slug: string) {
  return SEASONS.find((s) => s.slug === slug);
}
