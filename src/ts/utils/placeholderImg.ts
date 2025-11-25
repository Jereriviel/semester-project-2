export function applyPlaceholderImage(img: HTMLImageElement) {
  const placeholder = "/assets/images/placeholder-img.jpg";

  img.addEventListener("error", () => {
    img.src = placeholder;
  });
}
