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

  // Pampadu uses the same #ppdwiOffer identifier. Each working offer is isolated
  // in its own local document, preserving Pampadu's official embed code.
  const widgetMap={
    'ОСАГО':'widgets/osago.html',
    'КАСКО':'widgets/kasko.html',
    'жизнь и здоровье':'widgets/life.html',
    'подбор персонала':'widgets/recruitment.html',
    'банковские продукты':'widgets/banking.html'
  };
  document.querySelectorAll('.product-card').forEach(card=>{
    const title=card.querySelector('h3')?.textContent.trim().toLowerCase();
    const src=widgetMap[title];
    const frame=card.querySelector('.pampadu-widget iframe');
    if(src){
      if(frame) frame.src=src;
      // Make the working offer directly accessible from the main page.
      if(!card.querySelector('.offer-link')){
        const link=document.createElement('a');
        link.className='btn btn-primary offer-link';
        link.href=src;
        link.textContent='Открыть оффер →';
        link.setAttribute('aria-label',`Открыть оффер ${title}`);
        card.appendChild(link);
      }
    }
  });

  // The hero's OSAGO call-to-action should open the working offer directly.
  const heroOffer=document.querySelector('.hero-card a[href="#widget-osago"]');
  if(heroOffer){heroOffer.href=widgetMap['ОСАГО'];heroOffer.textContent='Рассчитать ОСАГО →';}

  const phoneInputs=document.querySelectorAll('input[name="phone"]');
  phoneInputs.forEach(input=>input.addEventListener('input',()=>{
    let value=input.value.replace(/[^\d+]/g,'');
    if(value.length>0&&!value.startsWith('+'))value='+'+value;
    input.value=value.slice(0,18);
  }));
});
