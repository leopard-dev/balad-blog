import Link from "next/link";
import styles from "./styles.module.scss";

function SideBar() {
  return (
    <nav className={styles["app-sidebar"]}>
      <h2 className={styles["app-sidebar__title"]}>لینک های بلاگ</h2>
      <ul className={styles["app-sidebar__links"]}>
        <li className={styles["app-sidebar__link-item"]}>
          <Link href="/">
            <a className={styles["app-sidebar__link"]}>صفحه نخست</a>
          </Link>
        </li>
        <li className={styles["app-sidebar__link-item"]}>
          <Link href="/">
            <a className={styles["app-sidebar__link"]}>درباره من</a>
          </Link>
        </li>
        <li className={styles["app-sidebar__link-item"]}>
          <Link href="/">
            <a className={styles["app-sidebar__link"]}>تماس با من</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;
