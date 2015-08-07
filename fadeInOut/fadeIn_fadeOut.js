fadeInOut(document.getElementById('hello'),'Out','none', 100, function() {
  fadeInOut(document.getElementById('hello'),'In','inline', 100);
});
  // fadeInOut(document.getElementById('hello'),'In','inline', 100);
  // fadeInOut(document.getElementById('hello'),'Out','none', 100);



/**
 * fadeInOut функция проявления и затухания
 * @param  {[object]}   el          id элемента
 * @param  {[string]}   way         In or Out
 * @param  {[string]}   displayType тип свойства display
 * @param  {[digit]}    time        время эффекта
 */
function fadeInOut(el, way, displayType, time, callback){
  var info = {};
  info.op = +el.style.opacity; // привели к числу
  var s = (way === 'In') ? (1 / time) : -1 * (1 / time);
  if (way === 'In') { el.style.display = displayType; } // меняем свойство с none на переданное

  (function fade() {
     el.style.opacity = info.op + s;
     info.op = info.op + s;
    // End fadeIn
    if (info.op >= 1 && way === 'In') {
      if (callback) {callback();}
    }
    // End fadeOut
    else if (info.op <= 0 && way === 'Out') {
      el.style.display = displayType; // как правило это none
      if (callback) {callback();}
    }
    else {
      ( window.requestAnimationFrame && requestAnimationFrame(fade) ) || setTimeout(fade, 16)
    }
  })();
}