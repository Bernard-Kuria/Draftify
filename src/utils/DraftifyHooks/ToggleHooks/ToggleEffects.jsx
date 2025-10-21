export function handleThemeBtnClick(view, btn, toggle) {
  if (!btn || !toggle) return;
  if (view === "editor") {
    btn.style.borderColor = "#f4f5f0";
    btn.style.backgroundColor = "#232323";
    toggle.style.backgroundColor = "#f4f5f0";
    toggle.style.transform = "translateX(13px)";
  } else {
    btn.style.borderColor = "#232323";
    btn.style.backgroundColor = "#f4f5f0";
    toggle.style.backgroundColor = "#232323";
    toggle.style.transform = "translateX(1px)";
  }
}
