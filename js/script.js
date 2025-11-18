document.addEventListener('DOMContentLoaded', function(){
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-item');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    hamburger.addEventListener('click', function(){
        navMenu.classList.toggle('active');

        const spans = hamburger.querySelectorAll('span');
        if(navMenu.classList.contains('active')){
            spans[0].style.transform = 'rotate(45deg) traslateY(9px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-9x)';
        }
        else{
            spans[0].style.transform = ''
            spans[1].style.opacity = ''
            spans[2].style.transform = ''
        }
    })

    navLinks.forEach(link => {
        link.addEventListener('click', function(e){
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if(targetSection){
                const offset = 80;
                const targetPosition = targetSection.offsetTop -offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })

                if(navMenu.classList.contains('active')){
                    navMenu.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                }
            }
        })
    })
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function(){
        const scrollTop = this.window.pageYOffset || this.document.documentElement.scrollTop;
        if(scrollTop > lastScrollTop && scrollTop >100){
            navbar.style.transform = 'translateY(-100%)';

        }
        else{
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    })
    
    contactForm.addEventListener('submit', function(e){
        e.preventDefault()
        formStatus.style.display = '';

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        if(name && email && message){
            formStatus.textContent = 'Thank you for your message, I will get back to you soon';
            formStatus.className = 'form-status success';
            contactForm.reset();

            setTimeout(() => {
                formStatus.className = 'form-status'
            }, 5000);
        }
        else{
            formStatus.textContent = 'Please fill in all fields';
            formStatus.className = 'form-status error';
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.skill-item, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    })
})