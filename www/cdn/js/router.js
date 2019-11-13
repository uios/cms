window.error = code => ajax('/cdn/html/error-'+code+'.html').then(a=>popUp(a));
String.prototype.router = function(b, a = b ? b : [], state = this.valueOf()) { //window.location.href = state;
  return new Promise(function(resolve, reject) {
    if(state) {
      var logic = route.get.page(state), GOT = logic.GOT, page = logic.page, container = section(page);
      container!=='popup' ? document.body.dataset.section = container : null;   
      var framework = window.routes[container][page==='/' ? "/" : GOT[0]][page];
      var that = qs('.'+container+'.content') ? qs('.'+container+'.content') : [document.createElement('popup')].attr({'class': 'popup content', 'role': 'application'})[0];
      var whl = that.querySelector('.whl[data-href=\''+state+'\']');   
      if((!whl && container === 'popup') || (container !== 'popup')) {    
        document.querySelector('.popup') ? $(document.querySelectorAll('.popup')).remove() : null; 
        container === 'popup' ? document.body.insertBefore(that, byId('main')) : null;
      }
      var wheel = that.querySelector('.wheel') ? that.querySelector('.wheel').firstElementChild : null;
      var autho = auth.framework(framework);
      var fw = framework[autho];
      console.log(framework,fw,auth);
      if(!wheel || (wheel && a.reload) || (wheel && !whl)) {
        ajax(fw.template).then(template => {
          $(that).html(template).then((that,wheel=that.querySelector('.wheel').firstElementChild) => {
            build.wheel(wheel,logic).then((page,whl=wheel.children[page.logic.index]) => {
              wheel.addEventListener('transitionend webkitTransitionEnd', () => console.log('transitionend'), { once: true })
              wheel.wheel(whl).then(whl => insertPage(whl)); 
              function insertPage(whl) { ajax(fw.document).then(res => $(whl).html(res).then(build.page(logic,whl).then(path => loadPage(path)))); return whl.parentNode; }
            });
          });
        });
      } else {
        if(whl) {
          page.values = params[logic.page] ? (params[logic.page].length>0 ? params[logic.page] : [params[logic.page]]) : [];
          if(whl.innerHTML==='') {
            ajax(fw.document).then(res => wheel.wheel(whl, ["cam"].includes(logic.GOT[0]) ? true : false).then(whl => {
              $(whl).html(res).then(build.page(logic,whl).then(path => loadPage(path)));
            }));
          } 
          else { wheel.wheel(whl).then(whl => loadPage(state)); }
        }
        else { error(404); }
      }
      function loadPage(path) {
        var content = document.body.find('.'+container);
        //themeColor(colors[container]); 
        $(document.body).removeClass('dm').removeClass('menu');
        content.find('[data-scroll]') ? stickyElement(content) : null;
        $(content.querySelectorAll('[data-img]')).iO(window.mc.img);
        document.body.dataset.view = logic.GOT[0];          
        //stickyElement(content); 
        is.mobile();
        history.pushState(null,path,null);
        window.GET = logic.GOT;
        resolve(logic);
      }
    }
  });
};
window.route = {
  get: {
    page: (state) => { //console.log('route.get.page',state);  
      var whl, pop, GOT = state===window.location.origin ? [] : route.get.path.dir(state);
      var HKY = [], hash = view = GOT[0] ? GOT[0] : '/'; 
      GOT.forEach((m,n) => {  //console.log(m);
        whsh = m.replace('#',''), HKY[n] = whsh; 
        if(
          (n > 1 && GOT.length>2 && ['builder'].includes(view)) ||
          m.includes('#')
        ) { HKY[n] = '#'; }
      });
      page = route.get.path.url(HKY);
      return {GOT,page,state};
    },
    path: {
      dir: (url,g=[]) => {
        url.split('/').forEach((a,i) => { g[i] = a; }); 
        g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; 
      },
      url: dir => { return dir.length === 0 ? '/' : '/'+dir.join('/')+'/'; }      
    }
  }
}