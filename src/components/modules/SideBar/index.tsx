import Link from "next/link";
function SideBar() {
  return (
    <nav className="app-sidebar">
      <h2 className="app-sidebar__title">لینک های بلاگ</h2>
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
