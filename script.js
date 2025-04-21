document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const paymentModal = document.getElementById('payment-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const tabButtons = document.querySelectorAll('.tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const appointmentForm = document.getElementById('appointment-form');
    const serviceSelect = document.getElementById('service');
    const therapistSelect = document.getElementById('therapist');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const paymentForm = document.getElementById('payment-form');
    const servicesContainer = document.getElementById('services-container');
    const galleryContainer = document.getElementById('gallery-container');
    const productsContainer = document.getElementById('products-container');
    const teamContainer = document.getElementById('team-container');

    // --- Mobile Menu Toggle ---
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }

    // --- Modal Functionality ---
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'block';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(loginModal);
        });
    }

    closeModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            closeModal(loginModal);
        }
        if (event.target === paymentModal) {
            closeModal(paymentModal);
        }
    });

    // --- Tabs in Login/Register Modal ---
    tabButtons.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- Populate Select Options (Example Data) ---
    const spaServices = [
        { name: 'Deep Tissue Massage', id: 'massage-1' },
        { name: 'Hot Stone Therapy', id: 'therapy-1' },
        { name: 'Facial Treatment', id: 'facial-1' },
        { name: 'Body Wrap', id: 'wrap-1' },
        { name: 'Aromatherapy Session', id: 'aroma-1' }
    ];

    const therapists = [
        { name: 'Wayne Nane ', id: 'therapist-1' },
        { name: 'Sylvester Kamu', id: 'therapist-2' },
        { name: 'Ruth Mueni', id: 'therapist-3' }
    ];

    function populateServices() {
        spaServices.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    }

    function populateTherapists() {
        therapists.forEach(therapist => {
            const option = document.createElement('option');
            option.value = therapist.id;
            option.textContent = therapist.name;
            therapistSelect.appendChild(option);
        });
    }

    populateServices();
    populateTherapists();

    // --- Form Submission Handling (Basic - You'll need server-side logic) ---
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Appointment request submitted!');
            appointmentForm.reset();
            openModal(paymentModal); // Optionally open payment modal after booking
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userType = loginForm.querySelector('input[name="user-type"]:checked').value;
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            alert(`Login attempt as ${userType} with email: ${email}`);
            closeModal(loginModal);
            loginForm.reset();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userType = registerForm.querySelector('input[name="user-type"]:checked').value;
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const phone = document.getElementById('reg-phone').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            alert(`Registration attempt as ${userType} with email: ${email}`);
            closeModal(loginModal);
            registerForm.reset();
        });
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const paymentCode = document.getElementById('payment-code').value;
            alert(`Payment verification submitted with code: ${paymentCode}`);
            closeModal(paymentModal);
            paymentForm.reset();
            alert('Thank you for your booking!'); // Final confirmation
        });
    }

    // --- Dynamic Content Loading (Example Data) ---
    const servicesData = [
        {
            name: 'Relaxing Massage',
            description: 'Soothe your muscles and unwind with our classic massage techniques.'
        },
        {
            name: 'Deep Cleansing Facial',
            description: 'Revitalize your skin with a deep cleanse and nourishing treatments.'
        },
        {
            name: 'Aromatic Body Wrap',
            description: 'Indulge in a luxurious body wrap infused with essential oils.'
        }
    ];
    
    // Sample bookings data
    const bookings = [
        {
            id: 1,
            date: "2023-11-15",
            time: "10:00",
            service: "Swedish Massage",
            therapist: "Sarah Johnson",
            duration: "60 mins",
            price: 4500,
            status: "confirmed",
            notes: "Please focus on neck and shoulders"
        },
        {
            id: 2,
            date: "2023-11-20",
            time: "14:30",
            service: "Hot Stone Therapy",
            therapist: "Michael Chen",
            duration: "75 mins",
            price: 6000,
            status: "upcoming",
            notes: "Prefer warm stones"
        },
        {
            id: 3,
            date: "2023-10-28",
            time: "11:00",
            service: "Aromatherapy",
            therapist: "Grace Wambui",
            duration: "45 mins",
            price: 4000,
            status: "completed",
            notes: "Lavender scent preferred"
        }
    ];

    // Display bookings
    function displayBookings(filter = "all") {
        const bookingsList = document.querySelector('.bookings-list');
        const filteredBookings = filterBookings(bookings, filter);
        
        if (filteredBookings.length === 0) {
            bookingsList.innerHTML = '<div class="no-bookings">No bookings found.</div>';
            return;
        }
        
        bookingsList.innerHTML = filteredBookings
            .sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`))
            .map(booking => `
                <div class="booking-card">
                    <div class="booking-info">
                        <h4>${booking.service}</h4>
                        <p>with ${booking.therapist}</p>
                        <div class="booking-meta">
                            <span><i class="far fa-calendar-alt"></i> ${formatDate(booking.date)}</span>
                            <span><i class="far fa-clock"></i> ${booking.time}</span>
                            <span><i class="far fa-hourglass"></i> ${booking.duration}</span>
                            <span><i class="fas fa-money-bill-wave"></i> KSh ${booking.price}</span>
                        </div>
                        ${booking.notes ? `<p class="booking-notes"><i class="far fa-sticky-note"></i> ${booking.notes}</p>` : ''}
                    </div>
                    <div class="booking-actions">
                        <span class="booking-status status-${booking.status}">
                            ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <button class="btn-outline btn-sm" onclick="editBooking(${booking.id})">
                            <i class="far fa-edit"></i>
                        </button>
                        <button class="btn-outline btn-sm" onclick="cancelBooking(${booking.id})">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `).join('');
    }

    // Filter bookings
    function filterBookings(bookings, filter) {
        const today = new Date().toISOString().split('T')[0];
        
        switch(filter) {
            case 'upcoming':
                return bookings.filter(b => b.date >= today);
            case 'past':
                return bookings.filter(b => b.date < today);
            default:
                return [...bookings];
        }
    }

    // Format date
    function formatDate(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Filter buttons
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayBookings(this.dataset.filter);
        });
    });

    // New booking button
    document.getElementById('new-booking-btn').addEventListener('click', () => {
        // Hide dashboard and show booking form
        document.getElementById('customer-dashboard').style.display = 'none';
        document.getElementById('main-website').style.display = 'block';
        window.location.href = '#booking';
    });

    // Edit booking
    function editBooking(id) {
        const booking = bookings.find(b => b.id === id);
        if (booking) {
            // Fill booking form with existing data
            document.getElementById('service').value = booking.service;
            document.getElementById('therapist').value = booking.therapist;
            document.getElementById('date').value = booking.date;
            document.getElementById('time').value = booking.time;
            document.getElementById('notes').value = booking.notes || '';
            
            // Show booking form
            document.getElementById('customer-dashboard').style.display = 'none';
            document.getElementById('main-website').style.display = 'block';
            window.location.href = '#booking';
        }
    }

    // Cancel booking
    function cancelBooking(id) {
        if (confirm('Are you sure you want to cancel this booking?')) {
            // In a real app, you would update the backend
            const index = bookings.findIndex(b => b.id === id);
            if (index !== -1) {
                bookings[index].status = 'cancelled';
                displayBookings(document.querySelector('.btn-filter.active').dataset.filter);
            }
        }
    }

    // Initialize bookings when dashboard loads
    function initBookings() {
        displayBookings('all');
    }

    // Call this when customer logs in
    function showCustomerDashboard() {
        initBookings();
        // ... rest of your dashboard show code
    }

    const galleryData = [];  // Removed image URLs
    const productsData = [
        {
            name: 'Luxury Body Lotion',
            description: 'Hydrating body lotion with natural extracts.',
            price: '$25.00'
        },
        {
            name: 'Aromatic Body Wrap',
            description: 'Indulge in a luxurious body wrap infused with essential oils.'
        }
    ];

    const teamData = [
        {
            name: 'Ruth Muema',
            title: 'Lead Therapist'
        },
        {
            name: 'Sylvester Kamau',
            title: 'Massage Specialist'
        },
        {
            name: 'Wayne Nane',
            title: 'Barber'
        }
    ];

    function renderServices() {
        // Services are already in HTML, no need to render dynamically
    }

    function renderGallery() {
        // Gallery is already in HTML, no need to render dynamically
    }

    function renderProducts() {
        // Products are already in HTML, no need to render dynamically
    }

    function renderTeam() {
        // Team is already in HTML, no need to render dynamically
    }
    
    function loginAsCustomer() {
        currentUser = { ...sampleCustomer, type: 'customer' };
        
        // Update customer profile
        document.getElementById('customer-name').value = sampleCustomer.name;
        document.getElementById('customer-email').value = sampleCustomer.email;
        document.getElementById('customer-phone').value = sampleCustomer.phone;
        customerProfileImg.src = sampleCustomer.profileImg;
        
        // Switch to customer dashboard and show bookings
        mainWebsite.style.display = 'none';
        customerDashboard.style.display = 'block';
        loginModal.style.display = 'none';
        
        // Initialize bookings
        initBookings();
    }

    // Skip render functions since content is already in HTML
});