import Link from "next/link";
import styles from "./styles.module.scss";

function SideBar() {
  return (
    <nav className={styles["app-sidebar"]}>
      <h2 className={styles["app-sidebar__title"]}>لینک های بلاگ</h2>
      <ul className="app-sidebar__links">
        <li className="app-sidebar__link">
          <Link href="/" passHref>
            <a>صفحه نخست</a>
          </Link>
        </li>
        <li className="app-sidebar__link">
          <Link href="/" passHref>
            <a>درباره من</a>
          </Link>
        </li>
        <li className="app-sidebar__link">
          <Link href="/" passHref>
            <a>تماس با من</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;
