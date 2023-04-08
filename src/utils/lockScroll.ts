const lockScroll = (lock: boolean) => {
  const main = document.querySelector("main");

  if (!main) return;

  if (lock) {
    main.classList.add("lock-scroll");
  } else {
    main.classList.remove("lock-scroll");
  }
};

export { lockScroll };
