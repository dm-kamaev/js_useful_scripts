(function () {
  var numberEl = 4;
  var heighMust = determineMustHeight();
  for (var i = 1; i <= numberEl; i++) {
    (function(j) {
      getByID('link_' + j).onclick = function() {
        action('hidden_' + j, heighMust['hidden_' + j], 5);
      };
    }(i));
  }
  // getByID('link_2').onclick = function() {
  //   action('hidden_2', heighMust['hidden_2'], 3);
  // };
  //
  // шаг
  var s = {};
  /**
   * @param  h   –– высота элемента, которая должна быть
   * @param  spd –– шаг с которым разворачивать/сворачивать
   */
  function action(id, h, spd) {
    // выбираем шаг, если его нет, то переданный(разворачивание), иначе отрицательный(свертывание)
    s[id] = (s[id] == spd) ? -spd : spd;
    setTimeout(ExpandingAndCollapsing(id, h), 10);
  }


  function ExpandingAndCollapsing (id, h) {
    var obj = getByID(id);
    // Если достигли требуемой высоты элемента
    if (obj.offsetHeight + s[id] >= h) {
      obj.style.height = h + "px";
      obj.style.overflow = "auto";
    } // Если при свертывании скрыли элемент
    else if (obj.offsetHeight + s[id] <= 0) {
       obj.style.height = 0 + "px";
       obj.style.display = "none";
     } // При развертывании-свертывании пересчитываем высоту элемента
     else {
         obj.style.height = (obj.offsetHeight + s[id]) + "px";
         obj.style.overflow = "hidden";
         obj.style.display = "block";
         setTimeout(function() {
           ExpandingAndCollapsing(id, h)}, 10);
      }
  }
  // Вычисляем высоту,которая должна быть у скрытого элемента
  function determineMustHeight () {
    var heighMust = {};
    for (var i = 1; i <= numberEl; i++) {
      var idHid = 'hidden_' + i;
      heighMust[idHid] = parseInt(getByID(idHid).style.height, 10);
    }
    return heighMust;
  }




}());

function getByID (id) {
  return document.getElementById(id);
}