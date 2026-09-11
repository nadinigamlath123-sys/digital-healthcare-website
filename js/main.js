/**
 * Digital Healthcare: Impact on Society - Core Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initInfographicModal();
  initPrivacyModal();
  initSavingsCalculator();
  initTelemetrySimulator();
  initReferenceFilter();
  initCopyButtons();
});

/* ----------------------------------------------------
   1. NAVIGATION & ACTIVE STATES
   ---------------------------------------------------- */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-menu .nav-link:not(.nav-cta-btn)');
  if (!navLinks.length) return;

  // 1. Detect current file name from URL (supporting /, \, decoding, queries, hashes)
  let detectedFile = '';
  try {
    const rawPath = window.location.pathname || window.location.href || '';
    const cleanPath = decodeURIComponent(rawPath).split('?')[0].split('#')[0];
    const segments = cleanPath.split(/[/\\]/).filter(Boolean);
    const last = segments.pop() || '';

    if (last.toLowerCase().endsWith('.html')) {
      detectedFile = last.toLowerCase();
    } else if (last && !last.includes('.')) {
      detectedFile = (last + '.html').toLowerCase();
    } else if (!last || cleanPath.endsWith('/') || rawPath === '/') {
      detectedFile = 'index.html';
    }
  } catch (err) {
    console.error('Error parsing path:', err);
  }

  // 2. If a specific page file was detected from the URL, synchronize active state
  let matchedLink = null;
  if (detectedFile) {
    navLinks.forEach(link => {
      const rawHref = link.getAttribute('href') || '';
      const hrefClean = rawHref.split('?')[0].split('#')[0].split(/[/\\]/).pop().toLowerCase();
      if (hrefClean === detectedFile || (detectedFile === 'index.html' && (hrefClean === '' || hrefClean === 'index.html'))) {
        matchedLink = link;
      }
    });
  }

  // 3. If a link matched the detected URL, activate it and remove active from others
  if (matchedLink) {
    navLinks.forEach(link => {
      if (link === matchedLink) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
    return;
  }

  // 4. Fallback: If URL did not match any link, NEVER force Home!
  // Instead, preserve and respect the active link already designated in the HTML.
  const existingActive = document.querySelector('.nav-menu .nav-link.active:not(.nav-cta-btn)');
  if (existingActive) {
    existingActive.setAttribute('aria-current', 'page');
  }

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
      mobileBtn.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    });

    // Close when link clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ----------------------------------------------------
   2. INFOGRAPHIC LIGHTBOX MODAL
   ---------------------------------------------------- */
function initInfographicModal() {
  const modal = document.getElementById('infographicModal');
  const triggerBtns = document.querySelectorAll('[data-open-infographic]');
  const closeBtns = document.querySelectorAll('[data-close-infographic]');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ----------------------------------------------------
   3. PRIVACY & DISCLAIMER MODAL
   ---------------------------------------------------- */
function initPrivacyModal() {
  const modal = document.getElementById('privacyModal');
  const triggerBtns = document.querySelectorAll('[data-open-privacy]');
  const closeBtns = document.querySelectorAll('[data-close-privacy]');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ----------------------------------------------------
   4. INTERACTIVE TELEMEDICINE SAVINGS CALCULATOR
   ---------------------------------------------------- */
function initSavingsCalculator() {
  const distanceSlider = document.getElementById('calcDistance');
  const wageSlider = document.getElementById('calcWage');
  const visitsSlider = document.getElementById('calcVisits');

  if (!distanceSlider || !wageSlider || !visitsSlider) return;

  const distanceVal = document.getElementById('calcDistanceVal');
  const wageVal = document.getElementById('calcWageVal');
  const visitsVal = document.getElementById('calcVisitsVal');

  const totalSavedEl = document.getElementById('calcTotalSaved');
  const travelSavedEl = document.getElementById('calcTravelSaved');
  const wagesSavedEl = document.getElementById('calcWagesSaved');
  const hoursSavedEl = document.getElementById('calcHoursSaved');
  const carbonSavedEl = document.getElementById('calcCarbonSaved');

  function calculate() {
    const distance = parseFloat(distanceSlider.value); // Round trip miles
    const wage = parseFloat(wageSlider.value); // Hourly wage ($)
    const visits = parseFloat(visitsSlider.value); // Visits per year

    // Display inputs
    if (distanceVal) distanceVal.textContent = `${distance} miles`;
    if (wageVal) wageVal.textContent = `$${wage}/hr`;
    if (visitsVal) visitsVal.textContent = `${visits} visits`;

    // Standard calculations (based on IRS mileage rate $0.67/mile + travel time avg 35mph + 45min waiting room)
    const transitCostPerVisit = distance * 0.67 + 12; // Mileage + parking
    const transitTimeHoursPerVisit = (distance / 35) + 1.25; // Driving + clinic wait
    const lostWagePerVisit = transitTimeHoursPerVisit * wage;

    const totalTravelSavingsYear = Math.round(transitCostPerVisit * visits);
    const totalWageSavingsYear = Math.round(lostWagePerVisit * visits);
    const totalHoursSavedYear = Math.round(transitTimeHoursPerVisit * visits);
    const totalNetSavingsYear = totalTravelSavingsYear + totalWageSavingsYear;
    const carbonPounds = Math.round(distance * visits * 0.89); // 0.89 lbs CO2 per passenger mile

    if (totalSavedEl) totalSavedEl.textContent = `$${totalNetSavingsYear.toLocaleString()}`;
    if (travelSavedEl) travelSavedEl.textContent = `$${totalTravelSavingsYear.toLocaleString()}`;
    if (wagesSavedEl) wagesSavedEl.textContent = `$${totalWageSavingsYear.toLocaleString()}`;
    if (hoursSavedEl) hoursSavedEl.textContent = `${totalHoursSavedYear} hrs`;
    if (carbonSavedEl) carbonSavedEl.textContent = `${carbonPounds} lbs`;
  }

  [distanceSlider, wageSlider, visitsSlider].forEach(slider => {
    slider.addEventListener('input', calculate);
  });

  calculate();
}

/* ----------------------------------------------------
   5. LIVE TELEMETRY SIMULATOR (Health Outcomes)
   ---------------------------------------------------- */
function initTelemetrySimulator() {
  const pulseEl = document.getElementById('liveHeartRate');
  const spo2El = document.getElementById('liveSpo2');
  const glucoseEl = document.getElementById('liveGlucose');

  if (!pulseEl && !spo2El && !glucoseEl) return;

  setInterval(() => {
    if (pulseEl) {
      const basePulse = 72;
      const variation = Math.floor(Math.random() * 7) - 3;
      pulseEl.textContent = `${basePulse + variation} bpm`;
    }
    if (spo2El) {
      const baseSpo2 = 98;
      const variation = Math.random() > 0.8 ? -1 : 0;
      spo2El.textContent = `${baseSpo2 + variation}%`;
    }
    if (glucoseEl) {
      const baseGlucose = 104;
      const variation = Math.floor(Math.random() * 5) - 2;
      glucoseEl.textContent = `${baseGlucose + variation} mg/dL`;
    }
  }, 3000);
}

/* ----------------------------------------------------
   6. ACADEMIC REFERENCE SEARCH & FILTER (Summary Page)
   ---------------------------------------------------- */
function initReferenceFilter() {
  const searchInput = document.getElementById('referenceSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const refCards = document.querySelectorAll('.ref-card');

  if (!refCards.length) return;

  let currentCategory = 'all';
  let currentSearch = '';

  function filterRefs() {
    refCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const matchesCat = (currentCategory === 'all' || category === currentCategory);
      const matchesSearch = (!currentSearch || text.includes(currentSearch));

      if (matchesCat && matchesSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      filterRefs();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      filterRefs();
    });
  });
}

/* ----------------------------------------------------
   7. CLIPBOARD COPY BUTTONS
   ---------------------------------------------------- */
function initCopyButtons() {
  // Copy citation buttons
  document.querySelectorAll('.copy-citation-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const citationText = btn.getAttribute('data-citation');
      if (citationText) {
        navigator.clipboard.writeText(citationText).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Copied!`;
          btn.style.color = '#10b981';
          btn.style.borderColor = '#10b981';
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        });
      }
    });
  });

  // Copy email buttons
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'info@digitalhealthsociety.com';
      navigator.clipboard.writeText(email).then(() => {
        alert('Copied to clipboard: ' + email);
      });
    });
  });
}
