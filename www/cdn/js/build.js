getHash = (path) => { return path.substring(1, path.length-1).split('/') };
insertWHL = (wheel, href) => { //console.log('insertWHL',href);
  return new Promise(function(resolve, reject) { var whl = document.createElement('page'); whl.className = 'page'; whl.dataset.href = href; wheel.appendChild(whl); resolve(); });
};
window.build = {
  block: ($mda, GUT) => {
    var $blocks='', div = document.createElement('div'), $blkmda = '', $swipe = '', $muuri = '', $format = '',
      $sizes = [], $mdacode = $mda.code, $mdacard = $mda.card, $mdadata = $mda.data, $mdadpt = $mda.page,
      $mdatype = $mda.type, $mdastyle = $mda.style, $mdatitle = $mda.title, $mdalmt = $mda.max, $mdakwd = $mda.keywords;
    if($mdatype=='video') { $sizes = ['OneRowSwp noswipe','OneColFd','OneColLst','OneColStk','TwoColFd','TwoColGrd','ThreeColGrd']; }
    else if($mdatype=='photo') { $sizes = ['OneRowSwp noswipe','OneColFd','TwoColFd','ThreeColGrd']; }
    else if($mdatype=='blogs') {$sizes = ['FullSize','HalfSize']; }
    else if($mdatype=='slides') { $sizes = ['Wide','Classic','Square','Full','Welcome']; }
    else if($mdatype=='merch') { $sizes = ['noswipe','guide','OneColFd','OneColLst','TwoColFd','ThreeColGrd']; }
    if($mdastyle=='explore') { $muuri=' muuri'; }
    //if($x === 0) {
    //$blocks += '<div class="block"'+($mdacard ? ' data-card' : '')+''+($mda.style ? ' data-style="'+$mda.style+'"' : '')+'>';
      if($mdatitle) {
        $blocks += '<div class="title relative" style="top:0px" data-evt="block-options">';
          if($mda['ico']) { $blocks += '<div class="bkgctn inline" data-img="url('+$mda['ico']+')"" style="width: 20px; height: 20px; margin: 0 4px; background-size: 20px;"></div>'; }
          if($mda['ico2'] === true) { $blocks += $mda['ico2']; }
          $blocks += '<div class="block-name" '+((GUT[0] === 'build' && GUT.length > 1) ? ' contenteditable placeholder="Enter a title"' : '')+'>'+$mdatitle+'</div>';
          if($mda['more']) { $blocks += '<div class="block-more bkgctn">'+$mda['more']+'</div>'; }
        $blocks += '</div>';
      }
      var swipe = ['SingleRow2', 'SingleRow3', 'SingleRow4'].includes($mdastyle) ? ' data-swp' : null; //alert($muuri);
      $blocks += '<media class="media'+$muuri+'" data-format="'+$format+'"'+$swipe+'></media>';
      if(GUT[0] === 'builder' && GUT.length > 1) { $blocks += blkOptn(); }
      if($mdacard) { $blocks += '<card></card>'; }
    //$blocks += '</div>';
    return $blocks;  console.log('build.block', $blocks);
  },
  page: (logic,whl) => {
    return new Promise(function(resolve, reject) { build.template(logic,whl).then(prm => resolve(prm ? prm : logic.state)); });
  },
  media: (logic,whl) => {
    return new Promise(function(resolve, reject) {         
      if(['apps','builder'].includes(logic.GOT[0])) {
        ajax(api.endpoint()+'/v1/read/page'+logic.state).then(data => { var values, results = JSON.parse(data); console.log(results);
          if(results.page) {
            if(results.page.template === "0") { ajax(api.endpoint()+'/v1/read/blocks'+logic.state).then(xhr => readUrl(JSON.parse(xhr).rows)); }
            else { readUrl(templates[results.page.template].json); }
          } 
          else { readUrl(params[logic.page]); }
        });
      }
      else { resolve(); }
      function readUrl(values) {
        ajax(api.endpoint()+'/v1/read/url'+logic.state, {"dataType": "POST", "data": {logic,params:values} }).then(data => { var results = JSON.parse(data);
          resolve(results); var response = results.response; console.log('1: build.js build.media',results,logic,page);
          var mdalength = values ? values.length : 0, blocks = ''; 
          if(mdalength>0) { 
            for (var key=0; key<mdalength; key++) {
              var rows = response[key].rows;
              var hash = logic.page, value = values[key]; //console.log(key,mdalength,value);
              var doc = whl.querySelector('.document'); 
              var div = document.createElement('block');
              div.className = 'block';
              value.style ? div.dataset.style = value.style : null;
              value.card ? div.setAttributeNode(document.createAttribute('data-card')) : null;
              value.table ? div.dataset.format = value.table : null;
              value.table === 'activity' && value.data === 'user' ? value.user = byId('myavi').dataset.uid : null;
              value.type === 'embed' ? div.dataset.style = 'embed' : null;
              div.innerHTML = build.block(value, logic.GOT); 
              var media = div.querySelector('.media');
              if(rows.length > 0) {
                doc.appendChild(div);
                getMDA(rows, value, media).then(res => { var html = res.html, media = res.media;
                  for (var r=0, lmth='', len = html.length; r < len; r++) { lmth += html[r]; }   
                  $(media).html(lmth).then(e => { lmth = '';
                    whl.querySelectorAll('[data-img]').forEach((e, k) => { e.style.backgroundImage = e.dataset.img; });
                    media.classList.contains('muuri') ? (loadScript('https://cdnjs.cloudflare.com/ajax/libs/muuri/0.5.3/muuri.min.js', () => $(media).muuri())) : null;
                  });
                });    
                whl.find('.document').classList.remove('empty');             
              } else {                
                key===mdalength-1 && whl.find('.document').innerHTML==='' ? whl.find('.document').classList.add('empty') : null;
              }
            }
          } 
          else { whl.find('.document').classList.add('empty'); }
        }); 
      }
    });
  },
  template: (logic,whl) => { build.media(logic,whl); console.log('buildTPL',logic.GOT);
    var page = logic.page, GOT = logic.GOT;
    return new Promise(function(resolve, reject) { //console.log(pages.media, pages.format, iHash);
      if(['/'].includes(page)) { resolve(); }
      else { resolve(); }
    });
  },
  wheel: (wheel,logic) => {  //console.log('wheel.js: buildWHL', packet);     
    var state = logic.state, GOT = logic.GOT, page = logic.page, view = GOT[0];
    return new Promise(function(resolve, reject) {
      if(['build'].includes(view)) { 
        insertWHL(wheel,'/build/'+GOT[1]+'/'); 
        //ajax();
      } 
      if(['shop'].includes(view)) { insertWHL(wheel,'/shop/'+GOT[1]+'/'); } 
      else { insertWHL(wheel,state); resolve({logic}); }
    });              
  }
}
