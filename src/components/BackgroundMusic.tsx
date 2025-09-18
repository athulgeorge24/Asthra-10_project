import React, { useEffect, useRef, useState } from "react";

const playlist = [
  "/audio/chubina.mp3",
  "/audio/Experience.mp3",
  "/audio/Snowfall.mp3",
  "/audio/Dramamine.mp3",
  "/audio/Nuvole Bianche.mp3",
];

const getRandomTrack = () => {
  return playlist[Math.floor(Math.random() * playlist.length)];
};

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [manuallyStopped, setManuallyStopped] = useState(false);

  // ✅ Play random track — respects unlocked and not manually stopped
  const playRandomTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (manuallyStopped) {
      console.log("🔇 Music is manually stopped — won't play");
      return;
    }

    const src = getRandomTrack();
    console.log("▶️ Now playing:", src);

    audio.src = src;
    audio.load();
    audio.muted = false;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("✅ Playback started successfully");
          setUnlocked(true);
        })
        .catch((err) => {
          console.warn("⚠️ Playback failed:", err);
        });
    }
  };

  // Unlock + play on first user gesture
  const unlockAudio = () => {
    console.log("🔓 User gesture detected — attempting to unlock and play");

    const audio = audioRef.current;
    if (!audio || unlocked) return;

    if (manuallyStopped) {
      setManuallyStopped(false);
      console.log("✅ Manually stopped flag cleared");
    }

    const volume = window.scrollY < 200 ? 1.0 : 0.5;
    audio.volume = volume;
    console.log(`🎚️ Volume set to ${volume}`);

    playRandomTrack();

    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };

  // Handle song end → play next
  const handleEnded = () => {
    console.log("⏭️ Song ended — triggering next random track");
    if (!manuallyStopped) {
      playRandomTrack();
    }
  };

  // Stop music (on interaction or other audio)
  const stopMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setManuallyStopped(true);
    console.log("⏸️ Music stopped manually");
  };

  // Resume if scrolled to top + gesture
  const tryResume = () => {
    if (!unlocked || !manuallyStopped) return;

    if (window.scrollY < 200) {
      setManuallyStopped(false);
      console.log("✅ Resume conditions met — playing...");
      playRandomTrack();
    } else {
      console.log("⚠️ Gesture detected but not at top — waiting for scroll");
    }
  };

  // 🧩 SETUP ON MOUNT
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    audio.volume = 1.0;
    audio.loop = false;

    const firstTrack = getRandomTrack();
    audio.src = firstTrack;
    audio.load();
    console.log("🎧 Audio element initialized, preloaded:", firstTrack);

    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    audio.addEventListener("ended", handleEnded);

    const handleOtherMedia = (e: Event) => {
      const target = e.target as HTMLMediaElement;
      if (target !== audio) {
        console.log("🎙️ Other media playing — stopping background music");
        stopMusic();
      }
    };

    const attachMediaListeners = () => {
      document.querySelectorAll("audio, video").forEach(el => {
        el.addEventListener("play", handleOtherMedia);
      });
    };

    const observer = new MutationObserver(attachMediaListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    attachMediaListeners();

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      audio.removeEventListener("ended", handleEnded);
      observer.disconnect();
      document.querySelectorAll("audio, video").forEach(el => {
        el.removeEventListener("play", handleOtherMedia);
      });
    };
  }, []);

  // 📉 Adjust volume on scroll
  useEffect(() => {
    const handleScroll = () => {
      const audio = audioRef.current;
      if (!audio || manuallyStopped) return;

      const newVolume = window.scrollY < 200 ? 1.0 : 0.5;
      if (audio.volume !== newVolume) {
        audio.volume = newVolume;
        console.log(`🎚️ Volume: ${newVolume}`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [manuallyStopped]);

  // 🖱️ Re-attach resume gesture after manual stop
  useEffect(() => {
    if (manuallyStopped) {
      const events = ["click", "touchstart", "keydown"];
      events.forEach(event => {
        window.addEventListener(event, tryResume, { once: true });
      });

      return () => {
        events.forEach(event => {
          window.removeEventListener(event, tryResume);
        });
      };
    }
  }, [manuallyStopped, unlocked]);

  // ⌨️ Stop on form/button interaction — EXCEPT elements with data-nopause
  useEffect(() => {
    const selectors = ["input", "textarea", "select", "button"];
    const elements = selectors.flatMap(sel => 
      Array.from(document.querySelectorAll(sel))
        .filter(el => !el.hasAttribute('data-nopause')) // ✅ EXCLUDE theme toggle
    );

    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      // Double-check: ignore if clicked element has data-nopause
      if (target.closest('[data-nopause]')) {
        console.log("🎛️ Ignoring interaction — data-nopause detected");
        return;
      }

      if (unlocked && !manuallyStopped) {
        stopMusic();
      }
    };

    elements.forEach(el => {
      el.addEventListener("focus", handler);
      el.addEventListener("click", handler);
    });

    return () => {
      elements.forEach(el => {
        el.removeEventListener("focus", handler);
        el.removeEventListener("click", handler);
      });
    };
  }, [unlocked, manuallyStopped]);

  return <audio ref={audioRef} preload="auto" playsInline style={{ display: "none" }} />;
};

export default BackgroundMusic;