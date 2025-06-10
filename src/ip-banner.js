;(function(global){
  const DEFAULTS = {
    backgroundColor: '#003366',
    textColor: '#ffffff',
    fontFamily: 'sans-serif',
    iconUrl: '',
    description: 'Your public IP:',
    height: '2.5em',
    zIndex: 9999,
    ipPosition: 'suffix',
    ipSpacing: 8,
    iconSpacing: 8
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
      position: 'fixed',
      top: 0, left: 0, width: '100%',
      height: opt.height, lineHeight: opt.height,
      backgroundColor: opt.backgroundColor,
      color: opt.textColor,
      fontFamily: opt.fontFamily,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 1em', boxSizing: 'border-box', zIndex: opt.zIndex
    });

    if (opt.iconUrl) {
      const img = document.createElement('img');
      img.src = opt.iconUrl;
      img.style.height = '1.2em';
      img.style.marginRight = opt.iconSpacing + 'px';
      banner.appendChild(img);
    }

    const descSpan = document.createElement('span');
    descSpan.textContent = opt.description;
    const ipNode = document.createElement('strong');
    ipNode.textContent = 'Loading…';

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
