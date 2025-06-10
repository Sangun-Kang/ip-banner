;(function(global){
  const DEFAULTS = {
    backgroundColor: '#003366',
    textColor: '#ffffff',
    fontFamily: 'sans-serif',
    iconUrl: '',
    description: 'Your public IP:',
    height: '2.5em',
    top: '0',
    zIndex: 9999,
    ipPosition: 'suffix',
    ipSpacing: 8,
    iconSpacing: 8,
    fontSize: '14px',
  };

  function mergeOpts(defaults, opts){
    const o = {...defaults};
    for(let k in opts) if(opts[k] != null) o[k] = opts[k];
    return o;
  }

  function initIPBanner(userOpts = {}) {
    const opt = mergeOpts(DEFAULTS, userOpts);
    const banner = document.createElement('div');
    banner.id = 'ip-banner';
    Object.assign(banner.style, {
      position: 'fixed', top: opt.top, left: 0, width: '100%',
      height: opt.height, lineHeight: opt.height,
      backgroundColor: opt.backgroundColor,
      color: opt.textColor,
      fontFamily: opt.fontFamily,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 1em', boxSizing: 'border-box', zIndex: opt.zIndex
    });

    // 더 강력한 color 적용
    banner.style.cssText += `color: ${opt.textColor} !important;`;
    
    // 모든 하위 요소에도 color 강제 적용
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      #ip-banner, #ip-banner *, #ip-banner span, #ip-banner div {
        color: ${opt.textColor} ;
        font-weight: 500 ;
        font-size: ${opt.fontSize} ;
        font-family: ${opt.fontFamily} ;
        display: flex ;
        align-items: center ;
        justify-content: center ;
        padding: 0 1em ;
        box-sizing: border-box ;
        z-index: ${opt.zIndex} ;
        background-color: ${opt.backgroundColor} ;
        position: fixed ;
        top: ${opt.top} ;
        left: 0 ;
        width: 100% ;
        height: ${opt.height} ;
        line-height: ${opt.height} ;
        box-sizing: border-box ;
      }
    `;
    document.head.appendChild(styleTag);

    if (opt.iconUrl) {
      const img = document.createElement('img');
      img.src = opt.iconUrl;
      img.style.height = '1.2em';
      img.style.marginRight = opt.iconSpacing + 'px';
      banner.appendChild(img);
    }

    const descSpan = document.createElement('span');
    descSpan.textContent = opt.description;
    descSpan.style.setProperty('color', opt.textColor, 'important');
    
    const ipNode = document.createElement('span');
    ipNode.textContent = 'Loading…';
    ipNode.style.setProperty('color', opt.textColor, 'important');

    if (opt.ipPosition === 'prefix') {
      ipNode.style.marginRight = opt.ipSpacing + 'px';
      banner.appendChild(ipNode);
      banner.appendChild(descSpan);
    } else {
      banner.appendChild(descSpan);
      descSpan.style.marginRight = opt.ipSpacing + 'px';
      banner.appendChild(ipNode);
    }

    document.body.style.paddingTop = opt.height;
    document.body.insertBefore(banner, document.body.firstChild);

    fetch('https://api.ipify.org?format=json')
      .then(r => r.json())
      .then(data => { ipNode.textContent = data.ip; })
      .catch(() => { ipNode.textContent = 'Error'; });
  }

  global.initIPBanner = initIPBanner;
})(window);
