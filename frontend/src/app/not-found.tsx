import Header from "@/components/layouts/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <div className="grid place-items-center h-screen">
        404 - Not Found
      </div>
    </div>
  );
}
