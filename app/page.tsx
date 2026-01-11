'use client';

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ----------------------------- NAVBAR ----------------------------- */

const NavigationBar = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Trippy" width={40} height={40} className="w-10 h-10" />
        <span
          className="text-white text-2xl font-normal"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          trippy
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-white text-base">
        <a className="hover:opacity-70 transition-opacity">Hotels</a>
        <a className="hover:opacity-70 transition-opacity">Tours</a>
        <a className="hover:opacity-70 transition-opacity">Flights</a>
        <a className="hover:opacity-70 transition-opacity">Packages</a>
        <a className="hover:opacity-70 transition-opacity">Cruises</a>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="bg-white text-black px-8 py-3 rounded-full text-base font-medium hover:bg-opacity-90 transition-all"
      >
        Login
      </motion.button>
    </motion.nav>
  );
};

/* --------------------------- IMAGE CARD --------------------------- */

const ImageCard = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 + index * 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative w-[360px] h-[260px]"
    >
      <Image src={src} alt={alt} width={360} height={260} className="rounded-lg w-full h-full" />
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {alt}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ----------------------------- MODAL ------------------------------ */

const GeminiModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateKey = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`
      );
      if (!res.ok) throw new Error();
      window.location.href = "https://github.com/naman-sonawane/trippy";
    } catch {
      setError("Invalid Gemini API key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 w-[420px]"
          >
            <h2 className="text-xl font-semibold mb-2">Enter Gemini API Key</h2>
            <p className="text-sm text-gray-500 mb-4">
              Used only to verify access.
            </p>

            <input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="AIza..."
              className="w-full border rounded-lg px-4 py-3 mb-3"
            />

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={validateKey}
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-black text-white"
              >
                {loading ? "Validating..." : "Continue"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ------------------------------ PAGE ------------------------------ */

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/landingbg.jpg)", filter: "brightness(0.85)" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/20" />

      <NavigationBar onOpen={() => setOpen(true)} />

      <div className="relative z-10 h-screen flex items-center">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white space-y-6"
            >
              <div>
                <h2 className="text-xl mb-2" style={{ fontFamily: "var(--font-fraunces)" }}>
                  Italy,
                </h2>
                <h1
                  className="text-6xl mb-4"
                  style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400 }}
                >
                  Manarola
                </h1>
              </div>

              <p className="max-w-lg" style={{ fontFamily: "var(--font-dm-sans)" }}>
                With trippy, plan your itinerary from start to finish.
              </p>

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9" />
                </svg>
                <span className="font-light">I&apos;m feeling lucky...</span>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpen(true)}
                  className="bg-white text-black px-8 py-4 rounded-full font-medium shadow-lg"
                >
                  Try Trippy
                </motion.button>
                <p className="text-sm text-white/80 font-light">
                  Plan your entire itinerary with just one click.
                </p>
              </div>

              {/* Feature grid */}
              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-4">
                {[
                  "Personalized Recommendations",
                  "Collaborative Planning",
                  "Smart Itinerary Generation",
                  "Interactive Street View",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-white rounded-full opacity-80" />
                    <h4 className="text-sm font-semibold" style={{ fontFamily: "var(--font-fraunces)" }}>
                      {text}
                    </h4>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="absolute right-0 hidden lg:block w-[500px] h-[600px]">
              <div className="absolute top-12 -right-16 z-10">
                <ImageCard src="/Stella Boat Tour.png" alt="Stella Boat Tour" index={0} />
              </div>
              <div className="absolute top-44 -right-12 z-20">
                <ImageCard src="/Manarola Downtown.png" alt="Manarola Downtown" index={1} />
              </div>
              <div className="absolute top-76 -right-8 z-30">
                <ImageCard src="/Bar Enrica.png" alt="Bar Enrica" index={2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <GeminiModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
