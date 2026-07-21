// Simple image lightbox
function openImageLightbox(src, alt){
  // if already open, replace image
  let existing = document.getElementById('image-lightbox');
  if(!existing){
    const wrapper = document.createElement('div');
    wrapper.id = 'image-lightbox';
    wrapper.setAttribute('role','dialog');
    wrapper.setAttribute('aria-hidden','false');
    wrapper.style.position='fixed';
    wrapper.style.inset='0';
    wrapper.style.display='flex';
    wrapper.style.alignItems='center';
    wrapper.style.justifyContent='center';
    wrapper.style.background='rgba(2,6,23,0.85)';
    wrapper.style.zIndex='10000';
    wrapper.innerHTML = `
      <div style="position:relative;max-width:95vw;max-height:95vh;">
        <button id="image-lightbox-close" aria-label="Close" style="position:absolute;right:-10px;top:-10px;background:#fff;border-radius:50%;border:0;width:36px;height:36px;font-size:20px;cursor:pointer;">×</button>
        <img src="${src}" alt="${alt||''}" style="display:block;max-width:95vw;max-height:95vh;border-radius:8px;object-fit:contain;"/>
      </div>
    `;
    wrapper.addEventListener('click', function(e){
      if(e.target.id === 'image-lightbox' || e.target.id === 'image-lightbox-close'){
        closeImageLightbox();
      }
    });
    document.body.appendChild(wrapper);
    document.body.style.overflow='hidden';
  } else {
    const img = existing.querySelector('img');
    if(img) img.src = src;
    existing.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
}
function closeImageLightbox(){
  const existing = document.getElementById('image-lightbox');
  if(existing){
    existing.setAttribute('aria-hidden','true');
    existing.remove();
    document.body.style.overflow='';
  }
}
// Delegated click handler for images with class 'zoomable'
document.addEventListener('click', function(e){
  const img = e.target.closest('.zoomable');
  if(img && img.tagName === 'IMG'){
    openImageLightbox(img.src, img.alt || '');
    e.preventDefault();
  }
});
// Allow Enter key to open when focused
document.addEventListener('keydown', function(e){
  if((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.classList.contains('zoomable')){
    const el = document.activeElement;
    openImageLightbox(el.src, el.alt || '');
    e.preventDefault();
  }
});
// Close on Escape
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeImageLightbox();
});
