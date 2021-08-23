import Link from "next/link";

import useAuthentication from "../../../hooks/use-authentication";
import createHookLogicalWrapper from "../../../utils/create-hook-logical-wrappe";
import styles from "./styles.module.scss";

const IsAuthenticated = createHookLogicalWrapper(
  useAuthentication,
  (ctx) => !ctx.isAuthenticated
);

const IsUnAuthenticated = createHookLogicalWrapper(
  useAuthentication,
  (ctx) => ctx.isAuthenticated
);

function Navigation() {
  const { logout } = useAuthentication();

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
        <IsAuthenticated>
          <li className={styles["navigation__link-item"]}>
            <Link href="/register">
              <a className={styles["navigation__link"]}>ثبت نام</a>
            </Link>
          </li>
        </IsAuthenticated>
        <IsAuthenticated>
          <li className={styles["navigation__link-item"]}>
            <Link href="/login">
              <a className={styles["navigation__link"]}>ورود به سیستم</a>
            </Link>
          </li>
        </IsAuthenticated>
        <IsUnAuthenticated>
          <li className={styles["navigation__link-item"]}>
            <button className={styles["navigation__link"]} onClick={logout}>
              خروج
            </button>
          </li>
        </IsUnAuthenticated>
      </ul>
    </nav>
  );
}

export default Navigation;
