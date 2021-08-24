import { useRouter } from 'next/dist/client/router';

import { useForm } from '../../../hooks/use-form';
import { useSearchHistory } from '../../../providers/SearchHistoryProvider';
import InputField from '../../elements/InputField';
import styles from './styles.module.scss';

function Search() {
  const { history } = useSearchHistory();
  const { push } = useRouter();

  const renderHistory = (() =>
    history.slice(0, 5).map((item) => (
      <li className="search-container__link-item" key={item}>
        <button
          type="button"
          className={`btn btn-link ${styles['search-container__link']}`}
          onClick={() =>
            push({
              pathname: '/search',
              query: { q: item },
            })}
        >
          {item}
        </button>
      </li>
    )))();

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      search: {
        required: {
          message: 'وارد کردن نام الزامی است',
          value: true,
        },
      },
    },
    onSubmit: (values) =>
      push({
        pathname: '/search',
        query: { q: values.search as string },
      }),
    initialValues: {
      search: '',
    },
  });

  return (
    <section className={styles['search-container']}>
      <h2 className={styles['search-container__title']}>جست و جو در سایت</h2>

      <form onSubmit={handleSubmit}>
        <InputField
          label="جست و جو"
          type="text"
          name="search"
          value={data.search as string}
          onChange={handleChange('search')}
          error={errors.search}
        />
        <button type="submit" className="btn btn-primary">
          جست و جو
        </button>
      </form>
      {history.length > 0 && (
        <ul className={styles['search-container__links']}>{renderHistory}</ul>
      )}
    </section>
  );
}

export default Search;
