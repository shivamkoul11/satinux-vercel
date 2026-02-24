"use client";

import { ReactNode } from "react";

export default function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Mobile: full-bleed */}
      <div className="block md:hidden w-full h-dvh overflow-hidden">
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>

      {/* Desktop: Android-like device frame */}
      <div className="hidden md:flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
        <div className="relative">
          {/* Outer bezel */}
          <div className="bg-[#1a1a1a] rounded-[3rem] p-[10px] shadow-2xl shadow-black/50 border border-zinc-700/50">
            {/* Inner frame with camera notch */}
            <div className="bg-black rounded-[2.4rem] overflow-hidden relative">
              {/* Camera punch-hole */}
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full z-50 flex items-center justify-center">
                <div className="w-[10px] h-[10px] rounded-full bg-zinc-800 border border-zinc-700" />
              </div>

              {/* Screen area */}
              <div
                className="w-[402px] h-[870px] overflow-y-auto overflow-x-hidden relative"
                style={{ scrollbarWidth: "none" }}
              >
                {children}
              </div>
            </div>
          </div>

          {/* Side buttons (visual only) */}
          <div className="absolute right-[-3px] top-[140px] w-[3px] h-[60px] bg-zinc-600 rounded-r-sm" />
          <div className="absolute left-[-3px] top-[120px] w-[3px] h-[40px] bg-zinc-600 rounded-l-sm" />
          <div className="absolute left-[-3px] top-[180px] w-[3px] h-[70px] bg-zinc-600 rounded-l-sm" />
        </div>
      </div>
    </>
  );
}
