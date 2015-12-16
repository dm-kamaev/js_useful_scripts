
/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */


// ВСПЛЫВАЮЩИЕ ПОДСКАЗКИ для страницы СТАТЕЙ

// TODO: Переделать на обработчики, которые будут в хэше подсказок
// убрать возможность загорания нескольких подсказок

/* FROM: Приезжает из базы объект */
// var footnotes = {
//   footnote_1 : {
//     on_off  : 0,
//     content : 'Пресс-служба Банка России',
//   },
//   footnote_2 : {
//     on_off  : 0,
//     content : 'Ну что-то такое!!!',
//   },
// };

function gen_pop_up_hint (footnotes_str) {
  "use strict";
  // get hash
  var footnotes = set_property(getHash(footnotes_str));
  // set event
  return function () {

    if (isEmptyHash(footnotes)) {return;}

    D.body.onclick = function(e) {
      var t = e && e.target || e.srcElement, m;
      while(t && !t.id){t=t.parentNode;}
      if (t.id) {
        m = t.id.match(/^(footnote_(\d+))$/);
        if (m && m[1] && m[2]) {
          if (footnotes[m[1]].on_off === 1) {
            hide_hint(m[1], m[1] + '_pop_up');
            return;
          }
          turn_off_other_hint();
          show_hint(m[1], footnotes[m[1]].content, 400);
        }
        m = t.id.match(/^(((footnote_\d+)_pop_up)_hide)$/);
        if (m && m[1] && m[2] && m[3]) {
          hide_hint(m[3], m[2]);
        }
      }
    };


  function show_hint (main_id, data, max_w) {
    var b = D.body, pop_up_id = main_id + '_pop_up';
    footnotes[main_id].on_off = 1;
    b.insertAdjacentHTML(
      'beforeend',
      '<div id=' + pop_up_id + ' style="left:-1000px;max-width:' + (max_w || 250) + 'px;" class=pop_up>' +
      get_html(pop_up_id, data, max_w) +
      '</div>'
    );
    show_position(main_id, pop_up_id);
  }

  function hide_hint (main_id, pop_up_id) {
    var b = D.body;
    footnotes[main_id].on_off = 0;
    b.removeChild(getByID(pop_up_id));
  }

  function turn_off_other_hint () {
    for (var footnote in footnotes) {
      if (footnotes.hasOwnProperty(footnote) && footnotes[footnote].on_off === 1) {
        hide_hint(footnote, footnote + '_pop_up');
      }
    }
  }

    // Стили для короткой по длине подсказке (с крестиком на той же строчке)
    // margin-top:-16px;padding-left:4%;padding-right:14%;white-space:nowrap;
    // <p style=clear:both></p>\
    function get_html (pop_up_id, data) {
      var $html = '\
        <p id=' + pop_up_id + '_hide style="color:#999;cursor:pointer;float:right;font-size:150%;line-height:0.9;padding: 7px 7px 7px 15px;}">x</p>\
      ';
      $html += '<p style="padding:7px;">' + data + '</p>';
      return $html;
    }

    function show_position (main_id, pop_up_id) {
      // координаты относительно viewport
      var m = getObjLocation(main_id),
          h = getObjLocation(pop_up_id),
          t = m.top - h.bottom + h.top - 5, // 5 сдвиг для красоты
          l = m.left + 5,
          r = m.left + 5 + h.right - h.left,
          z = W.innerWidth || d.clientWidth;
      if (t < 0) {t = m.bottom + 5;} // если вверху нет места, то вниз
      if (r > z) {l = z - r;}        // если справа блок ушел за границу экрана
      if (l < 0) {l = 0;}            // если слева блок ушел за границу экрана
      t += W.pageYOffset || d.scrollTop; // добавили скроллинг для получения координвт относительно body
      l += W.pageXOffset || d.scrollLeft;
      getByID(pop_up_id).style.top  = t + 'px';
      getByID(pop_up_id).style.left = l + 'px';
    }

  };

  function set_property (hash) {
    var res = {};
    for (var id in hash) {
      var key = 'footnote_' + id;
      if (!res[key]) {res[key] = {};}
      res[key].on_off  = 0;
      res[key].content = hash[id];
    }
    return res;
  }
} // end start function

// пример вызова
// gen_pop_up_hint(footnotes)();
