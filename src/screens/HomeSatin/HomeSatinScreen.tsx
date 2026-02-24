"use client";

import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import BottomSheet from "@/components/BottomSheet";

/* ─── Asset paths (all local, no expiring URLs) ─── */
const A = "/assets/home-satin";

const heroSlides = [
  { src: `${A}/carousel/hero-default.png`, title: "Jaipur wali shaadi ki jhalkiya...🥰", count: "225 ready to view" },
  { src: `${A}/images/foryou-festivals.png`, title: "Festival memories ✨", count: "142 ready to view" },
  { src: `${A}/images/foryou-celebration.png`, title: "Celebration highlights 🎉", count: "98 ready to view" },
];

const actionCards = [
  { src: `${A}/images/card-meera.png`, label: "Meera's photos", wide: true, hasChevron: true, sheetId: "meera" },
  { src: `${A}/images/card-create-wish.png`, label: "Create wish ", wide: false, sheetId: "wish" },
  { src: `${A}/images/card-ghibli.png`, label: "Try Ghibli ✨", wide: false, sheetId: "ghibli" },
  { src: `${A}/images/card-create-video.png`, label: "Create video", wide: true, sheetId: "video" },
  { src: `${A}/images/card-enhance.png`, label: "Enhance", wide: false, sheetId: "enhance" },
];

const categoryChips = [
  { label: "Birthday", bg: "bg-chip-red", text: "text-white" },
  { label: "Wedding", bg: "bg-chip-yellow", text: "text-grey-13" },
  { label: "Goa trip", bg: "bg-chip-green", text: "text-grey-13" },
  { label: "Meena ki shaadi", bg: "bg-chip-purple", text: "text-white" },
  { label: "Free up 1.2 GB", bg: "bg-chip-orange", text: "text-grey-13" },
];

const forYouItems = [
  { src: `${A}/images/foryou-festivals.png`, label: "Festivals", badge: null },
  { src: `${A}/images/foryou-shivratri.png`, label: "Shivratri video is ready 😍", badge: "Made with AI" },
  { src: `${A}/images/foryou-celebration.png`, label: "Celebration 💃🏻", badge: null },
  { src: `${A}/images/foryou-people.png`, label: "People", badge: null },
  { src: `${A}/images/foryou-nature.png`, label: "Family", badge: null },
];

const memoryItems = [
  { src: `${A}/images/aicam-3.png`, label: "Holi 2024" },
  { src: `${A}/profiles/profile.png`, label: "Over the years" },
  { src: `${A}/images/foryou-nature.png`, label: "Family 2022" },
  { src: `${A}/images/foryou-celebration.png`, label: "Navratri 2025" },
  { src: `${A}/images/aicam-1.png`, label: "Nashik 2026" },
];

const aiMagicCards = [
  { src: `${A}/frames/frame9.png`, label: "Holi video made for you", type: "video" as const },
  { src: `${A}/frames/frame10.png`, label: "We auto-enhanced a photo for you", type: "ai" as const },
  { src: `${A}/frames/frame11.png`, label: "Slideshow of Avni's photos", type: "slideshow" as const },
  { src: `${A}/frames/frame12.png`, label: "Made a collage for you", type: "collage" as const },
];

const collageTemplates = [
  `${A}/frames/frame13.png`,
  `${A}/frames/frame14.png`,
  `${A}/frames/frame15.png`,
];

const videoTags = [
  { label: "Birthday" },
  { label: "Nitin", profile: `${A}/profiles/profile1.png` },
  { label: "Wedding" },
  { label: "Vaishno Devi" },
  { label: "Udaipur" },
  { label: "Diwali" },
  { label: "Deepika", profile: `${A}/profiles/profile.png` },
  { label: "Wedding in Pune" },
  { label: "Mugdha weds Vijay" },
  { label: "Roxy", profile: `${A}/profiles/profile2.png` },
  { label: "Flowers", profile: `${A}/profiles/profile3.png` },
  { label: "Spruha", profile: `${A}/profiles/profile4.png` },
  { label: "Dance" },
  { label: "Food" },
  { label: "Guhaghar" },
];

/* ─── Sub-components ─── */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 text-white text-xs font-semibold">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="3" width="3" height="9" rx="0.5"/><rect x="4" y="2" width="3" height="10" rx="0.5"/><rect x="8" y="1" width="3" height="11" rx="0.5"/><rect x="12" y="0" width="3" height="12" rx="0.5"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 3.6C9.9 3.6 11.6 4.3 12.9 5.5L14.3 4C12.7 2.5 10.5 1.6 8 1.6C5.5 1.6 3.3 2.5 1.7 4L3.1 5.5C4.4 4.3 6.1 3.6 8 3.6ZM8 7.2C9 7.2 9.9 7.6 10.6 8.2L12 6.8C11 5.9 9.6 5.2 8 5.2C6.4 5.2 5 5.9 4 6.8L5.4 8.2C6.1 7.6 7 7.2 8 7.2ZM8 10.8C8.6 10.8 9.1 10.5 9.4 10.2L8 8.4L6.6 10.2C6.9 10.5 7.4 10.8 8 10.8Z"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor"><rect x="0" y="1" width="22" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/><rect x="2" y="3" width="18" height="6" rx="1"/><rect x="23" y="4" width="2" height="4" rx="0.5"/></svg>
      </div>
    </div>
  );
}

function HeroDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex gap-1.5 justify-center mt-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === active ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
          }`}
        />
      ))}
    </div>
  );
}

/* ─── Main Screen ─── */

export default function HomeSatinScreen() {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);

  const [heroRef, heroApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const [actionRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [forYouRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [memoryRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [aiMagicRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [collageRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const onHeroSelect = useCallback(() => {
    if (!heroApi) return;
    setHeroIndex(heroApi.selectedScrollSnap());
  }, [heroApi]);

  if (heroApi && !heroApi.on) {
    // noop
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  if (heroApi) {
    heroApi.on("select", onHeroSelect);
  }

  return (
    <div className="relative w-[402px] min-h-full bg-[#0e0503]">
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('${A}/images/home-satin-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />

      {/* Status bar */}
      <div className="sticky top-0 z-30">
        <StatusBar />
        <div className="px-4 pb-2">
          <p className="text-white text-[13px]">
            <span className="font-bold">Shubh Prabhaat, </span>
            <span className="font-bold text-marigold">Seema</span>
          </p>
        </div>
      </div>

      {/* ─── HERO CAROUSEL ─── */}
      <div className="relative z-10">
        <div ref={heroRef} className="overflow-hidden">
          <div className="flex">
            {heroSlides.map((slide, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 relative">
                <div className="relative w-full aspect-square">
                  <img
                    src={slide.src}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#170504] via-transparent to-[#170504]/80" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay search bar on hero */}
        <div className="absolute top-0 left-0 right-0 px-4 pt-1 z-20">
          <div className="bg-crimson-dark/80 border border-white/20 backdrop-blur-md rounded-lg flex items-center gap-2 px-4 py-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span className="text-white/90 text-sm font-semibold flex-1">Hindi ya English mein puche</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15a.998.998 0 0 0-.98-.85c-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08a6.993 6.993 0 0 0 5.91-5.78c.1-.6-.39-1.14-1-1.14z"/></svg>
          </div>
        </div>

        {/* Hero overlay text */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="bg-crimson/50 backdrop-blur-xl rounded-2xl p-4 flex items-center">
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">{heroSlides[heroIndex]?.title}</p>
              <p className="text-white/70 text-xs mt-0.5">{heroSlides[heroIndex]?.count}</p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </div>
          </div>
          <HeroDots count={heroSlides.length} active={heroIndex} />
        </div>
      </div>

      {/* ─── ACTION CARDS ROW ─── */}
      <div className="relative z-10 mt-2">
        <div ref={actionRef} className="overflow-hidden px-4">
          <div className="flex gap-2">
            {actionCards.map((card, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 relative rounded-2xl overflow-hidden shadow-lg ${card.wide ? "w-[130px]" : "w-[94px]"} h-[94px]`}
                onClick={() => setActiveSheet(card.sheetId)}
              >
                <img src={card.src} alt="" className="w-full h-full object-cover" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFF2EB]/90 via-[#FDE9DF]/90 to-transparent" style={{ top: "46%" }} />
                <span className="absolute bottom-2 left-2 text-[12px] font-semibold text-black leading-tight">
                  {card.label}
                </span>
                {card.hasChevron && (
                  <div className="absolute bottom-1.5 right-1 w-6 h-6 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="black"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CATEGORY CHIPS ─── */}
      <div className="relative z-10 mt-3 overflow-x-auto pl-4 flex gap-2">
        {categoryChips.map((chip, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.93 }}
            className={`flex-shrink-0 ${chip.bg} ${chip.text} text-xs font-medium px-3 py-2 rounded-lg`}
          >
            {chip.label}
          </motion.button>
        ))}
      </div>

      {/* ─── FOR YOU SECTION ─── */}
      <div className="relative z-10 mt-5 pl-4">
        <p className="text-white text-base font-bold">For you 💖</p>
        <p className="text-white/80 text-[13px] font-medium mt-0.5">Because of Shivratri & recent celebrations</p>

        <div ref={forYouRef} className="overflow-hidden mt-2">
          <div className="flex gap-2.5">
            {forYouItems.map((item, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 w-[120px] relative"
                onClick={() => setActiveSheet("foryou")}
              >
                <div className="w-[120px] h-[213px] rounded-lg overflow-hidden relative">
                  <img src={item.src} alt="" className="w-full h-full object-cover" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FF9EAA]/90 to-transparent" style={{ top: "63%" }} />
                </div>
                <p className="text-grey-100 text-[10px] font-semibold mt-[-28px] relative z-10 ml-2.5 leading-tight">
                  {item.label}
                </p>
                {item.badge && (
                  <div className="bg-marigold rounded-[10px] px-2 py-1 flex items-center gap-1 mt-1 ml-2 w-fit">
                    <span className="text-grey-100 text-[10px]">{item.badge}</span>
                    <img src={`${A}/icons/sparkle.png`} alt="" className="w-4 h-4" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── AI CAMERA BANNER ─── */}
      <div className="relative z-10 mt-5 px-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="bg-[#f8ddff]/90 backdrop-blur-xl rounded-2xl w-full flex items-center px-4 py-3.5"
          onClick={() => setActiveSheet("aicamera")}
        >
          <div className="flex-1">
            <p className="text-grey-100 text-sm font-semibold">Try the AI camera</p>
            <p className="text-grey-100 text-sm font-normal">Point, shoot, and let AI wow you</p>
          </div>
          <div className="w-[55px] h-[28px] overflow-hidden rounded">
            <img src={`${A}/images/aicam-2.png`} alt="" className="w-full h-full object-cover" />
          </div>
        </motion.button>
      </div>

      {/* ─── MEMORIES ─── */}
      <div className="relative z-10 mt-5 pl-4">
        <p className="text-white text-base font-bold">Memories 🥰</p>
        <p className="text-white/80 text-[13px] font-medium mt-0.5">A blast from the past...</p>

        <div ref={memoryRef} className="overflow-hidden mt-2">
          <div className="flex gap-2.5">
            {memoryItems.map((item, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 w-[90px] relative"
                onClick={() => setActiveSheet("memories")}
              >
                <div className="w-[90px] h-[160px] rounded-lg overflow-hidden relative">
                  <img src={item.src} alt="" className="w-full h-full object-cover" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FF9EAA]/90 to-transparent" style={{ top: "52%" }} />
                </div>
                <p className="text-grey-100 text-[10px] font-semibold mt-[-20px] relative z-10 ml-2 leading-tight">
                  {item.label}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── AI MAGIC FOR YOU ─── */}
      <div className="relative z-10 mt-5 pl-4">
        <p className="text-white text-base font-bold">AI magic for you ✨</p>

        <div ref={aiMagicRef} className="overflow-hidden mt-2">
          <div className="flex gap-2.5">
            {aiMagicCards.map((card, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 w-[170px] h-[302px] rounded-[20px] overflow-hidden relative"
                onClick={() => setActiveSheet("aimagic")}
              >
                <img src={card.src} alt="" className="w-full h-full object-cover" draggable={false} />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "linear-gradient(to top, rgba(255,158,170,0.9) 10%, rgba(255,158,170,0) 30%), linear-gradient(90deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2))",
                  }}
                />
                <div className="absolute top-4 left-4 right-2">
                  <p className="text-grey-100 text-xs font-semibold leading-snug">{card.label}</p>
                </div>
                {card.type === "video" && (
                  <div className="absolute bottom-3 right-3 w-9 h-9 opacity-90">
                    <svg viewBox="0 0 36 36" fill="white"><circle cx="18" cy="18" r="18" fillOpacity="0.3"/><path d="M14 11l12 7-12 7V11z" fill="white"/></svg>
                  </div>
                )}
                {card.type === "ai" && (
                  <div className="absolute bottom-3 right-3 bg-marigold rounded-[10px] px-2 py-1 flex items-center gap-1">
                    <span className="text-grey-100 text-[10px]">Made with AI</span>
                    <img src={`${A}/icons/sparkle.png`} alt="" className="w-4 h-4" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── TRY SOME AI MAGIC CTA ─── */}
      <div className="relative z-10 mt-5 px-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="bg-orange-cta rounded-lg w-full py-3"
          onClick={() => setActiveSheet("aimagic")}
        >
          <p className="text-grey-100 text-2xl font-bold text-center" style={{ fontFamily: "'Familjen Grotesk', sans-serif" }}>
            Try some AI magic✨
          </p>
          <p className="text-grey-100 text-xs font-medium text-center mt-0.5">
            Quickly turn you photos into work of art
          </p>
        </motion.button>
      </div>

      {/* ─── COLLAGES ─── */}
      <div className="relative z-10 mt-5 px-4">
        <p className="text-marigold text-[26px] font-black text-center leading-snug">Collages</p>
        <p className="text-white text-xs font-medium text-center">Select a template</p>
      </div>
      <div className="relative z-10 mt-3">
        <div ref={collageRef} className="overflow-hidden px-4">
          <div className="flex gap-2.5">
            {collageTemplates.map((src, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 w-[170px] h-[302px] rounded-[20px] overflow-hidden"
                onClick={() => setActiveSheet("collages")}
              >
                <img src={src} alt="" className="w-full h-full object-cover" draggable={false} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CREATE A VIDEO ─── */}
      <div className="relative z-10 mt-5 px-4 pb-28">
        <p className="text-marigold text-[26px] font-black text-center leading-snug">Create a video</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {videoTags.map((tag, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.93 }}
              className="bg-white rounded-[28px] px-3 py-2 flex items-center gap-1"
              onClick={() => setActiveSheet("video")}
            >
              {tag.profile && (
                <img src={tag.profile} alt="" className="w-6 h-6 rounded-full object-cover" />
              )}
              <span className="text-grey-100 text-xs font-medium">{tag.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── BOTTOM NAVIGATION ─── */}
      <div className="sticky bottom-0 z-30 flex items-center justify-center gap-3 pb-4 pt-2 px-4">
        <div className="bg-nav-gold rounded-[44px] px-4 py-2.5 flex gap-11 items-center shadow-lg">
          <NavButton active={activeNav === 0} onClick={() => setActiveNav(0)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={activeNav === 0 ? "#141414" : "#141414"} opacity={activeNav === 0 ? 1 : 0.5}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </NavButton>
          <NavButton active={activeNav === 1} onClick={() => setActiveNav(1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#141414" opacity={activeNav === 1 ? 1 : 0.5}><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zm-9-1a2 2 0 0 1 4 0v1h-4V6z"/></svg>
          </NavButton>
          <NavButton active={activeNav === 2} onClick={() => setActiveNav(2)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#141414" opacity={activeNav === 2 ? 1 : 0.5}><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>
          </NavButton>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-nav-gold rounded-[44px] w-[52px] py-2.5 flex items-center justify-center shadow-lg"
          onClick={() => setActiveSheet("upload")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#141414"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-nav-pink rounded-[44px] w-[52px] py-2.5 flex items-center justify-center shadow-lg"
          onClick={() => setActiveSheet("aicamera")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#141414"><path d="M12 10a2 2 0 100 4 2 2 0 000-4zm8-3h-2.59l-1.83-2H8.41L6.59 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm-8 12a5 5 0 110-10 5 5 0 010 10z"/></svg>
        </motion.button>
      </div>

      {/* ─── BOTTOM SHEETS ─── */}
      <BottomSheet
        isOpen={activeSheet === "meera"}
        onClose={() => setActiveSheet(null)}
        title="Meera's photos"
      >
        <div className="grid grid-cols-3 gap-2">
          {[`${A}/images/foryou-festivals.png`, `${A}/images/foryou-shivratri.png`, `${A}/images/foryou-celebration.png`, `${A}/images/foryou-people.png`, `${A}/images/foryou-nature.png`, `${A}/carousel/hero-default.png`].map((src, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <p className="text-white/60 text-xs text-center mt-4">225 photos ready to view</p>
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === "ghibli"}
        onClose={() => setActiveSheet(null)}
        title="Try Ghibli ✨"
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-32 h-32 rounded-2xl overflow-hidden">
            <img src={`${A}/images/card-ghibli.png`} alt="" className="w-full h-full object-cover" />
          </div>
          <p className="text-white/80 text-sm text-center">Transform your photos into beautiful Ghibli-style art</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-marigold text-grey-100 font-bold text-sm px-8 py-3 rounded-full"
          >
            Try Now
          </motion.button>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === "wish"}
        onClose={() => setActiveSheet(null)}
        title="Create a wish"
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-32 h-32 rounded-2xl overflow-hidden">
            <img src={`${A}/images/card-create-wish.png`} alt="" className="w-full h-full object-cover" />
          </div>
          <p className="text-white/80 text-sm text-center">Create beautiful wish cards for your loved ones</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-marigold text-grey-100 font-bold text-sm px-8 py-3 rounded-full"
          >
            Create Wish
          </motion.button>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === "video"}
        onClose={() => setActiveSheet(null)}
        title="Create a video"
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-white/80 text-sm text-center">Choose a theme and we&apos;ll create a beautiful video from your photos</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Birthday", "Wedding", "Travel", "Celebration"].map((t) => (
              <motion.button
                key={t}
                whileTap={{ scale: 0.93 }}
                className="bg-white/10 text-white text-xs px-4 py-2 rounded-full"
              >
                {t}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-marigold text-grey-100 font-bold text-sm px-8 py-3 rounded-full mt-2"
          >
            Start Creating
          </motion.button>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === "enhance"}
        onClose={() => setActiveSheet(null)}
        title="Enhance photos"
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-32 h-32 rounded-2xl overflow-hidden">
            <img src={`${A}/images/card-enhance.png`} alt="" className="w-full h-full object-cover" />
          </div>
          <p className="text-white/80 text-sm text-center">AI will automatically enhance your photos for better quality</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-marigold text-grey-100 font-bold text-sm px-8 py-3 rounded-full"
          >
            Enhance Now
          </motion.button>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === "upload"}
        onClose={() => setActiveSheet(null)}
        title="Upload"
      >
        <div className="flex flex-col gap-4 py-2">
          {[
            { icon: "📷", label: "Take a photo" },
            { icon: "🖼️", label: "Choose from gallery" },
            { icon: "📁", label: "Upload from files" },
            { icon: "☁️", label: "Import from cloud" },
          ].map((opt) => (
            <motion.button
              key={opt.label}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 active:bg-white/10"
            >
              <span className="text-2xl">{opt.icon}</span>
              <span className="text-white text-sm font-medium">{opt.label}</span>
            </motion.button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === "aicamera"}
        onClose={() => setActiveSheet(null)}
        title="AI Camera"
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            {[`${A}/images/aicam-1.png`, `${A}/images/aicam-2.png`, `${A}/images/aicam-3.png`].map((src, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-white/80 text-sm text-center">Point, shoot, and let AI wow you</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-nav-pink text-grey-100 font-bold text-sm px-8 py-3 rounded-full"
          >
            Open Camera
          </motion.button>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === "foryou"}
        onClose={() => setActiveSheet(null)}
        title="For you 💖"
      >
        <div className="grid grid-cols-2 gap-2">
          {forYouItems.map((item, i) => (
            <div key={i} className="rounded-lg overflow-hidden aspect-[3/4]">
              <img src={item.src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === "memories"}
        onClose={() => setActiveSheet(null)}
        title="Memories 🥰"
      >
        <div className="grid grid-cols-3 gap-2">
          {memoryItems.map((item, i) => (
            <div key={i} className="rounded-lg overflow-hidden">
              <div className="aspect-[3/4]">
                <img src={item.src} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-white text-[10px] font-semibold mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === "aimagic"}
        onClose={() => setActiveSheet(null)}
        title="AI Magic ✨"
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-white/80 text-sm text-center">AI is working on your photos. Choose what you&apos;d like to create:</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            {["Video", "Collage", "Enhancement", "Slideshow"].map((t) => (
              <motion.button
                key={t}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 text-white text-sm font-medium p-4 rounded-2xl"
              >
                {t}
              </motion.button>
            ))}
          </div>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === "collages"}
        onClose={() => setActiveSheet(null)}
        title="Collages"
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-white/80 text-sm text-center">Choose a template and we&apos;ll create a beautiful collage</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            {collageTemplates.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-[9/16]">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

function NavButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      className="relative w-8 h-8 flex items-center justify-center rounded-full"
      onClick={onClick}
    >
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-grey-100 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
