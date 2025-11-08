// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0A0B0F",
          display: "flex",
          flexDirection: "column",
          padding: 64,
          color: "white",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        {/* container mit mehreren Kindern → explizit display:flex */}
        <div style={{ flex: 1, position: "relative", display: "flex" }}>
          {/* dekorative Bubbles */}
          <div
            style={{
              position: "absolute",
              top: -80,
              left: -80,
              width: 500,
              height: 500,
              background:
                "radial-gradient(closest-side, rgba(236,72,153,0.25), transparent)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -120,
              right: -80,
              width: 600,
              height: 600,
              background:
                "radial-gradient(closest-side, rgba(99,102,241,0.25), transparent)",
              borderRadius: "50%",
            }}
          />
          {/* Inhalt */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",       // vorher inline-flex → flex
                alignItems: "center",
                gap: 12,
                fontSize: 28,
                color: "#D4D4D8",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "#0A0B0F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 4,
                      right: 4,
                      top: 2,
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderBottom: "12px solid white",
                    }}
                  />
                </div>
              </div>
              AI Mastery Lab
            </div>

            <h1
              style={{
                fontSize: 72,
                lineHeight: 1.05,
                margin: 0,
                backgroundImage:
                  "linear-gradient(135deg, #fff, #d4d4d8 70%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Practical AI News, Guides & Education
            </h1>
            <p
              style={{
                marginTop: 18,
                fontSize: 28,
                color: "#E4E4E7",
                maxWidth: 900,
              }}
            >
              Turn AI from buzzword into daily advantage.
            </p>
          </div>
        </div>

        {/* Footerleiste → mehrere Kinder, also display:flex */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#A1A1AA",
          }}
        >
          <span>ai-news-site-alpha.vercel.app</span>
          <span>Learn • Build • Automate</span>
        </div>
      </div>
    ),
    size
  );
}
