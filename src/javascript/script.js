$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop+ section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })
});




    document.querySelectorAll('.expandable-image').forEach(image => {
        image.addEventListener('click', function() {
            // Remove a classe 'expanded' de todas as imagens
            document.querySelectorAll('.expandable-image').forEach(img => img.classList.remove('expanded'));
            // Adiciona a classe 'expanded' apenas à imagem clicada
            this.classList.toggle('expanded');
        });
    });



 // ScrollReveal animation
ScrollReveal().reveal('.faq-item', {
    duration: 600,
    distance: '50px',
    easing: 'ease-in-out',
    interval: 200,
    origin: 'bottom',
});



$(document).ready(function() {
    $('.faq-question').click(function() {
        const $answer = $(this).next('.faq-answer');
        const $symbol = $(this).find('.faq-symbol');

        // Verifica se a resposta está visível
        if ($answer.is(':visible')) {
            $answer.slideUp(300); // Esconde a resposta
            $symbol.text('+'); // Muda para "+"
            $symbol.css('transform', 'rotate(0deg)'); // Reseta a rotação
        } else {
            $answer.slideDown(300).css('opacity', 0).animate({opacity: 1}, 300); // Mostra a resposta
            $symbol.text('-'); // Muda para "-"
            $symbol.css('transform', 'rotate(360deg)'); // Gira 360 graus
        }

        // Transição suave (sem tempo, pois já está definida no CSS)
        $symbol.css({
            'transition': 'transform 0s'
        });
    });
});


//LOGICA DO OLHINHO
$(document).ready(function() {
    $('#toggleSenha').on('click', function() {
      const input = $('#senha');
      const icon = $('#eyeIcon');
  
      // Verifica o tipo do input e alterna entre 'password' e 'text'
      if (input.attr('type') === 'password') {
        input.attr('type', 'text');
        icon.removeClass('fa-eye').addClass('fa-eye-slash'); // Alterna ícone
      } else {
        input.attr('type', 'password');
        icon.removeClass('fa-eye-slash').addClass('fa-eye'); // Volta ícone original
      }
    });
  });
  

const calendarElement = document.getElementById('calendar');
const availabilityMessage = document.getElementById('availability-message');
const calendarTitle = document.getElementById('calendar-title');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const locationSelect = document.getElementById('location-select');
const availableTimesDiv = document.getElementById('available-times');

let currentDate = new Date();
const availableDates = [
    "2024-10-08", "2024-10-10", "2024-10-15", "2024-10-20",
    "2024-11-05", "2024-11-10", "2024-11-15", "2024-11-25",
    "2024-12-01", "2024-12-05", "2024-12-10", "2024-12-20"
];

// Horários disponíveis por local e data
const availableSlots = {
    'premium-office': {
        '2024-10-08': ['10:00', '11:00', '14:00'],
        '2024-10-10': ['09:00', '13:00'],
        '2024-10-15': ['10:00', '15:00'],
        '2024-10-20': ['11:00'],
        '2024-11-05': ['09:00', '10:30'],
        '2024-11-10': ['11:00', '13:00', '16:00'],
        '2024-11-15': ['10:00', '14:00'],
        '2024-11-25': ['15:00'],
        '2024-12-01': ['09:00', '12:00'],
        '2024-12-05': ['10:00', '11:00'],
        '2024-12-10': ['14:00', '15:30'],
        '2024-12-20': []
    },
    'ponta-verde': {
        '2024-10-08': ['09:00', '12:00'],
        '2024-10-10': ['10:00', '14:00'],
        '2024-10-15': ['11:00', '15:00'],
        '2024-10-20': [],
        '2024-11-05': ['10:00', '11:30'],
        '2024-11-10': ['09:00', '12:30'],
        '2024-11-15': ['13:00'],
        '2024-11-25': ['10:00', '14:30'],
        '2024-12-01': ['09:00', '12:00'],
        '2024-12-05': ['13:00', '15:00'],
        '2024-12-10': ['10:00'],
        '2024-12-20': []
    }
};

// Inicializa o calendário
function init() {
    renderCalendar();
    addEventListeners();
}

// Renderiza o calendário
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    updateCalendarTitle(year, month);
    clearCalendar();
    populateCalendar(year, month);
}

// Atualiza o título do calendário
function updateCalendarTitle(year, month) {
    calendarTitle.innerText = `${month + 1}/${year}`;
}

// Limpa o calendário atual
function clearCalendar() {
    calendarElement.innerHTML = '';
}

// Preenche o calendário com os dias do mês
function populateCalendar(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    addEmptyDays(firstDay);
    addDays(daysInMonth, year, month);
}

// Adiciona dias vazios para o alinhamento
function addEmptyDays(firstDay) {
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        calendarElement.appendChild(emptyDay);
    }
}

// Adiciona os dias do mês ao calendário
function addDays(daysInMonth, year, month) {
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerText = day;
        dayElement.addEventListener('click', () => selectDate(year, month + 1, day));
        calendarElement.appendChild(dayElement);
    }
}

// Seleciona uma data e exibe as informações correspondentes
function selectDate(year, month, day) {
    const selectedDate = formatDate(year, month, day);

    if (isDateAvailable(selectedDate)) {
        availabilityMessage.innerText = 'Data disponível para agendamento!';
        availabilityMessage.style.color = 'green'; // Mensagem em verde
        displayAvailableTimes(selectedDate);
    } else {
        availabilityMessage.innerText = 'Data indisponível. Selecione outra.';
        availabilityMessage.style.color = 'red'; // Mensagem em vermelho
        availableTimesDiv.innerHTML = '';
    }

    highlightSelectedDay(day);
}

// Formata a data como "YYYY-MM-DD"
function formatDate(year, month, day) {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

// Verifica se a data está disponível
function isDateAvailable(date) {
    return availableDates.includes(date);
}

// Destaca o dia selecionado no calendário
function highlightSelectedDay(day) {
    document.querySelectorAll('.day').forEach(dayElement => {
        dayElement.classList.remove('selected');
        if (dayElement.innerText == day) {
            dayElement.classList.add('selected');
        }
    });
}

// Exibe os horários disponíveis
function displayAvailableTimes(selectedDate) {
    const selectedLocation = locationSelect.value;

    if (!selectedLocation) {
        availableTimesDiv.innerHTML = '<p>Selecione um local para ver os horários.</p>';
        return;
    }

    const slots = availableSlots[selectedLocation][selectedDate] || [];
    availableTimesDiv.innerHTML = ''; // Limpa a div antes de adicionar novos horários

    if (slots.length) {
        // Cria um título
        const title = document.createElement('p');
        title.textContent = 'Horários disponíveis:';
        availableTimesDiv.appendChild(title);

        // Cria um container para os horários
        const slotsContainer = document.createElement('div');
        slotsContainer.classList.add('slots-container'); // Adiciona uma classe para estilização

        slots.forEach(slot => {
            const slotCard = document.createElement('div');
            slotCard.classList.add('slot-card'); // Classe para cada cartão de horário
            slotCard.textContent = slot;

         

            slotsContainer.appendChild(slotCard);
        });

        availableTimesDiv.appendChild(slotsContainer);
    } else {
        availableTimesDiv.innerHTML = '<p>Nenhum horário disponível para esta data.</p>';
    }
}


// Adiciona os eventos aos botões de navegação e seleção de local
function addEventListeners() {
    prevMonthButton.addEventListener('click', () => changeMonth(-1));
    nextMonthButton.addEventListener('click', () => changeMonth(1));
    locationSelect.addEventListener('change', () => {
        // Exibe horários ao selecionar um local
        const selectedDate = document.querySelector('.day.selected') ? 
            formatDate(currentDate.getFullYear(), currentDate.getMonth() + 1, document.querySelector('.day.selected').innerText) : 
            '';
        if (selectedDate) {
            displayAvailableTimes(selectedDate);
        }
    });
}

// Muda para o próximo ou anterior mês
function changeMonth(delta) {
    currentDate.setMonth(currentDate.getMonth() + delta);
    renderCalendar();
}

// Inicializa o script
init();

