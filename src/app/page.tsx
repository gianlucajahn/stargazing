import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.page}>
      <h1>STARGAZING</h1>

      <div className={styles.navigation}>
        <section>Stargazer Lore</section>
        <section>Starboard</section>
        <section>Discord</section>
      </div>
      </div>
    </main>
  );
}
