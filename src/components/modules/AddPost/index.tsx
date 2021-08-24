import { useState } from 'react';

import useAuthentication from '../../../hooks/use-authentication';
import { useForm } from '../../../hooks/use-form';
import useKeyDownSubmit from '../../../hooks/use-key-down-submit';
import { usePosts } from '../../../providers/PostProvider';
import { createPost } from '../../../services/post';
import { getLocaleDay } from '../../../utils/date';
import InputField from '../../elements/InputField';
import styles from './styles.module.scss';

function AddPost() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, serServerError] = useState<string | undefined>(undefined);
  const { onPostCreated } = usePosts();
  const { token } = useAuthentication();

  const { handleSubmit, submit, handleChange, data, errors, clearForm } = useForm({
    validations: {
      title: {
        required: {
          message: 'وارد کردن تیتر پست الزامی است.',
          value: true,
        },
      },
      body: {
        required: {
          message: 'وارد کردن متن پست الزامی است.',
          value: true,
        },
      },
    },
    initialValues: {
      title: '',
      body: '',
    },
    onSubmit: (values) => {
      serServerError(undefined);
      setIsLoading(true);
      createPost(
        { ...(values as any), date: getLocaleDay(Date.now()) },
          token as string,
      )
        .then((res) => {
          clearForm();
          onPostCreated(res);
        })
        .catch((error) => {
          if (error.message) {
            serServerError(error.message);
            return;
          }
          serServerError('خطا در اتصال به سرور');
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const keyDownEventHandler = useKeyDownSubmit(submit);

  return (
    <section className={styles['add-post']}>
      <h3 className="h4">اضافه کردن پست جدید</h3>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <form onSubmit={handleSubmit} onKeyDown={keyDownEventHandler}>
        <fieldset disabled={isLoading}>
          <InputField
            label="تیتر"
            inputType="input"
            name="title"
            value={data.title}
            onChange={handleChange('title')}
            error={errors.title}
          />
          <InputField
            label="متن پست"
            inputType="textarea"
            name="body"
            value={data.body}
            onChange={handleChange('body')}
            error={errors.body}
          />
          {serverError && <p>{serverError}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            ثبت پست
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default AddPost;
