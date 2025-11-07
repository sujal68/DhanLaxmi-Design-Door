// ============================================
// SWIPER SLIDER INITIALIZATION (Product Door Collection Section)
// ============================================
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    },
});

// ============================================
// RIPPLE EFFECT FOR BUTTONS (Banner & Customize Section)
// ============================================
document.querySelectorAll('.carousel-a, .customize-a').forEach(btn => {
    btn.addEventListener('mousemove', function (event) {
        var rect = btn.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        btn.style.setProperty('--xPos', x + 'px');
        btn.style.setProperty('--yPos', y + 'px');
    });

    btn.addEventListener('mouseenter', function () {
        btn.classList.add('ripple');
    });

    btn.addEventListener('mouseleave', function () {
        btn.classList.remove('ripple');
    });
});

// ============================================
// STICKY HEADER ON SCROLL
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.headertwo2');
        const scrollPosition = window.scrollY;

        if (scrollPosition > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// ============================================
// VIDEO PLAY/PAUSE ON SCROLL (Customize Section)
// ============================================
document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("customVideo");

    if (video && typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: video,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                video.muted = false;
                video.play();
            },
            onLeave: () => {
                video.pause();
                video.muted = true;
            },
            onEnterBack: () => {
                video.muted = false;
                video.play();
            },
            onLeaveBack: () => {
                video.pause();
                video.muted = true;
            }
        });
    }
});

// ============================================
// CUSTOM CURSOR EFFECTS (Global)
// ============================================
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let trailTimer = null;

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        // Create trail effect
        createTrail(mouseX, mouseY);
    });

    // Smooth follower animation
    function animateFollower() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;

        followerX += distX * 0.22;
        followerY += distY * 0.22;

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Trail effect
    function createTrail(x, y) {
        if (trailTimer) return;

        trailTimer = setTimeout(() => {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = x + 'px';
            trail.style.top = y + 'px';
            document.body.appendChild(trail);

            setTimeout(() => trail.remove(), 600);
            trailTimer = null;
        }, 30);
    }

    // Hover effects - General elements
    const hoverElements = document.querySelectorAll('button, a:not(.swiper-slide a), .carousel-a, .customize-a, .glow-btn, .content-menu img');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('expand');
            follower.classList.add('expand');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('expand');
            follower.classList.remove('expand');
        });
    });

    // Swiper slides hover effect
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            cursor.classList.add('expand');
            follower.classList.add('expand');
        });

        slide.addEventListener('mouseleave', () => {
            cursor.classList.remove('expand');
            follower.classList.remove('expand');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });

    // Show cursor again when entering
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

// ============================================
// VIDEO 3D TILT EFFECT (Customize Section)
// ============================================
const customVideo = document.getElementById('customVideo');
if (customVideo) {
    const videoContainer = customVideo.parentElement;

    customVideo.style.transition = 'transform 0.1s ease-out';
    customVideo.style.transformStyle = 'preserve-3d';

    videoContainer.addEventListener('mousemove', (e) => {
        const rect = customVideo.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        customVideo.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    videoContainer.addEventListener('mouseleave', () => {
        customVideo.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}

// ============================================
// DOOR SHOWCASE CAROUSEL (Live Section)
// ============================================
const totalDoors = 23;
let currentIndex = 0;
const doorDisplay = document.getElementById('doorDisplay');
const veneerGrid = document.getElementById('veneerGrid');
const navDots = document.getElementById('navDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Create door frames
if (doorDisplay) {
    for (let i = 1; i <= totalDoors; i++) {
        const doorFrame = document.createElement('div');
        doorFrame.className = 'door-frame';
        if (i === 1) doorFrame.classList.add('active');
        else if (i === 2) doorFrame.classList.add('right');
        else doorFrame.classList.add('hidden');

        doorFrame.innerHTML = `
        <div class="door-inner" style="background-image: url('images/live (${i}).JPEG')"></div>
        <div class="door-handle"></div>
      `;
        doorDisplay.appendChild(doorFrame);
    }
}

// Create veneer samples
if (veneerGrid) {
    for (let i = 1; i <= totalDoors; i++) {
        const sample = document.createElement('div');
        sample.className = 'veneer-sample';
        if (i === 1) sample.classList.add('active');
        sample.style.backgroundImage = `url('images/live (${i}).JPEG')`;
        sample.dataset.door = i - 1;
        veneerGrid.appendChild(sample);
    }
}

// Create navigation dots
if (navDots) {
    const maxDots = Math.min(10, totalDoors);
    for (let i = 0; i < maxDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        navDots.appendChild(dot);
    }
}

const doors = document.querySelectorAll('.door-frame');
const veneerSamples = document.querySelectorAll('.veneer-sample');
const dots = document.querySelectorAll('.dot');
const maxDots = Math.min(10, totalDoors);

// Update doors function - FIXED VERSION
function updateDoors(newIndex) {
    if (newIndex < 0) newIndex = totalDoors - 1;
    if (newIndex >= totalDoors) newIndex = 0;

    doors.forEach((door, i) => {
        door.classList.remove('active', 'left', 'right', 'hidden');

        if (i === newIndex) {
            door.classList.add('active');
        } else if (i === (newIndex - 1 + totalDoors) % totalDoors) {
            door.classList.add('left');
        } else if (i === (newIndex + 1) % totalDoors) {
            door.classList.add('right');
        } else {
            door.classList.add('hidden');
        }
    });

    veneerSamples.forEach((sample, i) => {
        sample.classList.toggle('active', i === newIndex);
    });

    if (totalDoors <= maxDots) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === newIndex);
        });
    } else {
        const dotIndex = Math.floor((newIndex / totalDoors) * maxDots);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === dotIndex);
        });
    }

    // Update counter only if element exists
    const currentDoorSpan = document.getElementById('currentDoor');
    if (currentDoorSpan) {
        currentDoorSpan.textContent = newIndex + 1;
    }

    currentIndex = newIndex;
}

// Veneer sample click event
veneerSamples.forEach(sample => {
    sample.addEventListener('click', () => {
        const doorIndex = parseInt(sample.dataset.door);
        updateDoors(doorIndex);
    });
});

// Navigation dots click event
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const dotIndex = parseInt(dot.dataset.index);
        const doorIndex = Math.floor((dotIndex / maxDots) * totalDoors);
        updateDoors(doorIndex);
    });
});

// Previous button
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        updateDoors(currentIndex - 1);
    });
}

// Next button
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        updateDoors(currentIndex + 1);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') updateDoors(currentIndex - 1);
    if (e.key === 'ArrowRight') updateDoors(currentIndex + 1);
});

// ============================================
// RIPPLE EFFECT FOR ENQUIRE BUTTON (Live Section)
// ============================================
document.querySelectorAll('.enquire-btn').forEach(btn => {
    btn.addEventListener('mousemove', function (event) {
        var rect = btn.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        btn.style.setProperty('--xPos', x + 'px');
        btn.style.setProperty('--yPos', y + 'px');
    });

    btn.addEventListener('mouseenter', function () {
        btn.classList.add('ripple');
    });

    btn.addEventListener('mouseleave', function () {
        btn.classList.remove('ripple');
    });
});

// =======================================
// FORM SECTION
// =======================================

// Country Dropdown
const countrySelector = document.getElementById('countrySelector');
const countryMenu = document.getElementById('countryMenu');
const selectedFlag = document.getElementById('selectedFlag');
const selectedCode = document.getElementById('selectedCode');
let currentCountryCode = '+91';

if (countrySelector && countryMenu) {
    countrySelector.addEventListener('click', (e) => {
        e.stopPropagation();
        countryMenu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        countryMenu.classList.remove('active');
    });

    document.querySelectorAll('.country-option').forEach(option => {
        option.addEventListener('click', () => {
            const flag = option.dataset.flag;
            const code = option.dataset.code;
            selectedFlag.textContent = flag;
            selectedCode.textContent = code;
            currentCountryCode = code;
            countryMenu.classList.remove('active');
        });
    });
}

// Ripple Effect
document.querySelectorAll('.btn, .submit-btn').forEach(btn => {
    btn.addEventListener('mousemove', function (event) {
        const rect = btn.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        btn.style.setProperty('--xPos', x + 'px');
        btn.style.setProperty('--yPos', y + 'px');
    });

    btn.addEventListener('mouseenter', function () {
        btn.classList.add('ripple');
    });

    btn.addEventListener('mouseleave', function () {
        btn.classList.remove('ripple');
    });
});

// Form Validation & Submission
const form = document.getElementById('enquiryForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

if (form && submitBtn) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;

        const fullName = document.getElementById('fullName');
        const mobileNumber = document.getElementById('mobileNumber');
        const emailAddress = document.getElementById('emailAddress');
        const cityLocation = document.getElementById('cityLocation');
        const category = document.getElementById('category');
        const message = document.getElementById('message');

        // Reset errors
        document.querySelectorAll('.error-message').forEach(msg => msg.classList.remove('active'));
        document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => input.classList.remove('error'));

        // Validate Full Name
        if (fullName.value.trim() === '') {
            document.getElementById('nameError').classList.add('active');
            fullName.classList.add('error');
            isValid = false;
        }

        // Validate Mobile Number
        if (mobileNumber.value.trim() === '' || mobileNumber.value.length < 10) {
            document.getElementById('phoneError').classList.add('active');
            mobileNumber.classList.add('error');
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress.value.trim())) {
            document.getElementById('emailError').classList.add('active');
            emailAddress.classList.add('error');
            isValid = false;
        }

        // Validate City
        if (cityLocation.value.trim() === '') {
            document.getElementById('cityError').classList.add('active');
            cityLocation.classList.add('error');
            isValid = false;
        }

        // Validate Category
        if (category.value === '') {
            document.getElementById('categoryError').classList.add('active');
            category.classList.add('error');
            isValid = false;
        }

        // Validate Message
        if (message.value.trim() === '') {
            document.getElementById('messageError').classList.add('active');
            message.classList.add('error');
            isValid = false;
        }

        if (!isValid) return;

        // Disable button
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';

        // Prepare form data
        const formData = {
            fullName: fullName.value.trim(),
            mobile: currentCountryCode + ' ' + mobileNumber.value.trim(),
            email: emailAddress.value.trim(),
            city: cityLocation.value.trim(),
            category: category.value,
            message: message.value.trim(),
            timestamp: new Date().toLocaleString()
        };

        // Send to FormSubmit.co (free email service)
        try {
            const response = await fetch('https://formsubmit.co/ajax/sujalkidecha68@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: 'New Enquiry - DhanLxmi Doors',
                    _template: 'table',
                    Name: formData.fullName,
                    Mobile: formData.mobile,
                    Email: formData.email,
                    'City/Location': formData.city,
                    Category: formData.category,
                    Message: formData.message,
                    'Submitted On': formData.timestamp
                })
            });

            if (response.ok) {
                // Show success message
                successMessage.classList.add('active');
                form.reset();

                // Reset button
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = 'Submit';

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('active');
                }, 5000);
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            alert('Something went wrong. Please try again or contact us directly.');
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'Submit';
        }
    });
}

// dropdown 
const dropdownSelected = document.getElementById("dropdownSelected");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownText = document.getElementById("dropdownText");
const categoryInput = document.getElementById("category");

if (dropdownSelected && dropdownMenu) {
    // Toggle dropdown open/close
    dropdownSelected.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("active");
        dropdownSelected.classList.toggle("active");
    });

    // Select option and close dropdown
    document.querySelectorAll(".dropdown-option").forEach(option => {
        option.addEventListener("click", (e) => {
            e.stopPropagation();
            const value = option.getAttribute("data-value");
            dropdownText.textContent = value;
            categoryInput.value = value;

            dropdownMenu.classList.remove("active");
            dropdownSelected.classList.remove("active");
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!dropdownSelected.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove("active");
            dropdownSelected.classList.remove("active");
        }
    });
}

// about us counter animation on scroll
const counter = document.querySelectorAll('.stat-number');
let counterStarted = false;

const startCounting = () => {
    counter.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const frameRate = 60;
        const totalFrames = Math.round(duration / (1000 / frameRate));
        const increment = target / totalFrames;

        let current = 0;
        let frame = 0;

        const updateCounter = () => {
            frame++;
            current += increment;

            if (frame >= totalFrames) {
                counter.innerText = target + '+';
            } else {
                counter.innerText = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            }
        };

        updateCounter();
    });
};

// intersection observer logic
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
            startCounting();
            counterStarted = true;
        }
    });
}, {
    threshold: 0.5
});

// observe the stats container
const statsSection = document.querySelector('.stats-container');
if (statsSection) counterObserver.observe(statsSection);

// wow animation
if (typeof WOW !== 'undefined') {
    new WOW().init();
}

// Ripple effect for newsletter button
const newsletterBtn = document.querySelector('.newsletter-btn');
if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--xPos', x + 'px');
        this.style.setProperty('--yPos', y + 'px');

        this.classList.add('ripple');

        setTimeout(() => {
            this.classList.remove('ripple');
        }, 600);
    });
}

// Social icons hover effect
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) rotate(360deg)';
    });
    icon.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Smooth scroll for footer links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SHOW/HIDE FLOATING BUTTON BASED ON LIVE SECTION VISIBILITY
// ============================================
const floatingBtn = document.querySelector('.mobile-veneer-trigger');
const liveSection = document.querySelector('.live');

if (floatingBtn && liveSection) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                floatingBtn.classList.add('show');
            } else {
                floatingBtn.classList.remove('show');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    sectionObserver.observe(liveSection);
}

// ============================================
// MOBILE OFFCANVAS VENEER SELECTION
// ============================================
const mobileVeneerGrid = document.getElementById('mobileVeneerGrid');
const veneerOffcanvas = document.getElementById('veneerOffcanvas');

if (mobileVeneerGrid && veneerOffcanvas) {
    // Create mobile veneer items dynamically
    for (let i = 1; i <= totalDoors; i++) {
        const item = document.createElement('div');
        item.className = 'mobile-veneer-item';
        if (i === 1) item.classList.add('selected');
        item.innerHTML = `<img src="images/live (${i}).JPEG" alt="Veneer Design ${i}" loading="lazy">`;
        item.dataset.door = i - 1;
        mobileVeneerGrid.appendChild(item);
    }

    // Get all mobile veneer items
    const mobileVeneerItems = document.querySelectorAll('.mobile-veneer-item');

    // Click event on mobile veneer items
    mobileVeneerItems.forEach(item => {
        item.addEventListener('click', function () {
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }

            // Remove selected from all
            mobileVeneerItems.forEach(i => i.classList.remove('selected'));

            // Add selected to clicked
            this.classList.add('selected');

            // Get door index
            const doorIndex = parseInt(this.dataset.door);

            // Update main door display
            updateDoors(doorIndex);

            // Sync with desktop veneer
            veneerSamples.forEach((sample, index) => {
                sample.classList.toggle('active', index === doorIndex);
            });

            // Auto close offcanvas
            setTimeout(() => {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(veneerOffcanvas);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            }, 700);
        });
    });

    // Sync: Desktop veneer click → Update mobile
    veneerSamples.forEach((sample, index) => {
        sample.addEventListener('click', () => {
            mobileVeneerItems.forEach(item => {
                if (parseInt(item.dataset.door) === index) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
        });
    });

    // Sync: Prev/Next buttons → Update mobile
    const syncMobile = () => {
        setTimeout(() => {
            mobileVeneerItems.forEach((item, index) => {
                item.classList.toggle('selected', index === currentIndex);
            });
        }, 150);
    };

    if (prevBtn) prevBtn.addEventListener('click', syncMobile);
    if (nextBtn) nextBtn.addEventListener('click', syncMobile);

    // Sync: Dots → Update mobile
    dots.forEach(dot => {
        dot.addEventListener('click', syncMobile);
    });

    // Offcanvas events
    veneerOffcanvas.addEventListener('show.bs.offcanvas', () => {
        document.body.style.overflow = 'hidden';
    });

    veneerOffcanvas.addEventListener('hidden.bs.offcanvas', () => {
        document.body.style.overflow = '';
    });
}