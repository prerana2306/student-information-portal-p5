// Small progressive enhancement: mark the active navigation link.
document.querySelectorAll('.site-header nav a').forEach(link => {
  if (link.pathname === window.location.pathname) link.classList.add('active');
});
