(() => {
  const email = 'jake.w@volugraph.com';

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => nav.classList.remove('is-open'));
    });
  }

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');
  document.querySelectorAll('[data-full]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = el.getAttribute('data-full');
      lightbox.classList.add('is-open');
    });
  });
  if (lightbox) {
    lightbox.addEventListener('click', () => lightbox.classList.remove('is-open'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.classList.remove('is-open');
    });
  }

  const form = document.querySelector('#contact-form');
  const success = document.querySelector('.form-success');
  const beholdEmbed = document.querySelector('[data-behold-id]');
  if (beholdEmbed && !beholdEmbed.getAttribute('data-behold-id')) {
    beholdEmbed.innerHTML = '<p class="instagram-feed__setup">Connect @jakewong.visuals at <a href="https://behold.so/" target="_blank" rel="noopener">behold.so</a>, then paste your feed ID into <code>index.html</code>.</p>';
  }
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const body = [
        'Name: ' + (data['full-name'] || ''),
        'Email: ' + (data.email || ''),
        'Phone: ' + (data.phone || ''),
        'Company: ' + (data.company || ''),
        'Purpose: ' + (data.purpose || ''),
        '',
        data.message || ''
      ].join(String.fromCharCode(10));
      const subject = encodeURIComponent('Portfolio enquiry from ' + (data['full-name'] || 'website'));
      window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + encodeURIComponent(body);
      form.hidden = true;
      if (success) success.classList.add('is-visible');
    });
  }
})();
