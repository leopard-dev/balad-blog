function debounce<T extends (...args: any) => Promise<any>>(
  func: T,
  timeout = 300
) {
  let timer: NodeJS.Timeout | null;
  return (...args: Parameters<T>) =>
    new Promise<boolean>((resolve, reject) => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        resolve(func(...args));
      }, timeout);
    });
}

export default debounce;
