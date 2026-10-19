/* ==========================================================================
   Reedy Moving Co. — shared site behavior
   Nav scroll border + small validation helpers used by both the homepage
   quote form and the partner referral form. Anchor scrolling is handled
   by CSS (html{scroll-behavior:smooth;scroll-padding-top:96px}) rather
   than JS, so if the topbar/nav height ever changes, update that value
   in site.css instead of hunting for scrollIntoView calls.
   ========================================================================== */

(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  var onScroll = function () {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

window.Reedy = window.Reedy || {};

Reedy.isValidEmail = function (v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
};

Reedy.isValidPhone = function (v) {
  return v.replace(/\D/g, '').length >= 10;
};

Reedy.isPastDate = function (v) {
  if (!v) return false;
  var picked = new Date(v + 'T00:00:00');
  if (isNaN(picked.getTime())) return false;
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return picked < today;
};

// Marks a .field as invalid: red border, visible error text, and the
// aria-invalid/aria-describedby wiring screen readers need (color alone
// is never the only signal).
Reedy.setFieldError = function (field, message) {
  field.classList.add('invalid');
  var input = field.querySelector('input,select,textarea');
  var err = field.querySelector('.err-msg');
  if (err) err.textContent = message;
  if (input) {
    input.setAttribute('aria-invalid', 'true');
    if (err && err.id) input.setAttribute('aria-describedby', err.id);
  }
};

Reedy.clearFieldError = function (field) {
  field.classList.remove('invalid');
  var input = field.querySelector('input,select,textarea');
  var err = field.querySelector('.err-msg');
  if (err) err.textContent = '';
  if (input) input.removeAttribute('aria-invalid');
};
