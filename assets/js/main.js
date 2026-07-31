document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  const reveal=[...document.querySelectorAll('.product-card,.benefit-grid>div,.steps-grid>div,.hero-card,.section-head')];
  const onScroll=()=>header&&header.classList.toggle('scrolled',window.scrollY>20);
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});reveal.forEach(e=>{e.classList.add('reveal');io.observe(e)})}
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'})}}));
  const form=document.querySelector('.lead-form');
  if(form) form.addEventListener('submit',e=>{e.preventDefault();const btn=form.querySelector('button');const old=btn.textContent;btn.textContent='Заявка отправлена';btn.disabled=true;form.reset();setTimeout(()=>{btn.textContent=old;btn.disabled=false},3000)});
});
