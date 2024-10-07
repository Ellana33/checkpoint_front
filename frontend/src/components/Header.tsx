import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col items-center header text-white p-6">
      <h1 className="font-bold text-xl mb-2">Checkpoint : frontend</h1>
      <Link href="/">Countries</Link>
    </header>
  );
}
