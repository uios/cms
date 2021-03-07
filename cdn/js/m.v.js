window.m.v = (path) => {
  var state = rout.e(path);
  var get = state.GOT;
  var root = get[0];
  return new Promise(async function (resolve, reject) {
    if(root) {
      if(root === "posts") {
        var vp = rout.er();
        vp.innerHTML = document.body.find('template[data-href="'+vp.dataset.page+'"]').innerHTML;
        resolve(state);
      }
      if(root === "media") {
        var vp = rout.er();
        vp.innerHTML = document.body.find('template[data-href="'+vp.dataset.page+'"]').innerHTML;
        resolve(state);
      }
      if(root === "pages") {
        var vp = rout.er();
        vp.innerHTML = document.body.find('template[data-href="'+vp.dataset.page+'"]').innerHTML;
        resolve(state);
      }
      if(root === "theme") {
        var vp = rout.er();
        vp.innerHTML = document.body.find('template[data-href="'+vp.dataset.page+'"]').innerHTML;
        resolve(state);
      }
    } else {
        var vp = rout.er();
        vp.innerHTML = document.body.find('template[data-href="'+vp.dataset.page+'"]').innerHTML;
        resolve(state);
    }
  });
};