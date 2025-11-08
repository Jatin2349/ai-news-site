// app/apple-icon.tsx
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 32,
          background: "#0A0B0F",
          display: "flex",              // <- grid -> flex
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.06)",
            border: "2px solid rgba(255,255,255,0.18)",
            position: "relative",
            display: "flex",             // center inner triangle/dot
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 18,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "24px solid transparent",
              borderRight: "24px solid transparent",
              borderBottom: "60px solid white",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 28,
              transform: "translateX(-50%)",
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#fff",
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
