// app/live/page.tsx
import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function Search() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  );
}

function SearchFallback() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
        Route Search
      </h1>
      <p className="mt-2 text-muted-foreground">
        Find the best route for your journey
      </p>
      <div className="mt-8 flex justify-center items-center min-h-100">
        <div className="text-gray-500">Loading...</div>
      </div>
    </div>
  );
}
