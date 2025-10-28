import Link from "next/link";
import Image from "next/image";
import styles from "../../app/page.module.css";

export async function getServerSideProps({ params }) {
    const { id } = params;
    try {
    const res = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`);
    if (!res.ok) throw new Error("Failed to fetch character details");
    const data = await res.json();

    return {
    props: { character: data.data },
    };
    } catch (err) {
    return {
    props: { error: err.message },
    };
    }
    }

    export default function CharacterDetail({ character, error }) {
    if (error) {
    return (
    <div className={styles.page}>
    <p style={{ color: "red" }}>Error: {error}</p>
    <Link href="/characters">Back to List</Link>
    </div>
    );
    }

    return (
    <div className={styles.page}>
        <main className={styles.main}>
            <h1>{character.name}</h1>
            <Image
            src={character.images.jpg.image_url}
            alt={character.name}
            width={250}
            height={350}
            />
            <p><strong>About:</strong> {character.about || "No biography available."}</p>

            <h2>Anime Appearances:</h2>
            <ul>
                {character.anime?.slice(0, 10).map((anime) => (
                    <li key={anime.anime.mal_id}>{anime.anime.title}</li>
                ))}
            </ul>

            <Link href="/characters">← Back to List</Link>
        </main>
    </div>
);
}
