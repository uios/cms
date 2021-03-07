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
        dom.file.dataset.target = elem.dataset.file;
        elem.dataset.accept ? dom.file.accept = elem.dataset.accept : null;
        dom.file.click();
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
    in: {
    },
    out: {
    }
};

window.on["change"] = {

    file: (event) => {

        var target = event.target;
        var evt = target && target.dataset && target.dataset.target ? target.dataset.target : null;

        var FR = new FileReader(); console.log(event,target);

        if(evt) {
            var files = target.files;

            if(files.length > 0) {
              if(files.length === 1) {
                  var reader = FR;
                  var file = files[0];
                  console.log({file});
                  reader.readAsDataURL(file);
                  reader.onload = () => onLoad(reader.result,file.type);
                  reader.onloadstart = () => { console.log(); };
                  reader.onprogress = onProgress;
                  reader.onabort = onAbort;
                  reader.onerror = () => console.log(reader.error);
              }
            }
            function onLoad(file,type) { console.log({file,type});
              var container = viewport().find('.player');
            }
            function onAbort(e) {
            }
            function onProgress(e) {
              console.log({e});
              if (e.lengthComputable) {
                  var percentLoaded = Math.round((e.loaded / e.total) * 100);
                  if(percentLoaded < 100) { console.log(percentLoaded); }
              }
            }


            
        }

    }

};

window.on["key"] = {

    down: {

    },

    up: {

    }

};

window.on["submit"] = {

}
