window.on = {}

window.on.touch = {};

window.on['touch']["tap"] = async(ev,t,target=ev.target,type=t?t:'tap') => {


    var target = event.target;
    var className = target.className;
    var classList = target.classList;
    var dataset = target.dataset;

    var elem = target.closest("[id]");
    if(elem) {

    }

    var elem = target.closest('[data-href]');
    if(elem) {
        elem.dataset.href.router();
    }

    var elem = target.closest('[data-file]');
    if(elem) {
        var input = byId(elem.dataset.input);
        elem.dataset.accept ? input.accept = elem.dataset.accept : null;
        input.click();
    }

    var ev = target.closest("[data-evt]");
    if(ev) { //console.log(ev);
        var evt = ev.dataset.evt;
        evt ? dataset = ev.dataset : null;
        if(evt === 'toggle') {
        }
    } 

    var el = target.closest('[data-browse]');
    if(el) {
        if(el.dataset.browse === "exit") {
            modal.exit(el);
        }
    }

    var library = target.closest('[data-api]');
    if(library) {
        window[library.dataset.api][library.dataset.method][library.dataset.resource](target);        
    }

};

window.on["focus"] = {
    in: { },
    out: { }
};

window.on["change"] = {

    file: (event,s) => {

        var target = event.target;
        var evt = target && target.dataset && target.dataset.target ? target.dataset.target : null;
        var FR = new FileReader(); console.log(event,target);

        if(evt) {
            var files = target.files;
            if(files.length > 0) {
              if(files.length === 1) {
                  var reader = FR;
                  var file = files[0];
                  reader.readAsDataURL(file);
                  s.onload ? reader.onload = () => s.onload : null;
                  s.onloadstart ? reader.onloadstart = s.onloadstart : null;
                  s.onprogress ? reader.onprogress = s.onprogress : null;
                  s.onabort ? reader.onabort = s.onabort : null;
                  s.onerror ? reader.onerror = s.onerror : null;
                  function onProgress(e) {
                      if (e.lengthComputable) {
                          var percentLoaded = Math.round((e.loaded / e.total) * 100);
                          if(percentLoaded < 100) { console.log(percentLoaded); }
                      }
                  }
              }
            }
            
        }

    }

};

window.on["key"] = {
    down: { },
    up: { }
};

window.on["submit"] = {

}
