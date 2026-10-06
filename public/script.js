// Portfolio Script - Rishit Mayatra

const CERT_IMAGES = {
    certCpp: '/cert_cpp.svg',
    certDSA: '/cert_dsa_java.svg',
    certHackathon: '/cert_hackathon.svg',
    certAI: '/cert_ai.svg'
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Copyright Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Load Stored Theme Preference
    initTheme();

    // 3. Smooth Auto-Closing Dropdown Menu When an Option is Clicked
    const dropdownBtn = document.getElementById('navDropdownMenuBtn');
    const dropdownMenu = document.getElementById('navDropdownList');
    const dropdownItems = document.querySelectorAll('.nav-dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetHref = item.getAttribute('href');

            // Immediately close Bootstrap dropdown instance & remove show classes
            if (dropdownBtn && typeof bootstrap !== 'undefined') {
                const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(dropdownBtn);
                bsDropdown.hide();
            }
            if (dropdownMenu) {
                dropdownMenu.classList.remove('show');
            }
            if (dropdownBtn) {
                dropdownBtn.classList.remove('show');
                dropdownBtn.setAttribute('aria-expanded', 'false');
            }

            // Smooth scroll to target section with navbar offset
            if (targetHref && targetHref.startsWith('#')) {
                const targetEl = document.querySelector(targetHref);
                if (targetEl) {
                    e.preventDefault();
                    const navHeight = 85;
                    const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: Math.max(0, elementPosition - navHeight),
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Clear iframe src when Live Demo modal closes
    const demoModalEl = document.getElementById('projectDemoModal');
    if (demoModalEl) {
        demoModalEl.addEventListener('hidden.bs.modal', () => {
            const iframe = document.getElementById('projectDemoIframe');
            if (iframe) iframe.src = 'about:blank';
        });
    }

    // 4. Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('formName');
            const name = nameInput ? nameInput.value : '';
            const statusEl = document.getElementById('contactStatusMsg');
            if (statusEl) {
                statusEl.textContent = `Thank you, ${name}! Your message has been received. Rishit will respond at rishitmayatra.24.cse@iite.indusuni.ac.in shortly.`;
                statusEl.classList.remove('d-none');
            }
            contactForm.reset();
        });
    }
});

// Theme Switcher Logic (#780206 to #061161 Gradient)
function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const currentTheme = localStorage.getItem('rishit_portfolio_theme') || 'dark';
    
    document.documentElement.setAttribute('data-bs-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('rishit_portfolio_theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) return;
    if (theme === 'light') {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon me-1 text-primary"></i> Dark';
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun me-1 text-warning"></i> Light';
    }
}

// Full Photo Viewer Modal Handler
window.viewCertPhotoModal = function(certTitle, certKey) {
    const modalTitle = document.getElementById('certPhotoModalTitle');
    if (modalTitle) {
        modalTitle.innerHTML = `<i class="fa-solid fa-image me-2 text-info"></i> ${certTitle}`;
    }
    
    const photoSrc = CERT_IMAGES[certKey];
    const fullImg = document.getElementById('certFullPhotoImg');
    
    if (photoSrc && fullImg) {
        fullImg.src = photoSrc;
        fullImg.style.display = 'block';
    }

    const modalEl = document.getElementById('certPhotoModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }
};

// Interactive Live Demo Modal Handler for Projects
window.openLiveDemoModal = function(projectTitle, projectUrl) {
    const titleEl = document.getElementById('projectDemoModalTitle');
    const iframeEl = document.getElementById('projectDemoIframe');
    const externalBtn = document.getElementById('projectDemoExternalLink');
    const wrapperEl = document.getElementById('projectDemoWrapper');

    if (titleEl) {
        titleEl.innerHTML = `<i class="fa-solid fa-desktop me-2 text-info"></i> Live Demo: ${projectTitle}`;
    }
    if (wrapperEl) {
        wrapperEl.classList.remove('mobile-view');
    }
    if (iframeEl) {
        iframeEl.src = projectUrl;
    }
    if (externalBtn) {
        externalBtn.href = projectUrl;
    }

    const modalEl = document.getElementById('projectDemoModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }
};

window.setDemoViewport = function(mode) {
    const wrapperEl = document.getElementById('projectDemoWrapper');
    if (!wrapperEl) return;
    if (mode === 'mobile') {
        wrapperEl.classList.add('mobile-view');
    } else {
        wrapperEl.classList.remove('mobile-view');
    }
};
