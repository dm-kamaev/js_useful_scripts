

// МЕНЮ СО ВСПЛЫВАЮЩИМИ ПО КЛИКУ БЛОКАМИ


/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */



// СТРУКТУРА HTML
// Обертка блок
// <div class=main_table_column>

//   <ul id=h_menu class=h_menu>
//
//     <li>
//       <a id=h_menu_item_1_show class=h_menu_links href="#">Репетиторы</a>
//       Стрелка
//       <div id=h_menu_item_1_triangle class=triangle></div>
//       Всплывающий блок
//       <div id=h_menu_item_1_pop_up class='pop_up links_teachers'>
//         <div id=h_menu_item_1_hide class=cross>&times;</div>
//         Собираемый текст из массива
//         <p style='margin-top:0'>
//           <a href="#">Репетитор по английскому языку (Текстильщики, Кузьминки, Рязанский проспект, Выхино, Жулебино)</a>
//         </p>
//         <p>
//           <a href="#">Репетитор по русскому языку и литературе (Ясенево, Коньково, Теплый Стан, Беляево, Профсоюзная)</a>
//         </p>
//       </div>
//       </li>
//       <li>
//         <a id=h_menu_item_2_show href="#" class="h_menu_links">Разместить резюме репетитора</a>
//       </li>
//   </ul>

// </div>

/* Для добавления нового пунтка:
*   добавляем в html следующий код
* <li>
*   <a id=h_menu_item_номер_show href="#" class="h_menu_links">Разместить резюме репетитора</a>
* </li>
* а также новый счетчик в хэш itemId 'item_номер_PopUp' : false
*/



// Хэш в котором будем хранить состояние
// активирована подсказка или нет, по ключу вида: item_1+
// и счетчик вставки в виде 'item_1_PopUp'
// (для 1 раза вставка html, а затем меняем только display)
(function() {
  var list_links_teachers = [
    ['Репетитор по английскому языку (Текстильщики, Кузьминки, Рязанский проспект, Выхино, Жулебино)','#'],
    ['Репетитор по русскому языку и литературе (Ясенево, Коньково, Теплый Стан, Беляево, Профсоюзная)','#']
    ],
itemId = {'item_1_PopUp' : false, 'item_2_PopUp' : false, 'item_3_PopUp' : false };
// Не ЗАБЫВАЙ, что при появлении нового элемента надо добавить в хэш новый счетчик состояния

  getByID('h_menu').onclick = function(e) {
    var t = e && e.target || e.srcElement,m;
    while(t && !t.id){t=t.parentNode;}
    if (t.id) {
      m = t.id.match(/(h_menu_item_(\d+)_(\S+))/);
      if (m && m[1] && m[2] && m[3]) {
        var numId = parseInt(m[2],10);
        var textAfterId = m[3];
        ShowOrHide(textAfterId, m[1], numId);
      }
    }
  };

  function ShowOrHide (textAfterId, id, numId) {
    if (textAfterId === 'show') {
      Repay_Included(numId);
      var k = 'item_' + numId + '_PopUp',
      countPopUp = itemId[k];
      // если  первый раз кликнули на блок
      if (countPopUp === false) {
        // определяем какой текст вставлять во всплывающий блок
        Insert_block_pop_up_and_info(numId);

        itemId[k] = true;
        itemId['item_' + numId] = 'on';
      }
      else {
        // по второму клику на активный блок гасим его
        (itemId['item_' + numId] === 'on') ? Hide(numId) : Show(numId);
      }
    }
    else if (textAfterId === 'hide') {
      Hide(numId);
    }
  }

  // погасить другие всплывающие блоки
  function Repay_Included (numId) {
    for (var it in itemId) {
      if (itemId[it] === 'on') {
        it = parseInt(it.replace('item_',''),10);
        // если номер блока на который кликнули совпал,
        // с виднеющемся блоком –– ничего не делаем
        (it === numId) ? {} : Hide(it);
      }
    }
  }

  function Show (numId) {
    getByID('h_menu_item_' + numId + '_triangle').style.display = 'block';
    getByID('h_menu_item_' + numId + '_pop_up').style.display = 'block';
    itemId['item_' + numId] = 'on';
  }

  function Hide (numId) {
    getByID('h_menu_item_' + numId + '_triangle').style.display = 'none';
    getByID('h_menu_item_' + numId + '_pop_up').style.display = 'none';
    itemId['item_' + numId] = 'off';
  }

// функция, которая взависимости от номер в id выбирает
// содержимое всплывающего блока (функция)
function Insert_block_pop_up_and_info (numId) {
  if (numId === 1) {
    Insert_Block(assembly_links_teachers(),numId)
  }
  else {
    Insert_Block(assembly_warnings(),numId);
  }
}
  /**
   * Сборка блока всплывающего блока вместе с информацией
   * @param [string]strIn информация, которая будет внутри блока
   * @param [digit] numId номер вставляемого элемента
   */
  function Insert_Block(strIn, numId){
    var html =
    "<div id='h_menu_item_" + numId + "_triangle' class=triangle></div>\
     <div id='h_menu_item_" + numId + "_pop_up'  class='pop_up h_menu_links_teachers'>\
       <div id='h_menu_item_" + numId + "_hide' class=cross>&times;</div>"
       + strIn +
    "</div>";
    getByID('h_menu_item_' + numId + '_show').insertAdjacentHTML('beforeEnd', html);
  }

  // сборка ссылок на преподавателей
  function assembly_links_teachers() {
    var strIn = '';
    for (var i = 0, l = list_links_teachers.length; i < l; i++) {
      var text = list_links_teachers[i][0];
      var link = list_links_teachers[i][1];
      strIn += '<p style="margin-top:0"><a href="' + link + '">' + text + '</a></p>';
    }
    return strIn;
  }

  // сборка текста о том,что кнопка не работает
  function assembly_warnings() {
    return "<p style='margin-top:0'>\
             <span style='color:black'>Извините, данная возможность в ближайшее время будет доступна!</span>\
            </p>";
  }

      function getByID (id) {
          return  document.getElementById(id);
      }
}());





