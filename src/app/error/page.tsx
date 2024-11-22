'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link'; // Import Link from next/link

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const description = searchParams.get('description');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
        <h1 className="font-bold text-lg mb-2">Authentication Error</h1>
        <p>{error}</p>
        {description && <p className="mt-2 text-sm">{description}</p>}
        <Link
          href="/"
          className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}