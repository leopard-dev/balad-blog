import Link from "next/link";
import useLocalStorage from "../../../hooks/use-local-storage";
import styles from "./styles.module.scss";

function Navigation() {
  const [token, setToken] = useLocalStorage<undefined | string>(
    "session_key",
    undefined
  );

  return (
    <nav className={styles["navigation"]}>
      <h2 className={styles["navigation__title"]}>لینک های بلاگ</h2>
      <ul className={styles["navigation__links"]}>
        <li className={styles["navigation__link-item"]}>
          <Link href="/">
            <a className={styles["navigation__link"]}>صفحه نخست</a>
          </Link>
        </li>
        <li className={styles["navigation__link-item"]}>
          <Link href="/">
            <a className={styles["navigation__link"]}>درباره من</a>
          </Link>
        </li>
        <li className={styles["navigation__link-item"]}>
          <Link href="/">
            <a className={styles["navigation__link"]}>تماس با من</a>
          </Link>
        </li>
        {!token && (
          <li className={styles["navigation__link-item"]}>
            <Link href="/register">
              <a className={styles["navigation__link"]}>ثبت نام</a>
            </Link>
          </li>
        )}
        {!token && (
          <li className={styles["navigation__link-item"]}>
            <Link href="/login">
              <a className={styles["navigation__link"]}>ورود به سیستم</a>
            </Link>
          </li>
        )}
        {!!token && (
          <li className={styles["navigation__link-item"]}>
            <button
              className={styles["navigation__link"]}
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

export default Navigation;
