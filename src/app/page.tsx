export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="font-mono text-5xl">
          Detour<span className="opacity-10">app.io</span>
        </h1>
        <ol className="font-mono list-inside list-disc text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Turn hometown commutes into profit.
          </li>
          <li className="tracking-[-.01em]">
            Find cheaper deliveries for your family.
          </li>
        </ol>
      </main>
      <footer className="font-mono row-start-3 flex gap-[24px] flex-wrap items-center justify-center animate-pulse text-[#3e51ff] font-medium">
        Coming soon
      </footer>
    </div>
  );
}
