const session = {
  set(key, value) {
    window.sessionStorage.setItem(`tiny_${key}`, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(window.sessionStorage.getItem(`tiny_${key}`));
  }
};
const local = {
  set(key, value) {
    window.localStorage.setItem(`tiny_${key}`, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(window.localStorage.getItem(`tiny_${key}`));
  }
};

export { session, local };
