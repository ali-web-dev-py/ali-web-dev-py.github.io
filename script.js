// ═══════════════════════════════════════════════════════════
// CUSTOM CURSOR + SPOTLIGHT
// ═══════════════════════════════════════════════════════════
const cursor = document.getElementById('cursor');
const spotlight = document.getElementById('spotlight');

// Initialize cursor on first mousemove; hide if touch happens first.
if (cursor) {
  let initialized = false;
  const useSpotlight = !!spotlight;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX, cursorY = mouseY;
  let spotX = mouseX, spotY = mouseY;

  function startAnimation() {
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      if (useSpotlight) {
        spotX += (mouseX - spotX) * 0.08;
        spotY += (mouseY - spotY) * 0.08;
        spotlight.style.left = `${spotX}px`;
        spotlight.style.top = `${spotY}px`;
      }

      requestAnimationFrame(animateCursor);
    }

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.querySelectorAll('a, button, .project, .skill-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    requestAnimationFrame(animateCursor);
  }

  function onFirstMouseMove(e) {
    if (initialized) return;
    initialized = true;
    mouseX = e.clientX; mouseY = e.clientY;
    startAnimation();
    window.removeEventListener('mousemove', onFirstMouseMove);
  }

  function onFirstTouch() {
    if (initialized) return;
    initialized = true;
    cursor.style.display = 'none';
    if (spotlight) spotlight.style.display = 'none';
    window.removeEventListener('touchstart', onFirstTouch);
    window.removeEventListener('mousemove', onFirstMouseMove);
  }

  window.addEventListener('mousemove', onFirstMouseMove, { passive: true });
  window.addEventListener('touchstart', onFirstTouch, { passive: true });
}

// ═══════════════════════════════════════════════════════════
// LIVE CLOCK (KSA TIME)
// ═══════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════
// SCROLL REVEALS (sections fade-in)
// ═══════════════════════════════════════════════════════════
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-head, .about-grid, .projects, .skills-grid, .contact-inner').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.9s cubic-bezier(0.2,0.8,0.2,1), transform 0.9s cubic-bezier(0.2,0.8,0.2,1)';
  observer.observe(el);
});

// ═══════════════════════════════════════════════════════════
// PROJECT HOVER COLORS (set CSS var from data-color)
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// SMOOTH NAV SCROLL (already via CSS, but offset for fixed nav)
// ═══════════════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length <= 1) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
// ننتظر حتى يتم تحميل الصفحة بالكامل لضمان عمل الأزرار
document.addEventListener('DOMContentLoaded', () => {
    
    const burgerBtn = document.getElementById('burgerBtn');
    const navLinks = document.getElementById('navLinks');

    // التحقق من وجود العناصر لتجنب الأخطاء في المتصفح
    if (burgerBtn && navLinks) {
        burgerBtn.addEventListener('click', (e) => {
            // منع الصفحة من القفز للأعلى عند الضغط
            e.preventDefault(); 
            
            // إضافة أو حذف كلاس active للزر وللقائمة
            burgerBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            console.log("تم الضغط على القائمة!"); // للتأكد في الـ Console
        });

        // إغلاق القائمة تلقائياً عند الضغط على أي رابط بداخلها
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    } else {
        console.error("لم يتم العثور على burgerBtn أو navLinks في ملف HTML");
    }
});
