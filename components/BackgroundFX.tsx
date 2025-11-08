// app/components/BackgroundFX.tsx
export default function BackgroundFX() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 -top-1/3 h-[40rem] w-[40rem] rounded-full bg-fuchsia-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-20%] top-1/4 h-[36rem] w-[36rem] rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] left-1/3 h-[28rem] w-[28rem] rounded-full bg-emerald-400/20 blur-3xl"
      />
    </>
  );
}
