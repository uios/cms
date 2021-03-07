window.m.v = (path) => {
  var state = rout.e(path);
  var get = state.GOT;
  var root = get[0];
  return new Promise(async function (resolve, reject) {
    if(root) {
      if(root === "about") {
        resolve(state);
      }
    } else {
        resolve(state);
    }
  });
};