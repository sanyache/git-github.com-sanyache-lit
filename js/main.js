// Чекаємо, поки DOM завантажиться
document.addEventListener("DOMContentLoaded", () => {

    // ===== MENU TOGGLE =====
    const menuToggle = document.querySelector('.menuToggle');
    const header = document.querySelector('header');

    if (menuToggle && header) {
        menuToggle.addEventListener('click', () => {
            header.classList.toggle('active');
        });
    }


    // ===== SWIPER 1 =====
    const swiper1 = new Swiper(".mySwiper", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".mySwiper .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: '.mySwiper .swiper-button-next',
            prevEl: '.mySwiper .swiper-button-prev',
        },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
        },
    });


    // ===== SWIPER 2 =====
    const swiper2 = new Swiper(".teacherSwiper", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".teacherSwiper .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: '.teacherSwiper .swiper-button-next',
            prevEl: '.teacherSwiper .swiper-button-prev',
        },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
        },
    });


    // ===== HOVER EFFECT =====
    const imgBx = document.querySelectorAll('.imgBx');
    const contentBx = document.querySelectorAll('.contentBx');

    imgBx.forEach((img) => {
        img.addEventListener('mouseover', function () {

            imgBx.forEach(el => el.classList.remove('active'));
            contentBx.forEach(el => el.classList.remove('active'));

            const target = document.getElementById(this.dataset.id);
            if (target) target.classList.add('active');

            this.classList.add('active');
        });
    });

});