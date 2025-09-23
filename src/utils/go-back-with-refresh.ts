export function goBackWithRefresh() {
  if ("referrer" in document) {
    window.location.href = document.referrer;
  } else {
    window.history.back();
  }
}
