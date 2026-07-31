document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  const reveal=[...document.querySelectorAll('.product-card,.benefit-grid>div,.steps-grid>div,.hero-card,.section-head,.faq-item')];
  const onScroll=()=>header&&header.classList.toggle('scrolled',window.scrollY>20);
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}
    }),{threshold:.12});
    reveal.forEach((el,index)=>{el.classList.add('reveal');el.style.transitionDelay=`${Math.min(index*35,280)}ms`;io.observe(el)});
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',event=>{
    const selector=a.getAttribute('href');
    if(!selector||selector==='#')return;
    const target=document.querySelector(selector);
    if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}
  }));

  const phoneInputs=document.querySelectorAll('input[name="phone"]');
  phoneInputs.forEach(input=>input.addEventListener('input',()=>{
    let value=input.value.replace(/[^\d+]/g,'');
    if(value.length>0&&!value.startsWith('+'))value='+'+value;
    input.value=value.slice(0,18);
  }));

  const form=document.querySelector('.lead-form');
  if(form){
    form.addEventListener('submit',event=>{
      event.preventDefault();
      const button=form.querySelector('button');
      const note=form.querySelector('.form-note');
      const oldText=button.textContent;
      button.disabled=true;button.textContent='Подготавливаем заявку…';
      setTimeout(()=>{
        form.reset();
        button.textContent='Заявка готова';
        if(note)note.classList.add('show');
        setTimeout(()=>{button.textContent=oldText;button.disabled=false},3500);
      },700);
    });
  }
});
