/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */



var show_lead_status;
(function() {

  var fields = ['email', 'phone'],
    INFO = {
       email : {
         id        : 'lead_form_fields_1',
         attribute : 'type="text" placeholder="Введите email"',
         validate  :  validationEmail,
         error     : '* Email неправильный'
       },
       phone : {
         id        : 'lead_form_fields_2',
         attribute : 'type="text" placeholder="Введите телефон"',
         error     : ''
       },
    },
    D = document,
    H = D.getElementsByTagName("head")[0];
    show_lead_status = function(res) {
      if (res.status === 'ok') {
        Hide();
        setCookie('show_lead_status', 'hide', 4, '/', window.location.hostname);
      }
    };


  if (getCookie().show_lead_status !== 'hide') {
    Start();
  }

  function Start() {
    var form = createForm(createField(), createButton(), '400', '200');
    D.body.insertAdjacentHTML('beforeEnd', form);

    getByID('lead_form').onsubmit = function(e) {
      Submit(e);
    };

    getByID('lead_form_hide').onclick = function() {
      Hide();
    };
  }

  function Submit (e) {
    e.preventDefault();
    var countValidation = true,
    url = 'http://dev.sailplay.ru/js-api/74/users/update/?callback=show_lead_status';

    for (var i = 0, l = fields.length; i < l; i++) {
      var f = fields[i];
      INFO[f].val = getByID(INFO[f].id).value || '';
      if (INFO[f].validate) {
         if (!INFO[f].validate(f)){countValidation = false;}
      }
      url += '&' + f + '=' + INFO[f].val;
    }

    if (countValidation) {
      getJSONP(url);
    }
  }

  function Hide () {
    getByID('lead').style.display = 'none';
    getByID('lead_form').style.display = 'none';
  }

  function validationEmail (f) {
    email = INFO[f].val.toLowerCase();
    if (/^\w[\w\-\.\&]*\@[a-z0-9][a-z0-9\-\.]*\.[a-z]{2,6}$/.test(email)) {
      return true;
    }else {
      getByID((INFO[f].id)+'_error').innerHTML = INFO[f].error;
      return false;
    }
  }





//////////////////////////////////////////////////////////////

  function createForm (field_form, button, width, height) {
    var marginWidth = -1 * (width / 2 + 10);
    var marginHeight = -1 * (height / 2 + 10);

    var cssLead = '\
     "position: fixed;\
      top: 0;\
      left: 0;\
      width: 100%;\
      height: 100%;\
      background: rgba(0, 0, 0, 0.81);\
      z-index: 999;"';
    var cssLeadForm = '\
     "position: absolute;\
      top: 50%;\
      left: 50%;\
      padding: 20px;\
      width:'+width+'px;\
      height:'+height+'px;\
      background: #fff;\
      margin:'+marginHeight+'px '+marginWidth+'px;\
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.9)"';

    var cssCross = '\
     "float:right;\
      width:4%;\
      text-align:center;\
      margin-top:-18px;\
      margin-right:-18px;\
      line-height:1;\
      color:#666;\
      cursor:pointer"';

    var cssLeadFormText = '\
     "float:left;\
      width:94%;\
      margin-top:0"';

    var htmlForm = '\
    <div id=lead style='+cssLead+'>\
      <form id=lead_form style='+cssLeadForm+' action=#>\
        <p style='+cssLeadFormText+'>\
          Подпишитесь на нашу рассылку\
        </p>\
        <div id=lead_form_hide style='+cssCross+'>&times;</div>' +
        field_form + button +
      '</form>\
    </div>';

    return htmlForm;
  }

  function createField (key) {
    var cssLeadFormFields = '\
    "float:left;\
     width:60%"\
    ';
    var cssLeadFormInput ='\
     width:100%;\
     vertical-align:top;\
     background-color: #fff;\
     border: 1px solid #ccc;\
     box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;\
     font-size: 27px;\
     height: 30px;\
     line-height: 20px;\
     border-radius: 10px;\
     padding-left: 5px;';

    var cssLeadFormInputError = '\
     "float:left;\
      color:red;\
      font-size:75%;"';

    var htmlFields = '<p style='+cssLeadFormFields+'>';
    for (var i = 0, l = fields.length; i < l; i++) {
      var f = fields[i];
      var cssLeadFormInputAttribute = INFO[f].attribute || '';
      var marginTop = (i >= 1) ? 'margin-top:5px;' : '';
      htmlFields +='<input id='+INFO[f].id+'       style="'+cssLeadFormInput+marginTop+'"'+cssLeadFormInputAttribute+'>';
      htmlFields +='<span  id='+INFO[f].id+'_error style='+cssLeadFormInputError+'></span>';
    }
    htmlFields += '</p>';

    return htmlFields;
  }

  function createButton (key) {
    var cssLeadFormButton = '\
    "float:right;\
     width:30%;\
     vertical-align:top;\
     line-height:0;\
     margin-top:10px"';

    var cssLeadFormButtonInput = '\
    "width:100%;\
     color:#fff;\
     \
     background-color:#FF7800;\
     border-color: #d43f3a;\
     border: 1px solid transparent;\
     border-radius: 4px;\
     cursor: pointer;\
     font-size: 14px;\
     line-height: 1.4;\
     margin-right: 6px;\
     margin-bottom: 0;\
     padding: 6px 12px;\
     text-align: center;\
     vertical-align: top;\
     white-space: nowrap"';

    var cssLeadFormButtonInputAttribute ='type="submit" value="Подписаться"';

    var htmlButton = '\
    <p style='+cssLeadFormButton+'>\
      <input style='+cssLeadFormButtonInput+cssLeadFormButtonInputAttribute+'>\
    </p>';
    return htmlButton;
  }







////////////////////////////////////////////////////////////

  function getJSONP(url) {
    var ref = D.getElementsByTagName('script')[0];
    var script = D.createElement('script');
    script.src = url;
    script.onload = function() {
      this.remove();
    };
    ref.parentNode.insertBefore(script, ref);
  }

  function crH(a,x,h){h={};setArray(a,function(i,v,s){s=v.split(x);if(s[0]&&s[1]){h[s[0]]=s[1]}});return h};
  function setCookie(o,e,n,t,a){var i=o+"="+encodeURIComponent(e);if("number"!=typeof n)throw new Error(" Параметр daysToLive должен быть числом. ");i+="; max-age="+60*n*60*24,i+="; path="+t,i+="; domain="+a,i+=";",document.cookie=i}
  function getCookie(){return crH(D.cookie.split(/;\s*/),"=")};

  function setArray(a,f){for(var i=0,l=a.length;i<l;i++){if(a[i]!=undefined){f(i,a[i])}}};
  function getByID (id) {return document.getElementById(id);}

}());