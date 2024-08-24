"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import useSound from "use-sound";
import theme from "../sound/theme.mp3";
import inputSound from "../sound/input.mp3";

export default function Home() {
  // State & Refs
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const lockscreen = useRef(null);

  const [play, { stop }] = useSound(theme, { volume: 0.1 });
  const [playInput] = useSound(inputSound, { volume: 0.4 });

  // Functions
  const submitLoginForm = () => {
    if (input === "freakygazing") {
      animate(
        lockscreen.current,
        { y: -1200 },
        { type: "spring", duration: 2, delay: 0.1 }
      );
      setIsUnlocked(true);
      setIsPlaying(true);
      play();
      playInput();
    } else {
      close();
    }
  };

  const toggleSound = () => {
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  const switchPage = (next: string) => {
    playInput();
    setCurrentPage(next);
  };

  const sortStarboard = (style: string) => {
    playInput()
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
          {currentPage === "home" && (
            <div className={styles.home}>
              <h1>STARGAZING</h1>
              <p className={styles.subtitle}>AN ONLINE ARCHIVE</p>

              <div className={styles.navigation}>
                <section onClick={() => switchPage("lore")}>
                  <Image
                    src={require("../images/lore.png")}
                    height={80}
                    alt="Lore"
                  />
                </section>
                <section onClick={() => switchPage("starboard")}>
                  <Image
                    src={require("../images/starboard.png")}
                    height={80}
                    alt="Starboard"
                  />
                </section>
                <a href="https://discord.gg/XWfu8pgNV4" target="_blank">
                  <section onClick={() => switchPage("home")}>
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

          {currentPage === "starboard" && (
            <div className={styles.starboard}>
              <div className={styles.navbar}>
                <div className={styles.left}>
                  <Image
                    onClick={() => switchPage("home")}
                    className={styles.back}
                    src={require("../images/rewind.png")}
                    height={73}
                    alt="Rewind"
                  />
                  <h2>Starboard</h2>
                </div>

                <div className={styles.right}>
                  <h2 onClick={() => sortStarboard("stars")}>Most Starred</h2>
                  <h2 onClick={() => sortStarboard("asc")}>Oldest</h2>
                  <h2 onClick={() => sortStarboard("desc")}>Newest</h2>
                  <h2 onClick={() => sortStarboard("desc")}>User</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isUnlocked && (
        <div className={styles.buttonSound} onClick={toggleSound}>
          <Image
            src={require(`../images/speaker${isPlaying ? "" : "off"}.png`)}
            height={40}
            alt="Volume"
          />
        </div>
      )}
    </main>
  );
}
