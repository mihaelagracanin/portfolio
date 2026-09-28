// Minimal modal logic for featured project
const modalTriggers = new Map();

function openModal(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  const closeButton = el.querySelector('.modal-close');
  if(closeButton) closeButton.focus();
}
function closeModal(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  const trigger = modalTriggers.get(id);
  if(trigger) trigger.focus();
  modalTriggers.delete(id);
}

document.addEventListener('click', function(e){
  const open = e.target.closest('[data-open-project]');
  if(open){
    const id = open.getAttribute('data-open-project');
    modalTriggers.set(id, open);
    openModal(id);
    const caseStudyId = open.getAttribute('data-open-case-study');
    if(caseStudyId){
      const caseStudy = document.getElementById(caseStudyId);
      if(caseStudy && caseStudy.tagName === 'DETAILS') caseStudy.open = true;
    }
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
    return;
  }

  if(e.key === 'Tab'){
    const modal = document.querySelector('.modal[aria-hidden="false"]');
    if(!modal) return;
    const focusable = Array.from(modal.querySelectorAll('a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'))
      .filter(el=>el.getClientRects().length);
    if(!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if(e.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))){
      last.focus();
      e.preventDefault();
    } else if(!e.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))){
      first.focus();
      e.preventDefault();
    }
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
