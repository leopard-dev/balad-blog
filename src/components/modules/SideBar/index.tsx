import Search from '../Search';
import Navigation from '../Navigation';
import styles from './styles.module.scss';

function Sidebar() {
  return (
    <aside className={styles['app-sidebar']}>
      <Search />
      <Navigation />
    </aside>
  );
}

export default Sidebar;
