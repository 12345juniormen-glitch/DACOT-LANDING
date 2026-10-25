/** Wait for the exact responsive image candidates already rendered by Next/Image. */
export function waitForImage(image: HTMLImageElement, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      image.removeEventListener("load", loaded);
      image.removeEventListener("error", finish);
      signal.removeEventListener("abort", finish);
      resolve();
    };
    const loaded = () => {
      // load alone can precede decoding; a decode failure must still release entry.
      if (image.naturalWidth > 0 && typeof image.decode === "function") {
        image.decode().then(finish, finish);
      } else finish();
    };
    if (signal.aborted) { finish(); return; }
    image.addEventListener("load", loaded, { once: true });
    image.addEventListener("error", finish, { once: true });
    signal.addEventListener("abort", finish, { once: true });
    image.loading = "eager";
    image.fetchPriority = "high";
    if (image.complete) loaded();
  });
}

export function initialVisualImages(root: HTMLElement): HTMLImageElement[] {
  return Array.from(root.querySelectorAll<HTMLImageElement>("[data-parallax-image], header img")).filter((image) => {
    const box = image.getBoundingClientRect();
    return box.width > 0 && box.height > 0 && box.right > 0 && box.bottom > 0 &&
      box.left < document.documentElement.clientWidth && box.top < innerHeight;
  });
}
