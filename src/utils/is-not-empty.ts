const isNotEmpty = async (value: string) => {
  let error;
  if (!value) {
    error = "وارد کردن نام کاربری اجباری است.";
  }
  return error;
};

export default isNotEmpty;
