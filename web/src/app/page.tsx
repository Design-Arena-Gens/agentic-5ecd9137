import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { GreetingExperience } from "./components/GreetingExperience";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Welcome</span>
        <h1>
          Hi, I&apos;m your friendly launch pad for the next great idea.
        </h1>
        <p>
          Set the tone for your session, capture your energy, and leave with a
          tiny win. This lightweight workspace nudges you into motion when you
          just need a spark.
        </p>
        <div className={styles.ctas}>
          <Link className={styles.primaryCta} href="#greeting-zone">
            Jump in
          </Link>
          <a
            className={styles.secondaryCta}
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer"
          >
            Learn about Next.js
          </a>
        </div>
        <div className={styles.badgeTray}>
          <span className={styles.badge}>
            <Image src="/globe.svg" width={16} height={16} alt="" />
            Built for web creatives
          </span>
          <span className={styles.badge}>
            <Image src="/window.svg" width={16} height={16} alt="" />
            React + Next.js runtime
          </span>
        </div>
      </header>

      <main className={styles.main} id="greeting-zone">
        <GreetingExperience />
      </main>
    </div>
  );
}
