// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      // ROOT: hat 3 Kinder → display:flex + column
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0A0B0F",
          display: "flex",
          flexDirection: "column",
          padding: 64,
          color: "white",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        {/* HEADER: genau 2 Kinder → display:flex */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
            color: "#D4D4D8",
            fontSize: 28,
          }}
        >
          {/* LOGO-BOX: 1 Kind → okay */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#0A0B0F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {/* KREIS: 1 Kind → okay */}
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 9999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* DREIECK als Block, NICHT absolut */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderBottom: "12px solid white",
                }}
              />
            </div>
          </div>

          {/* LABEL */}
          <div>AI Mastery Lab</div>
        </div>

        {/* CONTENT: 2 Kinder → display:flex + column */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              margin: 0,
              color: "white",
              fontWeight: 700,
            }}
          >
            Practical AI News, Guides & Education
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 28,
              color: "#E4E4E7",
              maxWidth: 900,
            }}
          >
            Turn AI from buzzword into daily advantage.
          </div>
        </div>

        {/* FOOTER: 2 Kinder → display:flex */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#A1A1AA",
          }}
        >
          <div>ai-news-site-alpha.vercel.app</div>
          <div>Learn • Build • Automate</div>
        </div>
      </div>
    ),
    size
  );
}
