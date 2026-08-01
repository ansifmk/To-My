import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Heart,
  Sparkles,
  Mail,
  Volume2,
  VolumeX,
  Shuffle,
  X,
  Gift,
} from "lucide-react";

/**
 * Happy Girlfriend Day 💕
 * -----------------------------------------------------------------------
 * HOW TO USE
 * 1. Replace the `photos` array below with your own image paths / URLs
 *    and captions (one per memory you want to show).
 * 2. Replace HER_NAME with your girlfriend's name.
 * 3. Edit the `notes` array with your own personal messages — each tap
 *    on the note card reveals the next one.
 * 4. Edit `reasons` with things you love about her — shown one at a time.
 * 5. Edit `surprise` — the message revealed by the surprise button.
 * 6. Set START_DATE to the date you got together for the "days of us"
 *    counter. Leave as-is or remove that section if you'd rather not show it.
 * 7. Optionally set MUSIC_SRC to a song file for the background music toggle.
 *    If left as a broken path, the button simply won't play anything.
 * 8. Drop this component anywhere in a Tailwind-enabled React app.
 *
 * NEW IN THIS VERSION
 * - Photo section is now an auto-scrolling fanned/coverflow carousel:
 *   cards move continuously on their own, the centered one is largest and
 *   sharp, side cards shrink/fade outward. Hover pauses it. Tap any card
 *   to open it fullscreen in the lightbox.
 * - A "surprise" button triggers a full-screen heart-rain + hidden message
 * - Sections gently fade/rise into view as you scroll to them
 * -----------------------------------------------------------------------
 */

const HER_NAME = "My Love";
const START_DATE = "2024-02-14"; // YYYY-MM-DD — the day it all began
const MUSIC_SRC = "/audio/our-song.mp3";

const photos = [
  {
    src: "/WhatsApp Image 2026-08-01 at 2.54.44 PM (1).jpeg",
    caption: "The day we met",
  },
  {
    src: "/WhatsApp Image 2026-08-01 at 2.54.44 PM (2).jpeg",
    caption: "Our first trip together",
  },
  {
    src: "/WhatsApp Image 2026-08-01 at 2.54.44 PM.jpeg",
    caption: "That silly rainy afternoon",
  },
  {
    src: "/WhatsApp Image 2026-08-01 at 2.54.45 PM (1).jpeg",
    caption: "Just us, being us",
  },
  {
    src: "/WhatsApp Image 2026-08-01 at 2.54.45 PM (2).jpeg",
    caption: "Every moment with you",
  },
  {
    src: "/WhatsApp Image 2026-08-01 at 2.54.45 PM.jpeg",
    caption: "To more memories",
  },
];

const notes = [
  "Every single day with you feels like a gift I didn't know I needed.",
  "You are my favorite hello and my hardest goodbye.",
  "Thank you for loving me exactly as I am.",
  "Here's to more memories, more laughs, and more us.",
];

const highlightNote =
  "Iyy innod mindiyalum njan annoode mindum... iyy innod mindiyilelum njan annood mindum...";

const reasons = [
  "because every moment with you feels like home ❤️",
  "because your smile makes even my hardest days better 🌸",
  "because you are my favorite person in the whole world 🥹",
  "because loving you is the easiest thing I've ever done 💖",
  "because you're the reason behind my happiest smiles ✨",
  "because life feels more beautiful with you by my side 🤍",
  "because you're my today, my tomorrow, and my forever 🌹",
  "because every little thing about you is special to me 🫶",
  "because I'd choose you in every lifetime. ❤️",
];
const surprise = "P.S. — you are, and always will be, my favorite person.";

const loveLetter = [
  "Liluoo, ❤️",
  "Iyy inte alledaa… ink anne orupad ishttamaa. 🥹❤️",
  "iyy santhoshamaayirikkunnathaan ink ettavum valuth.",
  "iyy enn vechaal inte jeevan aaneda… inte life-il ithrayum aazhathil njan snehichittullath iyy mathram. 🥺💖",
  "Love youhh ponnehhh… Endhum ente koode ingane thanne undaavanam. Ummaaa! 🫶🏻😘",
];

/* -------------------------------------------------------------------- */
/* Scroll-reveal wrapper                                                */
/* -------------------------------------------------------------------- */
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function FloatingHearts() {
  const items = Array.from({ length: 9 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = 6 + (i * 92) / 9 + (Math.random() * 6 - 3);
        const delay = Math.random() * 10;
        const duration = 16 + Math.random() * 10;
        const size = 10 + Math.random() * 8;
        const opacity = 0.12 + Math.random() * 0.14;
        return (
          <Heart
            key={i}
            className="absolute text-rose-300 animate-float-up"
            style={{
              left: `${left}%`,
              bottom: "-40px",
              width: size,
              height: size,
              opacity,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
            strokeWidth={1.25}
          />
        );
      })}
    </div>
  );
}

function DaysTogetherBadge() {
  const { count, unit } = useMemo(() => {
    const start = new Date(START_DATE);
    if (isNaN(start.getTime())) return { count: null, unit: "" };
    const days = Math.max(
      0,
      Math.floor((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24)),
    );
    return { count: days, unit: days === 1 ? "day" : "days" };
  }, []);

  if (count === null) return null;

  return <div className=""></div>;
}

function HeartBurst({ bursts }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {bursts.map((b) =>
        b.particles.map((p, i) => (
          <Heart
            key={`${b.id}-${i}`}
            className="absolute text-rose-400 animate-burst"
            fill="currentColor"
            style={{
              left: b.x,
              top: b.y,
              width: p.size,
              height: p.size,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
            }}
          />
        )),
      )}
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Surprise: full-screen heart rain + hidden message                    */
/* -------------------------------------------------------------------- */
function HeartRain() {
  const drops = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 1.8 + Math.random() * 1.6,
        size: 10 + Math.random() * 16,
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {drops.map((d, i) => (
        <Heart
          key={i}
          className="absolute text-rose-400 animate-rain"
          fill="currentColor"
          style={{
            left: `${d.left}%`,
            top: "-30px",
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function SurpriseButton() {
  const [active, setActive] = useState(false);

  const trigger = () => {
    setActive(true);
    setTimeout(() => setActive(false), 3200);
  };

  return (
    <>
      {active && (
        <>
          <HeartRain />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm border border-rose-200 rounded-2xl px-8 py-6 shadow-xl animate-pop-in text-center max-w-sm">
              <Sparkles className="w-6 h-6 text-rose-400 mx-auto mb-2" />
              <p className="font-script text-2xl text-rose-600">{surprise}</p>
            </div>
          </div>
        </>
      )}
      <button
        onClick={trigger}
        className="relative z-10 mt-6 inline-flex items-center gap-2 bg-rose-400 hover:bg-rose-500 text-white font-soft font-semibold text-sm px-5 py-2.5 rounded-full shadow-md transition-colors"
      >
        <Gift className="w-4 h-4" />
        tap for one more surprise
      </button>
    </>
  );
}

function ReasonsCard() {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);

  const shuffleReason = () => {
    setFlip(true);
    setTimeout(() => {
      setI((prev) => (prev + 1) % reasons.length);
      setFlip(false);
    }, 220);
  };

  return (
    <div className="relative z-10 mt-6 max-w-md w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-soft text-xs uppercase tracking-[0.2em] text-rose-400">
          reasons I love you
        </span>
        <button
          onClick={shuffleReason}
          aria-label="Show another reason"
          className="text-rose-400 hover:text-rose-500 transition-colors"
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={shuffleReason}
        className="w-full text-left bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl px-6 py-5 shadow-md shadow-rose-200/50 hover:shadow-lg transition-all"
        style={{
          transform: flip ? "rotateX(90deg)" : "rotateX(0deg)",
          transition: "transform 0.22s ease-in",
        }}
      >
        <p className="font-script text-2xl text-rose-600 leading-snug">
          {reasons[i]}
        </p>
      </button>
    </div>
  );
}

function EnvelopeIntro({ onOpen }) {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    setOpening(true);
    setTimeout(onOpen, 850);
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 transition-opacity duration-700 ${
        opening ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <FloatingHearts />
      <button
        onClick={handleClick}
        className={`relative z-10 group flex flex-col items-center gap-5 transition-transform duration-700 ${
          opening ? "scale-125 -translate-y-10" : "scale-100"
        }`}
      >
        <div className="relative w-40 h-28 md:w-52 md:h-36">
          <div className="absolute inset-0 rounded-lg bg-rose-200 shadow-xl shadow-rose-300/50 group-hover:shadow-rose-300/70 transition-shadow" />
          <div
            className="absolute inset-x-0 top-0 h-1/2 bg-rose-300 origin-top transition-transform duration-500"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: opening ? "rotateX(180deg)" : "rotateX(0deg)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center shadow-md">
              <Heart className="w-4 h-4 text-white" fill="currentColor" />
            </div>
          </div>
        </div>
        <span className="font-script text-3xl text-rose-500">
          tap to open your gift
        </span>
        <Mail className="w-5 h-5 text-rose-400 animate-bounce" />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Auto-scrolling fanned photo carousel                                 */
/* Cards move continuously on their own (no scroll/drag needed). The    */
/* card nearest the center scales up and sits on top; side cards shrink */
/* and fade outward, matching a coverflow look. Tap a card to open it   */
/* fullscreen in the lightbox.                                          */
/* -------------------------------------------------------------------- */
const CARD_WIDTH = 200;
const CARD_GAP = 20;
const SCROLL_SPEED = 0.5; // px per frame, positive = drifts left

function PhotoTile({ photo, onClick }) {
  const [broken, setBroken] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label="Open photo full-screen"
      className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center cursor-zoom-in"
    >
      {!broken ? (
        <img
          src={photo.src}
          alt={photo.caption}
          draggable={false}
          onError={() => setBroken(true)}
          className="h-full w-full select-none object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 text-rose-400">
          <Sparkles className="h-8 w-8" />
          <span className="text-xs font-medium tracking-wide">
            add your photo here
          </span>
        </div>
      )}
    </button>
  );
}

function AutoScrollingPhotoCarousel({ onPhotoClick }) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const xRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(undefined);

  // Triple the list so there are always full sets on both sides of center
  const loopPhotos = [...photos, ...photos, ...photos];

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const singleSetWidth = photos.length * (CARD_WIDTH + CARD_GAP);
    xRef.current = -singleSetWidth;

    const animate = () => {
      if (!pausedRef.current) {
        xRef.current -= SCROLL_SPEED;
        if (xRef.current <= -singleSetWidth * 2) {
          xRef.current += singleSetWidth;
        }
        track.style.transform = `translateX(${xRef.current}px)`;
      }

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const cards = track.children;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(centerX - cardCenter);
        const maxDist = containerRect.width / 2 + CARD_WIDTH;
        const t = Math.min(dist / maxDist, 1);

        const scale = 1 - t * 0.38;
        const translateY = t * 30;
        const opacity = 1 - t * 0.6;
        const z = Math.round((1 - t) * 100);

        card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        card.style.opacity = `${opacity}`;
        card.style.zIndex = `${z}`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full overflow-hidden py-10 sm:py-14"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-pink-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-pink-50 to-transparent" />

      <div
        ref={trackRef}
        className="flex items-center"
        style={{ willChange: "transform", gap: CARD_GAP }}
      >
        {loopPhotos.map((photo, i) => (
          <div
            key={i}
            className="shrink-0 rounded-2xl shadow-xl ring-4 ring-white/70"
            style={{ width: CARD_WIDTH, height: CARD_WIDTH * 1.3 }}
          >
            <PhotoTile photo={photo} onClick={() => onPhotoClick(photo)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Fullscreen photo lightbox                                            */
/* -------------------------------------------------------------------- */
function Lightbox({ photo, onClose }) {
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close photo"
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      <div
        className="max-w-lg w-full animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-rose-100 to-pink-200 aspect-[4/5] flex items-center justify-center">
          {!broken ? (
            <img
              src={photo.src}
              alt={photo.caption}
              onError={() => setBroken(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-rose-400">
              <Sparkles className="w-10 h-10" />
              <span className="text-sm font-medium">add your photo here</span>
            </div>
          )}
        </div>
        <p className="font-script text-2xl text-center text-white mt-4">
          {photo.caption}
        </p>
      </div>
    </div>
  );
}

function LoveLetterCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-10 mt-10 max-w-md w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl px-6 py-4 shadow-md shadow-rose-200/50 hover:shadow-lg transition-shadow"
      >
        <span className="flex items-center gap-2 font-soft text-sm font-semibold text-rose-500">
          <Mail className="w-4 h-4" />a letter, just for you
        </span>
        <span className="font-soft text-xs text-rose-300">
          {open ? "close" : "open"}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          open ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative bg-gradient-to-b from-white to-rose-50 border border-rose-200 rounded-2xl px-7 py-8 shadow-lg shadow-rose-200/60 animate-pop-in">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-rose-400 flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <div className="space-y-4 mt-2">
            {loveLetter.map((line, i) => (
              <p
                key={i}
                className="font-script text-2xl md:text-[1.7rem] text-rose-600 leading-snug"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HighlightNoteCard() {
  return (
    <div className="relative z-10 mt-10 max-w-md w-full">
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 opacity-60 blur-md animate-glow-pulse" />
      <div className="relative bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl px-7 py-8 shadow-xl text-center overflow-hidden">
        <div className="absolute top-3 left-3 text-white/20 text-6xl font-script leading-none select-none">
          "
        </div>
        <Sparkles className="w-5 h-5 text-white/80 mx-auto mb-3" />
        <p className="font-script text-3xl md:text-4xl text-white leading-snug relative">
          {highlightNote}
        </p>
        <div className="absolute bottom-3 right-4 text-white/20 text-6xl font-script leading-none select-none rotate-180">
          "
        </div>
      </div>
    </div>
  );
}

export default function GirlfriendDayGift() {
  const [noteIndex, setNoteIndex] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [bursts, setBursts] = useState([]);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const audioRef = useRef(null);

  const spawnBurst = (e) => {
    const x = e.clientX ?? window.innerWidth / 2;
    const y = e.clientY ?? window.innerHeight / 2;
    const id = Date.now() + Math.random();
    const particles = Array.from({ length: 8 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 50;
      return {
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: 10 + Math.random() * 10,
      };
    });
    setBursts((prev) => [...prev, { id, x, y, particles }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 700);
  };

  const handleOpenGift = () => {
    setOpened(true);
    // Autoplay is often blocked until a user gesture — this click counts as one.
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  const revealNote = (e) => {
    setPulse(true);
    setNoteIndex((n) => (n + 1) % notes.length);
    spawnBurst(e);
    setTimeout(() => setPulse(false), 300);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 flex flex-col items-center justify-center px-4 py-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Quicksand:wght@400;500;600;700&display=swap');
        .font-script { font-family: 'Caveat', cursive; }
        .font-soft { font-family: 'Quicksand', sans-serif; }

        @keyframes float-up {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); }
          100% { transform: translateY(-115vh) translateX(6px) rotate(4deg); }
        }
        .animate-float-up { animation-name: float-up; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }

        @keyframes gentle-pop {
          0% { transform: rotate(-1.5deg) scale(1); }
          50% { transform: rotate(-1.5deg) scale(1.06); }
          100% { transform: rotate(-1.5deg) scale(1); }
        }
        .animate-gentle-pop { animation: gentle-pop 0.3s ease-in-out; }

        @keyframes burst {
          0%   { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(0.3); opacity: 0; }
        }
        .animate-burst { animation: burst 0.7s ease-out forwards; }

        @keyframes rain-fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(200deg); opacity: 0.4; }
        }
        .animate-rain { animation-name: rain-fall; animation-timing-function: ease-in; animation-iteration-count: 1; animation-fill-mode: forwards; }

        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }

        @keyframes pop-in {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in { animation: pop-in 0.3s ease-out; }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.8; }
        }
        .animate-glow-pulse { animation: glow-pulse 2.6s ease-in-out infinite; }
      `}</style>

      {!opened && <EnvelopeIntro onOpen={handleOpenGift} />}
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
      <HeartBurst bursts={bursts} />

      {/* Optional background music — replace MUSIC_SRC with a real audio file */}
      <audio ref={audioRef} src={MUSIC_SRC} loop />

      <FloatingHearts />

      {/* Header */}
      <Reveal className="relative z-10 text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2 text-rose-400">
          <Heart className="w-5 h-5" fill="currentColor" />
          <span className="font-soft text-xs tracking-[0.3em] uppercase">
            Happy Girlfriend Day
          </span>
          <Heart className="w-5 h-5" fill="currentColor" />
        </div>
        <h1 className="font-script text-6xl md:text-7xl text-rose-500 drop-shadow-sm">
          For {HER_NAME}
        </h1>
        <p className="font-soft text-rose-400 mt-2 text-sm md:text-base mb-4">
          a little something to make today feel as special as you are
        </p>
        <DaysTogetherBadge />
      </Reveal>

      {/* Auto-scrolling fanned photo carousel */}
      <Reveal className="w-full max-w-4xl">
        <AutoScrollingPhotoCarousel onPhotoClick={setLightboxPhoto} />
        <p className="font-soft text-[11px] text-center text-rose-300 -mt-4">
          tap any photo to zoom in
        </p>
      </Reveal>

      {/* Love note card */}
      <Reveal className="w-full flex flex-col items-center">
        <button
          onClick={revealNote}
          className={`relative z-10 mt-10 max-w-md w-full text-left bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl px-6 py-5 shadow-md shadow-rose-200/50 hover:shadow-lg hover:rotate-0 transition-all -rotate-[1.5deg] ${
            pulse ? "animate-gentle-pop" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            <Heart
              className="w-5 h-5 text-rose-400 mt-1 shrink-0"
              fill="currentColor"
            />
            <div>
              <p className="font-script text-2xl md:text-[1.65rem] text-rose-700 leading-snug">
                {notes[noteIndex]}
              </p>
              <span className="font-soft text-xs text-rose-300 mt-2 inline-block">
                tap for another note ({noteIndex + 1}/{notes.length})
              </span>
            </div>
          </div>
        </button>
      </Reveal>

      <Reveal>
        <LoveLetterCard />
      </Reveal>

      <Reveal>
        <HighlightNoteCard />
      </Reveal>

      <Reveal>
        <ReasonsCard />
      </Reveal>

      <Reveal className="flex flex-col items-center">
        <p className="relative z-10 font-script text-3xl text-rose-400 mt-8">
          I love you 💗
        </p>
        <SurpriseButton />
      </Reveal>
    </div>
  );
}
