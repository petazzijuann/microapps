import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, #ff3b30, #ff9f0a, #ffcc00, #34c759, #00c7be, #0a84ff, #5856d6)",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#0a0a0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f4f4f5",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size }
  );
}
