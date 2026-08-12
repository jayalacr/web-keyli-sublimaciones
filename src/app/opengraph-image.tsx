import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #5E3E80 0%, #9D6BAA 100%)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#FFD84D",
            display: "flex",
          }}
        >
          Keyli
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, color: "white", display: "flex" }}>
          Sublimaciones
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "rgba(255,255,255,.85)",
            display: "flex",
          }}
        >
          Playeras · Tazas · Termos · Llaveros — DTF y sublimación
        </div>
      </div>
    ),
    size
  );
}
