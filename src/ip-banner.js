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

    // cssText로 !important 스타일 적용
    banner.style.cssText += `
      position: fixed !important;
      top: ${opt.top} !important;
      left: 0 !important;
      width: 100% !important;
      height: ${opt.height} !important;
      line-height: ${opt.height} !important;
      background-color: ${opt.backgroundColor} !important;
      color: ${opt.textColor} !important;
      font-family: ${opt.fontFamily} !important;
      font-weight: 500 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 1em !important;
      box-sizing: border-box !important;
      z-index: ${opt.zIndex} !important;
      font-size: ${opt.fontSize} !important;
    `;

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
