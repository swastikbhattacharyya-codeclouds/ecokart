export function hideGrid(grid: HTMLElement) {
  grid.classList.add("-translate-x-16", "opacity-0");
  setTimeout(function () {
    grid.classList.add("hidden");
    grid.classList.remove("grid");
  }, 300);
}

export function showGrid(grid: HTMLElement) {
  setTimeout(function () {
    grid.classList.remove("hidden");
    grid.classList.add("grid");
    setTimeout(function () {
      grid.classList.remove("-translate-x-16", "opacity-0");
    }, 300);
  }, 300);
}
