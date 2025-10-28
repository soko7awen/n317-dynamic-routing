import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../app/page.module.css";

export default function Characters() {
  const [query, setQuery] = useState("");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setCharacters([]);

    try {
      const res = await fetch(`https://api.jikan.moe/v4/characters?q=${query}`);
      if (!res.ok) throw new Error("Failed to fetch characters");
      const data = await res.json();
      setCharacters(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
    <form onSubmit={handleSearch}>
      <label htmlFor="characterSearchBar">Search: </label>
      <input
      type="text"
      id="characterSearchBar"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Anime Character"
      />
      <button type="submit">Search</button>
    </form>

    {loading && <p>Loading...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}

    <div className={styles.resultsGrid}>
    {characters.map((char) => (
      <div key={char.mal_id} className={styles.card}>
        <Link href={`/characters/${char.mal_id}`}>
          <Image
          src={char.images.jpg.image_url}
          alt={char.name}
          width={150}
          height={200}
          />
          <p>{char.name}</p>
      </Link>
      </div>
    ))}
    </div>
  </main>
    </div>
  );
}
