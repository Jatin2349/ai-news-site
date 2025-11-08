// app/icon.tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#0A0B0F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* exakt EIN Kind für dieses div */}
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.16)",
            position: "relative",
            display: "flex",            // falls später noch etwas dazukommt
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* zweites Kind ist absolut positioniert → bleibt 1 „sichtbares“ Kind */}
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
    ),
    size
  );
}
