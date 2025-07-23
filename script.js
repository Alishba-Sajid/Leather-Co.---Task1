//  Handle dropdown logic for nav and menu elements
function handleDropdown(menuId, navId) {
  const nav = document.getElementById(navId);
  const menu = document.getElementById(menuId);
  let timer;

  nav.addEventListener('mouseenter', () => {
    clearTimeout(timer);
    menu.style.display = 'flex';
  });

  nav.addEventListener('mouseleave', () => {
    timer = setTimeout(() => {
      menu.style.display = 'none';
    }, 200);
  });

  menu.addEventListener('mouseenter', () => {
    clearTimeout(timer);
  });

  menu.addEventListener('mouseleave', () => {
    menu.style.display = 'none';
  });

  nav.addEventListener('click', (e) => {
    e.preventDefault();
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
  });
}

//  Initialize dropdowns
handleDropdown('workBagsMenu', 'workBagsNav');
handleDropdown('travelBagsMenu', 'travelBagsNav');
handleDropdown('AccessoriesMenu', 'AccessoriesNav');

document.addEventListener('DOMContentLoaded', function () {
  //  Create global tooltip element
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const mainImg = card.querySelector('img');
    const heading = card.querySelector('h3');
    const altSrc = mainImg.getAttribute('data-alt-src');
    const variants = card.querySelectorAll('.variants img');

    //  Set first variant active
    if (variants.length > 0) {
      const firstVariant = variants[0];
      firstVariant.classList.add("active");
    }

    //  Save original image
    if (!mainImg.dataset.originalSrc) {
      mainImg.dataset.originalSrc = mainImg.src;
    }

    //  Hover on card
    card.addEventListener('mouseenter', () => {
      if (!mainImg.dataset.locked && altSrc) {
        mainImg.src = altSrc;
      }
      heading.classList.add('hovered');
    });

    card.addEventListener('mouseleave', () => {
      if (!mainImg.dataset.locked) {
        mainImg.src = mainImg.dataset.originalSrc;
        heading.classList.remove('hovered');
      }
    });

    //  Handle variants
    variants.forEach(thumb => {
      const labelText = thumb.getAttribute('data-label');

      //  Click to select variant
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        variants.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        mainImg.src = thumb.src;
        mainImg.dataset.locked = 'true';
        heading.classList.add('hovered');
      });

      //  Show tooltip on hover
      thumb.addEventListener('mouseenter', () => {
        tooltip.textContent = labelText || '';
        tooltip.style.opacity = '1';

        const rect = thumb.getBoundingClientRect();
        tooltip.style.top = (rect.top - 30 + window.scrollY) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      });

      //  Hide tooltip on leave
      thumb.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
      });
    });
  });

  //  Global reset (optional)
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.product-card').forEach(card => {
      if (!card.contains(e.target)) {
        const mainImg = card.querySelector('img');
        const heading = card.querySelector('h3');
        if (!mainImg.dataset.locked) {
          mainImg.src = mainImg.dataset.originalSrc;
          heading.classList.remove('hovered');
        }
      }
    });
  });
});

window.addEventListener("DOMContentLoaded", () => {
  // Search overlay
  const searchIcon = document.querySelector(".modal__toggle-open");
  const closeIcon = document.getElementById("closeSearch");
  const searchOverlay = document.getElementById("searchOverlay");
  const backdropOverlay = document.getElementById("backdropOverlay");

  if (searchOverlay) searchOverlay.style.display = "none";
  backdropOverlay?.classList.remove("active");

  searchIcon?.addEventListener("click", () => {
    searchOverlay.style.display = "flex";
    backdropOverlay?.classList.add("active");
  });

  closeIcon?.addEventListener("click", () => {
    searchOverlay.style.display = "none";
    backdropOverlay?.classList.remove("active");
  });

  //  Cart drawer toggle
  const cartIconSvg = document.querySelector(".icon-cart-empty");
  cartIconSvg?.setAttribute("id", "cartIcon");

  const cartToggle = document.getElementById("cartIcon");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCart = document.getElementById("closeCart");
  const cartBackdrop = document.getElementById("cartBackdropOverlay");

  cartDrawer?.classList.remove("open");
  cartBackdrop?.classList.remove("active");

  cartToggle?.addEventListener("click", () => {
    cartDrawer?.classList.add("open");
    cartBackdrop?.classList.add("active");
  });

  closeCart?.addEventListener("click", () => {
    cartDrawer?.classList.remove("open");
    cartBackdrop?.classList.remove("active");
  });

  cartBackdrop?.addEventListener("click", () => {
    cartDrawer?.classList.remove("open");
    cartBackdrop?.classList.remove("active");
  });

  // ✅ Testimonial dot navigation
 const tests = document.querySelectorAll('.test');
  const dots = document.querySelectorAll('.dot');
  let activeIndex = 0;

  function showTest(index) {
    tests.forEach((test, i) => {
      test.classList.toggle('active', i === index);
      dots[i].classList.toggle('active', i === index);
    });
    activeIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTest(index);
    });
  });

  function handleResize() {
    if (window.innerWidth <= 768) {
      showTest(activeIndex); // Show one
    } else {
      tests.forEach(test => test.classList.add('active')); // Show all
      dots.forEach(dot => dot.classList.remove('active'));
    }
  }

  window.addEventListener('resize', handleResize);
  window.addEventListener('DOMContentLoaded', handleResize);



// ✅ Review dot navigation
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

function showTestimonial(index) {
  const card = testimonialCards[index];
  card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

  testimonialDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showTestimonial(index);
  });
});

// Optional: on load, highlight first dot
window.addEventListener('DOMContentLoaded', () => {
  testimonialDots[0]?.classList.add('active');
});

// ------------------ MOBILE MENU LOGIC ------------------
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeMobileMenu");
const overlay = document.getElementById("mobileOverlay");

// Open Menu
hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll"); // Disable scroll
});

// Close Menu
const closeMobileMenu = () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll"); // Re-enable scroll
};

closeBtn.addEventListener("click", closeMobileMenu);
overlay.addEventListener("click", closeMobileMenu);

// Close menu if screen is resized to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    closeMobileMenu();
  }
});

// ------------------ DROPDOWN TOGGLE LOGIC ------------------

function setupMobileDropdown(toggleId, dropdownId) {
  const toggle = document.getElementById(toggleId);
  const dropdown = document.getElementById(dropdownId);
  const arrow = toggle.querySelector(".mobile-arrow");

  toggle.addEventListener("click", () => {
    const isOpen = dropdown.classList.contains("active");

    // Toggle visibility
    dropdown.classList.toggle("active");
    dropdown.hidden = isOpen;

    // Toggle arrow icon
    arrow.textContent = isOpen ? "˅" : "×";

    // Update ARIA
    toggle.setAttribute("aria-expanded", !isOpen);
  });
}


// Setup dropdowns
setupMobileDropdown("mobileDropdownToggleWork", "mobileDropdownWork");
setupMobileDropdown("mobileDropdownToggleTravel", "mobileDropdownTravel");
setupMobileDropdown("mobileDropdownToggleAccessories", "mobileDropdownAccessories");


  
});
