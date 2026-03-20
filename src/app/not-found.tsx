import Link from "next/link";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "480px" }}>
        <h1
          style={{
            fontSize: "120px",
            fontWeight: 700,
            color: "var(--primary)",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#212529",
            marginBottom: "12px",
          }}
        >
          Page Not Found
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#6C757D",
            lineHeight: 1.6,
            marginBottom: "32px",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <Home style={{ width: "18px", height: "18px" }} />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="btn btn-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <ShoppingBag style={{ width: "18px", height: "18px" }} />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
