interface Props {
  size: "banner" | "rectangle" | "native"
}

export default function AdPlaceholder({ size }: Props) {
  const styles: Record<Props["size"], { width: string; height: string; className?: string }> = {
    banner: { width: "728px", height: "90px", className: "mx-auto max-w-full" },
    rectangle: { width: "300px", height: "250px" },
    native: { width: "100%", height: "80px" },
  }

  const { width, height, className } = styles[size]

  const isBanner = size === "banner"
  const isNative = size === "native"

  return (
    <div
      className={`flex items-center justify-center${isBanner ? " w-full" : ""}`}
    >
      <div
        className={className}
        style={{
          width: isNative ? "100%" : width,
          height,
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px dashed rgba(255,255,255,0.1)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.05em",
            userSelect: "none",
          }}
        >
          Advertisement
        </span>
      </div>
    </div>
  )
}
