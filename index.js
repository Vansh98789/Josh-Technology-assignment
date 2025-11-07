
        const videoContainer = document.getElementById('videoContainer');
        const videoPlayer = document.getElementById('videoPlayer');

        videoContainer.addEventListener('click', function() {
            if (videoPlayer.paused) {
                videoPlayer.play();
                videoContainer.classList.remove('paused');
            } else {
                videoPlayer.pause();
                videoContainer.classList.add('paused');
            }
        });

        videoPlayer.addEventListener('ended', function() {
            videoContainer.classList.add('paused');
        });

        // Testimonial Slider
        const testimonialTrack = document.getElementById('testimonialTrack');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        const totalSlides = 3;
        let autoSlideInterval;

        function goToSlide(index) {
            currentSlide = index;
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            dots.forEach((dot, i) => {
                if (i === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                goToSlide(index);
                stopAutoSlide();
                startAutoSlide();
            });
        });

        // Start auto-sliding
        startAutoSlide();

        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        const successModal = document.getElementById('successModal');
        const closeModal = document.getElementById('closeModal');
        const closeModalBtn = document.getElementById('closeModalBtn');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show modal
            successModal.classList.add('active');
            document.body.classList.add('modal-open');
            
            // Reset form
            contactForm.reset();
        });

        function closeSuccessModal() {
            successModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }

        closeModal.addEventListener('click', closeSuccessModal);
        closeModalBtn.addEventListener('click', closeSuccessModal);

        // Close modal when clicking outside
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successModal.classList.contains('active')) {
                closeSuccessModal();
            }
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .pricing-card, .partner-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });

        // Active navigation highlight on scroll
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${current}`) {
                    link.style.color = 'var(--primary-blue)';
                }
            });
        });