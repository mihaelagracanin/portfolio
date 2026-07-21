// Minimal modal logic for featured project
function openModal(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeModal(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

document.addEventListener('click', function(e){
  const open = e.target.closest('[data-open-project]');
  if(open){
    const id = open.getAttribute('data-open-project');
    openModal(id);
    e.preventDefault();
  }
  const close = e.target.closest('.modal-close');
  if(close){
    const modal = close.closest('.modal');
    if(modal) closeModal(modal.id);
  }
});

// Close modal on Escape
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    document.querySelectorAll('.modal[aria-hidden="false"]').forEach(m=>closeModal(m.id));
  }
});

// Close when clicking backdrop
document.addEventListener('click', function(e){
  if(e.target.classList.contains('modal')){
    closeModal(e.target.id);
  }
});

// Scroll entrance animation for .card elements (staggered)
document.addEventListener('DOMContentLoaded', function(){
  const cards = Array.from(document.querySelectorAll('.card'));
  if(!cards.length) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const idx = cards.indexOf(el);
        // stagger by index
        el.style.transitionDelay = (idx * 60) + 'ms';
        el.classList.add('in-view');
        obs.unobserve(el);
      }
    });
  }, {threshold: 0.15});
  cards.forEach(c => observer.observe(c));
});
