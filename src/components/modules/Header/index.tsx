import styles from "./styles.module.scss";

function Header() {
  return (
    <header className={styles["app-header"]}>
      <h1 className={styles["app-header__title"]}>وبلاگ تمرین</h1>
      <p className={styles["app-header__sub-title"]}>
        این وبلاگ برای تمرین مطالب دوره طراحی شده است
      </p>
    </header>
  );
}

export default Header;
