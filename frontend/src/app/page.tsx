import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Second Brain</h1>
      <nav>
        <Link href="/dashboard">Go to Dashboard</Link>
      </nav>
    </div>
  );
}