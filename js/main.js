// ============================================
// DIGITAL PARADISE - RELEASE LANDING
// Main JavaScript
// ============================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initIntersectionObserver();
    initCopyToClipboard();
    initParallaxBlobs();
    initImageFallbacks();
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================

function initSmoothScroll() {
    // Get all anchor links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip empty or pure hash links
            if (href === '#' || href === '') return;

            // Check if it's an internal link (no target="_blank")
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement && !this.target) {
                e.preventDefault();

                // Smooth scroll with navbar offset
                const navbar = document.querySelector('.navbar');
                const offset = navbar ? navbar.offsetHeight + 20 : 20;
                const position = targetElement.offsetTop - offset;

                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// INTERSECTION OBSERVER FOR SCROLL REVEAL
// ============================================

function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Observe release card
    const releaseCard = document.querySelector('.release-card');
    if (releaseCard) {
        observer.observe(releaseCard);
    }

    // Observe socials section
    const socialsSection = document.querySelector('.socials');
    if (socialsSection) {
        observer.observe(socialsSection);
    }
}

// ============================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ============================================

function initCopyToClipboard() {
    const copyButtons = document.querySelectorAll('.track-copy');

    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const url = this.getAttribute('data-url');

            // Try modern Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url)
                    .then(() => {
                        showToast('Link copied!');
                    })
                    .catch(() => {
                        fallbackCopyToClipboard(url);
                    });
            } else {
                // Fallback for older browsers
                fallbackCopyToClipboard(url);
            }
        });
    });
}

// Fallback copy to clipboard
function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    try {
        textarea.select();
        document.execCommand('copy');
        showToast('Link copied!');
    } catch (err) {
        showToast('Failed to copy');
    }

    document.body.removeChild(textarea);
}

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================

function showToast(message, duration = 2500) {
    const toast = document.getElementById('toast');

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ============================================
// PARALLAX EFFECT FOR ANIMATED BLOBS
// ============================================

function initParallaxBlobs() {
    const blobs = document.querySelectorAll('.blob');

    if (blobs.length === 0) return;

    let ticking = false;

    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;

                blobs.forEach((blob, index) => {
                    const offset = (index + 1) * 15;
                    blob.style.transform = `translate(${mouseX * offset}px, ${mouseY * offset}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

// ============================================
// IMAGE FALLBACK HANDLING
// ============================================

function initImageFallbacks() {
    const trackImages = document.querySelectorAll('.track-image');

    trackImages.forEach(img => {
        // Handle successful image load
        img.addEventListener('load', function() {
            // Image loaded successfully, hide fallback
            const parent = this.closest('.track-cover');
            if (parent) {
                const fallback = parent.querySelector('.track-fallback');
                if (fallback) {
                    fallback.style.display = 'none';
                }
            }
            this.style.display = 'block';
        });

        // Handle image load errors
        img.addEventListener('error', function() {
            // Image failed to load, keep fallback visible and hide image
            this.style.display = 'none';
        });

        // Trigger load event if image is already cached
        if (img.complete && img.naturalHeight !== 0) {
            const parent = img.closest('.track-cover');
            if (parent) {
                const fallback = parent.querySelector('.track-fallback');
                if (fallback) {
                    fallback.style.display = 'none';
                }
            }
        }
    });
}

// ============================================
// NAVBAR SHADOW ON SCROLL
// ============================================

window.addEventListener('load', () => {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});

// ============================================
// CONSOLE LOG
// ============================================

console.log('🎵 Digital Paradise - Release Landing Page loaded ✨');
