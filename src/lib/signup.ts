/** Scrolls to the footer newsletter box and puts the cursor in it. */
export function focusSignup() {
  const input = document.getElementById('footer-email');
  input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  input?.focus({ preventScroll: true });
}
