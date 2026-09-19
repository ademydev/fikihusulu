const siteConfig = {
  resources: [
    {
      title: 'TDV İslâm Ansiklopedisi — Usûl-i Fıkıh',
      description: 'Fıkıh usulünün tanımı, amacı, işlevi ve yöntemleri.',
      url: '#'
    },
    {
      title: 'TDV İslâm Ansiklopedisi — Fıkıh',
      description: 'Fıkhın konusu ve fıkıh-usul ayrımı.',
      url: '#'
    },
    {
      title: 'Diyanet — Dinî ve Şer‘î Hükümlerin Kaynakları',
      description: 'Kur’an, Sünnet, icmâ ve kıyasın genel çerçevesi.',
      url: '#'
    },
    {
      title: 'TDV İslâm Ansiklopedisi — Emir',
      description: '“Emirler gereklilik ifade eder” usul kuralının açıklaması.',
      url: '#'
    },
    {
      title: 'TDV İslâm Ansiklopedisi — Kıyas',
      description: 'Kıyasın fıkıh usulündeki anlamı.',
      url: '#'
    }
  ]
};

const resourceContainer = document.getElementById('reference-grid');

if (resourceContainer) {
  resourceContainer.innerHTML = siteConfig.resources
    .map(
      (item) => `
        <article class="reference-card">
          <h3><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a></h3>
          <p>${item.description}</p>
        </article>
      `
    )
    .join('');
}

const links = document.querySelectorAll('.toc-link');
const sections = document.querySelectorAll('section[id]');
const header = document.querySelector('.site-header');

const getHeaderOffset = () => (header?.getBoundingClientRect().height || 0) + 18;

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));

    if (!target) {
      return;
    }

    event.preventDefault();
    window.history.replaceState(null, '', link.getAttribute('href'));
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - getHeaderOffset(),
      behavior: 'smooth'
    });
  });
});

const setActiveLink = () => {
  const scrollPosition = window.scrollY + getHeaderOffset() + 8;

  let currentId = 'hero';

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      currentId = section.id;
    }
  });

  links.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', isActive);
  });
};

setActiveLink();
window.addEventListener('scroll', setActiveLink, { passive: true });
