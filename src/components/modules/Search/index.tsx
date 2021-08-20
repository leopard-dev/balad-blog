import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";

import { useSearchHistory } from "../../../providers/SearchHistoryProvider";
import isNotEmpty from "../../../utils/is-not-empty";
import InputField from "../../elements/InputField";
import styles from "./styles.module.scss";

function Search() {
  const { history } = useSearchHistory();
  const { push } = useRouter();

  const renderHistory = (() => {
    return history.slice(0, 5).map((item) => (
      <li className="search-container__link-item" key={item}>
        <button
          className={`btn btn-link ${styles["search-container__link"]}`}
          onClick={() =>
            push({
              pathname: "/search",
              query: { q: item },
            })
          }
        >
          {item}
        </button>
      </li>
    ));
  })();
  return (
    <section className="search-container">
      <h2 className={styles["search-container__title"]}>جست و جو در سایت</h2>
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={(values) => {
          push({
            pathname: "/search",
            query: { q: values.search },
          });
        }}
      >
        <Form>
          <InputField
            validate={isNotEmpty}
            label="جست و جو"
            type="text"
            name="search"
          />
          <button type="submit" className="btn btn-primary">
            جست و جو
          </button>
        </Form>
      </Formik>
      {history.length > 0 && (
        <ul className={styles["search-container__links"]}>{renderHistory}</ul>
      )}
    </section>
  );
}

export default Search;
