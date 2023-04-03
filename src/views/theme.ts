const saved = localStorage.getItem("comp-header");

if (!saved) localStorage.setItem("comp-header", "#bdc7fb");
applyColor(saved);

window.addEventListener("storage", () => {
  applyColor(localStorage.getItem("comp-header"));
});

export default function applyColor(color) {
  (document.querySelector(":root") as HTMLElement)
    .style.setProperty("--header", color ?? "#bdc7fb");
}