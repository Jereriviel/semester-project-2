import { input } from "../components/Inputs.js";

export function createImageInputGroup(index: number): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "flex flex-col gap-4";

  const urlInput = input({
    type: "url",
    name: "imageUrl",
    label: `Image URL ${index + 1}`,
    placeholder: "Image URL",
    id: `imgUrl-${index}`,
    required: false,
  });

  const altInput = input({
    type: "text",
    name: "imageAlt",
    label: `Image Description ${index + 1}`,
    placeholder: "Short description of image",
    id: `imgAlt-${index}`,
    required: false,
  });

  container.append(urlInput, altInput);

  return container;
}
