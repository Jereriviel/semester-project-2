export function addSkeletons(
  container: HTMLElement,
  createSkeleton: () => HTMLElement,
  count = 3
) {
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const skeleton = createSkeleton();
    skeleton.classList.add("fade-in");
    container.appendChild(skeleton);
  }
}

export function fadeOutSkeletons(
  container: HTMLElement,
  createContent: () => HTMLElement | HTMLElement[],
  replaceOnce = false
) {
  const skeletons = container.querySelectorAll("[role='status']");
  if (replaceOnce) {
    container.innerHTML = "";
    const content = createContent();
    if (Array.isArray(content)) {
      content.forEach((el) => container.appendChild(el));
    } else {
      container.appendChild(content);
    }
    return;
  }

  skeletons.forEach((skeleton) => {
    skeleton.classList.add("fade-out");
    skeleton.addEventListener("animationend", () => {
      const content = createContent();
      if (Array.isArray(content)) {
        content.forEach((el) => skeleton.replaceWith(el));
      } else {
        skeleton.replaceWith(content);
      }
    });
  });
}
