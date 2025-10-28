import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <a href="/">
              <Image
                aria-hidden
                src="/home.svg"
                alt="Home icon"
                width={100}
                height={100}
              />
              Home
            </a>
          </li>
          <li>
            <a href="/characters">
              <Image
                aria-hidden
                src="/person.svg"
                alt="Person icon"
                width={100}
                height={100}
              />
              Characters
            </a>
          </li>
        </ul>
      </nav>
      <main className={styles.main}>
      </main>
    </div>
  );
}
