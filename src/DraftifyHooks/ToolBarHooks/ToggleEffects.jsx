export function handleThemeBtnClick(view, btn, toggle) {
  if (!btn || !toggle) return;
  if (view === "editor") {
    toggle.style.transform = "translateX(14px)";
  } else {
    toggle.style.transform = "translateX(0)";
  }
}
