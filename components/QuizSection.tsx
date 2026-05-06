"use client";

import { QRCodeSVG } from "qrcode.react";

// 🔧 Update this with the actual Kahoot game link before the presentation.
// Default points to kahoot.it where students enter the PIN manually.
const KAHOOT_URL = "https://kahoot.it/";

const QUESTIONS = [
  {
    n: "01",
    level: "EASY",
    q: "What is the famous nickname of Istanbul Park's Turn 8?",
  },
  {
    n: "02",
    level: "EASY",
    q: "When was the construction of Istanbul Park completed?",
  },
  {
    n: "03",
    level: "MEDIUM",
    q: "Which driver became known as the 'King of Istanbul'?",
  },
];

export function QuizSection() {
  return (
    <section
      className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden"
      aria-label="Join the Kahoot quiz"
      style={{
        background:
          "radial-gradient(ellipse at center top, rgba(255,24,1,0.18) 0%, rgba(0,0,0,0) 60%), #000",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="hud text-accent text-[11px] mb-6 text-center">
          — END OF PRESENTATION / TIME TO PLAY —
        </div>

        <h2 className="text-center font-display font-black tracking-[-0.04em] leading-[0.92] text-[clamp(56px,9vw,120px)]">
          JOIN THE <span className="text-accent">QUIZ</span>
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-center text-text-secondary text-base md:text-lg leading-relaxed font-serif italic">
          Three questions. One winner. Scan with your phone camera, enter the
          game PIN your instructor displays, and let&apos;s see who was paying
          attention.
        </p>

        {/* QR Code panel */}
        <div className="mt-16 grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center justify-items-center max-w-4xl mx-auto">
          <div className="relative">
            {/* Corner ticks (F1 broadcast frame) */}
            <span className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 border-accent" />
            <span className="absolute -top-3 -right-3 w-5 h-5 border-t-2 border-r-2 border-accent" />
            <span className="absolute -bottom-3 -left-3 w-5 h-5 border-b-2 border-l-2 border-accent" />
            <span className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 border-accent" />
            <div className="bg-white p-5">
              <QRCodeSVG
                value={KAHOOT_URL}
                size={220}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
                marginSize={0}
              />
            </div>
            <div className="mt-3 hud text-text-tertiary text-[10px] text-center tracking-[0.3em]">
              ◉ SCAN TO JOIN
            </div>
          </div>

          <div className="space-y-6 w-full">
            <div>
              <div className="hud text-text-tertiary text-[10px]">STEP 01</div>
              <div className="font-mono text-white text-lg mt-1 leading-snug">
                Scan the QR with your phone camera
              </div>
            </div>
            <div>
              <div className="hud text-text-tertiary text-[10px]">STEP 02</div>
              <div className="font-mono text-white text-lg mt-1 leading-snug">
                Open <span className="text-accent">kahoot.it</span> and enter
                the game PIN shown on screen
              </div>
            </div>
            <div>
              <div className="hud text-text-tertiary text-[10px]">STEP 03</div>
              <div className="font-mono text-white text-lg mt-1 leading-snug">
                Type your name and play
              </div>
            </div>
          </div>
        </div>

        {/* Question preview */}
        <div className="mt-20 max-w-4xl mx-auto border-t border-border pt-10">
          <div className="hud text-text-tertiary text-[11px] mb-6 text-center">
            — WHAT YOU&rsquo;LL BE ASKED —
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {QUESTIONS.map((qq) => (
              <div
                key={qq.n}
                className="border border-border bg-bg/60 backdrop-blur-sm p-5 relative"
              >
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent" />
                <div className="flex items-baseline justify-between hud text-[10px]">
                  <span className="text-accent font-bold">Q{qq.n}</span>
                  <span className="text-text-tertiary">{qq.level}</span>
                </div>
                <p className="mt-4 font-serif text-white text-base leading-snug">
                  {qq.q}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 text-center hud text-text-muted text-[10px]">
          ◉ KAHOOT! · LIVE GAME · 4-OPTION MULTIPLE CHOICE
        </p>
      </div>
    </section>
  );
}
