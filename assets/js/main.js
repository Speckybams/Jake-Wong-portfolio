(() => {
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
  const error = document.querySelector('.form-error');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (data._gotcha) return;

      form.classList.add('is-submitting');
      if (error) error.classList.remove('is-visible');
      if (success) success.classList.remove('is-visible');

      try {
        const response = await fetch('https://formsubmit.co/ajax/jake.w@volugraph.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: data['full-name'] || '',
            email: data.email || '',
            phone: data.phone || '',
            company: data.company || '',
            purpose: data.purpose || '',
            message: data.message || '',
            _replyto: data.email || '',
            _subject: 'Portfolio enquiry from ' + (data['full-name'] || 'website'),
            _template: 'table'
          })
        });

        if (!response.ok) throw new Error('Form submit failed');

        form.reset();
        form.hidden = true;
        if (success) success.classList.add('is-visible');
      } catch (err) {
        if (error) error.classList.add('is-visible');
      } finally {
        form.classList.remove('is-submitting');
      }
    });
  }
})();
