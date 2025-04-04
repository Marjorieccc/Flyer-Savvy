import SearchBar from "@/components/search/SearchBar";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.contentWrapper}>
      <SearchBar />
    </div>
  );
}
