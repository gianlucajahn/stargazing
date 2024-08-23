"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import useSound from "use-sound";
import theme from "../sound/theme.mp3";

export default function Home() {
  // State & Refs
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false)
  const lockscreen = useRef(null);

  const [play, { stop }] = useSound(theme, { volume: 0.1 });

  // Functions
  const submitLoginForm = () => {
    if (input === "freakygazing") {
      animate(
        lockscreen.current,
        { y: -1200 },
        { type: "spring", duration: 2, delay: 0.1 }
      );
      setIsUnlocked(true);
      setIsPlaying(true)
      play();
    } else {
      close();
    }
  };

  const toggleSound = () => {
    setIsPlaying(!isPlaying)

    if (isPlaying) {
      stop()
    } else {
      play()
    }
  }

  return (
    <main className={styles.main}>
      <motion.div
        ref={lockscreen}
        initial={{ y: 0 }}
        transition={{ type: "spring", duration: 1.25 }}
        className={styles.lockscreen}
      >
        <p>Enter Password</p>
        <input
          type="password"
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? submitLoginForm() : null)}
          placeholder="Password..."
        ></input>
        <button onClick={submitLoginForm}>Submit</button>
      </motion.div>

      {isUnlocked && (
        <div className={styles.page}>
          <h1>STARGAZING</h1>
          <p className={styles.subtitle}>AN ONLINE ARCHIVE</p>

          <div className={styles.navigation}>
            <section>
              <Image
                src={require("../images/lore.png")}
                height={80}
                alt="Lore"
              />
            </section>
            <section>
              <Image
                src={require("../images/starboard.png")}
                height={80}
                alt="Starboard"
              />
            </section>
            <a href="https://discord.gg/XWfu8pgNV4" target="_blank">
              <section>
                <Image
                  src={require("../images/discord.png")}
                  height={80}
                  alt="Starboard"
                />
              </section>
            </a>
          </div>
        </div>
      )}

      {isUnlocked && (
        <div className={styles.buttonSound} onClick={toggleSound}>
          <Image src={require(`../images/speaker${isPlaying ? "" : "off"}.png`)} height={40} alt="Volume" />
        </div>
      )}
    </main>
  );
}
