import Link from "next/link";

const masterLogo = "/assets/brand/flowcoat-master-logo.png";

export function BrandLogo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="FLOWCOAT home"
      className={inverted ? "inline-flex bg-white p-2" : "inline-flex"}
    >
      <img
        src={masterLogo}
        alt="FLOWCOAT Powder Coating"
        width={600}
        height={400}
        className={inverted ? "h-24 w-auto" : "h-16 w-auto"}
      />
    </Link>
  );
}
