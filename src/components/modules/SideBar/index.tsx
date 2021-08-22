import Link from "next/link";
import useLocalStorage from "../../../hooks/use-local-storage";
import styles from "./styles.module.scss";

function SideBar() {
  const [token, setToken] = useLocalStorage<undefined | string>(
    "session_key",
    undefined
  );

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
        {!token && (
          <li className={styles["app-sidebar__link-item"]}>
            <Link href="/register">
              <a className={styles["app-sidebar__link"]}>ثبت نام</a>
            </Link>
          </li>
        )}
        {!token && (
          <li className={styles["app-sidebar__link-item"]}>
            <Link href="/login">
              <a className={styles["app-sidebar__link"]}>ورود به سیستم</a>
            </Link>
          </li>
        )}
        {!!token && (
          <li className={styles["app-sidebar__link-item"]}>
            <button
              className={styles["app-sidebar__link"]}
              onClick={() => setToken(undefined)}
            >
              خروج
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default SideBar;
