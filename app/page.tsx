"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const title = "RECEIPT SPLIT AVI";

  return (
    <main className="flex min-h-screen items-start justify-center overflow-x-hidden bg-[#1B0E34] px-0 text-white sm:px-6">
      <div className="landing-poster relative min-h-[100svh] w-[min(100vw,430px)] overflow-hidden bg-[#1B0E34]">
        <div
          className="orange-block absolute left-[clamp(1.1rem,4vw,1.6rem)] top-[clamp(2rem,5svh,2.4rem)] h-[clamp(2.5rem,6svh,3rem)] w-[clamp(7rem,28vw,8.5rem)]"
          style={{ backgroundColor: "var(--orange)" }}
        />

        <div
          className="blue-stroke absolute left-[clamp(6.8rem,18vw,8rem)] top-[clamp(1.4rem,3svh,2rem)] h-[clamp(38rem,96svh,50rem)] w-[clamp(10rem,42vw,13rem)]"
          aria-hidden="true"
        >
          <div
            className="absolute left-[10%] top-0 h-[55%] w-[76%] border-[clamp(0.5rem,1.45vw,0.62rem)]"
            style={{
              borderColor: "var(--blue)",
              borderRadius: "64% 36% 24% 76% / 22% 72% 28% 78%",
              transform: "rotate(23deg)",
            }}
          />
          <div
            className="absolute left-[2%] top-[33%] h-[58%] w-[78%] border-[clamp(0.5rem,1.45vw,0.62rem)]"
            style={{
              borderColor: "var(--blue)",
              borderRadius: "28% 72% 22% 78% / 18% 68% 32% 82%",
              transform: "rotate(29deg)",
            }}
          />
        </div>

        <div className="absolute left-[clamp(4.5rem,12vw,5rem)] top-[calc(clamp(2rem,5svh,2.4rem)+clamp(2.5rem,6svh,3rem)+clamp(0.7rem,1.8svh,0.95rem))] bottom-[clamp(1.2rem,3svh,1.6rem)] z-10 w-[clamp(4.5rem,10vw,5rem)]">
          <span
            className="hero-title absolute bottom-0 left-0 block whitespace-nowrap text-[clamp(3.2rem,9.4svh,4.8rem)] leading-[1.02] tracking-[-0.06em]"
            style={{ transform: "rotate(-90deg)", transformOrigin: "bottom left" }}
          >
            {title}
          </span>
        </div>

        <div className="absolute right-[clamp(1.45rem,5vw,2rem)] top-[clamp(13.8rem,32svh,15.6rem)] z-10 max-w-[clamp(8.2rem,28vw,9rem)] text-left">
          <p
            className="hero-subtitle text-[clamp(1.18rem,3.7vw,1.65rem)] font-normal normal-case leading-[0.93] tracking-[-0.03em]"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Everyone pays for what they ordered.
          </p>
          <p
            className="hero-meta mt-[clamp(1.1rem,2.8svh,1.45rem)] max-w-[7.5rem] text-[clamp(0.74rem,1.7vw,0.84rem)] leading-[1.16] tracking-[0.06em]"
            style={{ color: "var(--lime)" }}
          >
            SCAN / SPLIT / VENMO /
          </p>
        </div>

        <div className="hero-cta absolute bottom-[clamp(3.5rem,7.8svh,4.4rem)] right-[clamp(1rem,4vw,1.5rem)] z-10">
          <button
            onClick={() => router.push("/upload")}
            className="min-w-[clamp(11rem,40vw,13.2rem)] max-w-[13.2rem] px-[clamp(0.95rem,3.2vw,1.25rem)] py-[clamp(0.9rem,2.2svh,1.05rem)] text-[clamp(0.9rem,3vw,1.15rem)] leading-[0.9] text-black active:scale-95 transition-transform duration-100"
            style={{ backgroundColor: "var(--lime)" }}
          >
            START SPLITTING
          </button>
        </div>
      </div>
    </main>
  );
}
