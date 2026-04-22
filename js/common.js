$('[name="phone"]').mask('+7 (999) 999-99-99');

$.datepicker.regional['ru'] = {
    closeText: 'Закрыть',
    prevText: 'Предыдущий',
    nextText: 'Следующий',
    currentText: 'Сегодня',
    monthNames: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    monthNamesShort: [
        'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
        'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
    ],
    dayNames: [
        'воскресенье', 'понедельник', 'вторник', 'среда',
        'четверг', 'пятница', 'суббота'
    ],
    dayNamesShort: [
        'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'
    ],
    dayNamesMin: [
        'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
    ],
    weekHeader: 'Нед',
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional['ru']);

$('.datepicker').datepicker({
    dateFormat: 'dd.mm.yy',
    // changeMonth: true,
    showOtherMonths: true,
    selectOtherMonths: true
});

function updateAmountState(input) {
    var value = parseInt($(input).val()) || 0;
    var block = $(input).closest('.number-guests');

    if (value > 0) {
        block.addClass('is-active');
    } else {
        block.removeClass('is-active');
    }
}

// минус
$('.amount-down').on('click', function () {
    var input = $(this).closest('.amount').find('input');
    var count = parseInt(input.val()) - 1;

    count = count < 1 ? 1 : count;

    input.val(count).change();
    updateAmountState(input);

    return false;
});

// плюс
$('.amount-up').on('click', function () {
    var input = $(this).closest('.amount').find('input');
    var count = (parseInt(input.val()) || 0) + 1;

    input.val(count).change();
    updateAmountState(input);

    return false;
});

// ручной ввод
$('.amount input').on('input', function () {
    $(this).val($(this).val().replace(/[^\d]/g, ''));
    updateAmountState(this);
});

// при загрузке
$('.amount input').each(function () {
    updateAmountState(this);
});

// map
$(function () {

    ymaps.ready(init);

    function init() {

        const map = new ymaps.Map("map", {
            center: [53.193415, 45.018570],
            zoom: 15,
            controls: []
        });

        map.behaviors.disable('scrollZoom');

        const placemark = new ymaps.Placemark(
            [53.193415, 45.018570],
            {},
            {
                iconLayout: 'default#image',
                iconImageHref: 'img/pin.svg',
                iconImageSize: [54, 67],
                iconImageOffset: [-27, -67]
            }
        );

        map.geoObjects.add(placemark);
    }

});

// mobile menu
$('.btn-burger').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('no-scroll');
    $(this).toggleClass('click');
    $('.nav-menu').toggleClass('open');
    $('.menu-overlay').toggleClass('show');
});

$('.menu-overlay').on('click', function () {
    $('.btn-burger').removeClass('click');
    $('.nav-menu').removeClass('open');
    $(this).removeClass('show');
    $('body').removeClass('no-scroll');
});

// tabs+accordion
$(function(){

  $('.price-tabs .nav-link').on('shown.bs.tab', function () {
    let target = $(this).data('bs-target');

    $('#priceAccordion .accordion-collapse').removeClass('show');
    $('#priceAccordion ' + target.replace('#tab', '#mob')).addClass('show');
  });

  $('#priceAccordion .accordion-collapse').on('shown.bs.collapse', function () {
    let id = $(this).attr('id').replace('mob', 'tab');

    $('.price-tabs .nav-link').removeClass('active');
    $('.price-tabs .nav-link[data-bs-target="#' + id + '"]').addClass('active');
  });

});


$(function(){

  $('.seating-tabs .nav-link').on('shown.bs.tab', function () {
    let target = $(this).data('bs-target');
    $('#seatAccordion .accordion-collapse').removeClass('show');
    $('#seatAccordion ' + target.replace('#seat', '#mobSeat')).addClass('show');
  });

  $('#seatAccordion .accordion-collapse').on('shown.bs.collapse', function () {
    let id = $(this).attr('id').replace('mobSeat', 'seat');

    $('.seating-tabs .nav-link').removeClass('active');
    $('.seating-tabs .nav-link[data-bs-target="#' + id + '"]').addClass('active');
  });

});

$(document).ready(function () {

  $('.bottom-tabs .variant-btn').on('click', function () {
    let btn = $(this);
    let img = btn.data('img');
    let block = btn.closest('.tab-pane');

    btn.addClass('active').siblings().removeClass('active');
    block.find('.seating-main-img').attr('src', img);
  });

});

// btn load gallery
$(document).ready(function () {

  const items = $('.gallery-column');
  const btn = $('.btn-load-gallery');
  const step = 3;

  // считаем сколько уже видно (через CSS)
  let visibleCount = items.filter(':visible').length;

  // если всё уже видно — скрываем кнопку
  if (visibleCount >= items.length) {
    btn.hide();
  }

  btn.on('click', function (e) {
    e.preventDefault();

    let hiddenItems = items.filter(':hidden');
    let nextItems = hiddenItems.slice(0, step);

    nextItems.fadeIn();

    visibleCount += nextItems.length;

    if (visibleCount >= items.length) {
      btn.fadeOut();
    }
  });

});


$(document).ready(function () {

  const container = $('.gallery-row');
  const items = container.find('.gallery-column');
  const btn = container.find('.btn-load-gallery').parent();

  let originalOrder = items.toArray(); // сохраняем исходный порядок
  let isMobile = false;

  function reorder() {
    const mobile = $(window).width() < 992;

    // если состояние не изменилось — ничего не делаем
    if (mobile === isMobile) return;

    isMobile = mobile;

    container.find('.gallery-column').remove();

    if (mobile) {
      // мобильный порядок
      let big = $(originalOrder).filter('.col-lg-6');
      let small = $(originalOrder).filter('.col-lg-3');

      let newOrder = [];
      let smallIndex = 0;

      big.each(function () {
        newOrder.push(this);

        for (let i = 0; i < 2; i++) {
          if (small[smallIndex]) {
            newOrder.push(small[smallIndex]);
            smallIndex++;
          }
        }
      });

      while (smallIndex < small.length) {
        newOrder.push(small[smallIndex]);
        smallIndex++;
      }

      container.prepend(newOrder);

    } else {
      // возвращаем как было
      container.prepend(originalOrder);
    }

    container.append(btn); // кнопку всегда в конец
  }

  reorder();

  $(window).on('resize', function () {
    reorder();
  });

});


Fancybox.bind("[data-fancybox]", {
  // Your custom options go here
});