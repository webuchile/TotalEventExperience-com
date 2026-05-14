// Language System
let currentLang = 'es';

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        currentLang = this.getAttribute('data-lang');
        updateLanguage();
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

function updateLanguage() {
    document.querySelectorAll('[data-' + currentLang + ']').forEach(element => {
        const content = element.getAttribute('data-' + currentLang);
        if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT' || element.tagName === 'SELECT') {
            element.placeholder = content;
        } else {
            element.innerHTML = content;
        }
    });
}

// Package Details Toggle
function toggleDetails(btn) {
    const details = btn.parentElement.querySelector('.package-details');
    details.classList.toggle('show');
    btn.textContent = details.classList.contains('show') ?
        (currentLang === 'es' ? 'Ocultar Detalles' : 'Hide Details') :
        (currentLang === 'es' ? 'Ver Detalles' : 'View Details');
}

// Calendar Functionality
let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    document.getElementById('monthYear').textContent =
        currentDate.toLocaleString(currentLang === 'es' ? 'es-ES' : 'en-US', { month: 'long', year: 'numeric' });

    const daysContainer = document.getElementById('calendarDays');
    daysContainer.innerHTML = '';

    // Empty cells for days before the first day
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        daysContainer.appendChild(emptyDay);
    }

    // Days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;
        dayEl.addEventListener('click', function() {
            selectDate(year, month, day);
        });
        daysContainer.appendChild(dayEl);
    }
}

function selectDate(year, month, day) {
    selectedDate = new Date(year, month, day);
    document.getElementById('selectedDate').textContent =
        selectedDate.toLocaleDateString(currentLang === 'es' ? 'es-ES' : 'en-US',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Update calendar highlight
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    event.target.classList.add('selected');
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Form Submissions
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const message = `Solicitud de Reserva:\nNombre: ${formData.get('name')}\nEmail: ${formData.get('email')}\nTeléfono: ${formData.get('phone')}\nFecha: ${selectedDate ? selectedDate.toLocaleDateString() : 'No seleccionada'}\nInvitados: ${formData.get('guests')}\nTipo de Evento: ${formData.get('eventType')}\nDetalles: ${formData.get('details')}`;

    window.open(`https://wa.me/17863080636?text=${encodeURIComponent(message)}`, '_blank');
    this.reset();
});

document.getElementById('questionnaireForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert(currentLang === 'es' ? '¡Cuestionario enviado! Nos contactaremos pronto.' : '!Questionnaire submitted! We will contact you soon.');
    this.reset();
});

// Initialize Calendar
renderCalendar();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize language on page load
window.addEventListener('DOMContentLoaded', function() {
    updateLanguage();
});
