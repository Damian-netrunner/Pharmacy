function getIndex(list,id) {
  for (var i =0; i< list.length; i++) {
    if (list[i].id === id) {
      return i;
    }
  }
  return -1;
}
function checkUsername(list,username) {
  for (var i =0; i< list.length; i++) {
    if ((list[i].username == username)&&(username.length>0)) {
      return list[i].id;
    }
  }
  return 0;
}

function makePassword(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function is_empty(x) {
  return (
    (typeof x == 'undefined')
    ||
    (x == null)
    ||
    (x == false)  //same as: !x
    ||
    (x.length == 0)
    ||
    (x == "")
    ||
    (x.replace(/\s/g,"") == "")
    ||
    (!/[^\s]/.test(x))
    ||
    (/^\s*$/.test(x))
  );
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function  checkEmailExist(req) {
  axios.get(req).then(responce => {
    if(responce.data.userExist==1) {
      return true;
    } else {
      return false;
    }

  });

}
var userApi = Vue.resource('/userlist{/id}');

Vue.directive('phone', {
  bind(el) {
    el.oninput = function(e) {
      if (!e.isTrusted) {
        return;
      }

      let x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      el.dispatchEvent(new Event('input'));
    }
  }
});

app2 = new Vue({
  el: '#app-greeting',
  template:
    '<body id="page-top">'+
    '<nav class="navbar navbar-expand-lg navbar-light fixed-top navbar-fixed-top py-3" id="mainNav">'+
    '<div class="container">'+
    '<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"'+
    'data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"'+
    'aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>'+
    '<div class="collapse navbar-collapse" id="navbarResponsive">'+
    '<ul class="navbar-nav ml-auto my-2 my-lg-0 ">'+
    '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/">Главная</a></li>'+
    '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="#authors">Организаторы</a></li>'+
    '<li v-if="nav.firstname==null" class="nav-item"><a class="nav-link js-scroll-trigger" href="/#reports">Доклады</a></li>'+
    '<li v-else                     class="nav-item"><a class="nav-link js-scroll-trigger" href="/report">Доклады</a></li>'+
    '<li v-if="nav.userRole==3"  class="nav-item"><a class="nav-link js-scroll-trigger" href="/tezis">Управление докладами</a></li>'+
    '<li v-if="nav.userRole==3"  class="nav-item"><a class="nav-link js-scroll-trigger" href="/registred">Пользователи</a></li>'+
    '<li v-if="nav.firstname==null" class="nav-item"><a class="nav-link js-scroll-trigger" href="https://events.webinar.ru/1488855/BNV2021">Принять участие</a></li>'+
    '<li class="nav-item"><a v-if="nav.firstname!=null" class="nav-link" href="/logout">Вы вошли как: {{nav.firstname}} {{nav.lastname}} | Выйти</a></li>'+
    '</ul>'+
    '</div>'+
    '</div>'+
    '</nav>'+

    '<div v-if="showModal">'+
    '<div class="modal-mask">'+
    '<div class="modal-wrapper">'+
    '<div class="modal-container">'+
    '<div class="modal-title">'+
    '<button class="close" @click="confirmAlarm">&times;</button>' +
    '<p>{{modalHeader}}</p>' +
    '</div>'+
    '<br>'+
    '<p>Для просмотра материалов конференции Вам необходимо войти в систему и перейти в раздел "Доклады".</p>' +
    '<p>В качестве имени пользователя необходимо использовать указанный при регистрации адрес электронной почты.</p>' +
    '<br>'+
    '<div class="modal-footer">'+
    '<button class="btn btn-primary" @click="confirmAlarm">Ок</button>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+

    '<!-- Masthead-->'+
    '<header class="masthead">'+
    '<div class="container h-100">'+
    '<div class="row h-100 align-items-center justify-content-center text-center">'+
    '<div class="col-lg-10 align-self-end">'+
    '<h1 class="text-uppercase text-white font-weight-bold">БАЙКАЛЬСКИЕ НЕВРОЛОГИЧЕСКИЕ ВСТРЕЧИ-2021</h1>'+
    '<hr class="divider my-4"/>'+
    '</div>'+
    '<div class="col-lg-8 align-self-baseline">'+
    '<p class="text-white-75 font-weight-light mb-5">1 декабря 2021 г.</p>'+
    '<a class="btn btn-primary btn-xl js-scroll-trigger" href="#authors">Организаторы</a>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</header>'+
    '<!-- About-->'+
    '<section class="page-section bg-primary" id="authors">'+
    '<div class="container">'+
    '<div class="row justify-content-center">'+
    '<div class="col-lg-8 text-center">'+
    '<h2 class="text-white mt-0"></h2>'+
    '<h2 class="text-white mt-0">Федеральное государственное бюджетное образовательное учреждение высшего образования «Иркутский государственный медицинский университет» Министерства здравоохранения Российской Федерации</h2>'+
    '<h2 class="text-white mt-0">Российское общество по изучению боли</h2>'+
    '<h2 class="text-white mt-0">Ассоциация неврологов Иркутской области</h2>'+
    '<hr class="divider light my-4"/>'+
    '<a class="btn btn-light btn-xl js-scroll-trigger" href="#reports">Доклады</a>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</section>'+

    '<!-- Services-->'+
    '<section class="page-section" id="reports">'+
      '<div class="container">'+
        '<h2 class="text-center mt-0">Программа научно-практической онлайн-конференции, посвященной 80-летию профессора Окладникова Владислава Ивановича</h2>'+
        '<h3 class="text-center mb-2">1 декабря 2021 г.</h3>'+
        '<h3 class="text-center mb-2">Конференция состоится в цифровом формате 1 декабря 2021 г. на интернет-платформе <a href="https://events.webinar.ru/1488855/BNV2021">events.webinar.ru</a> <br>Предварительная регистрация обязательна.</h3>'+
        '<hr class="divider my-4"/>'+
        '<div class="row justify-content-center">'+
          '<div class="col-lg-4 col-md-6 text-center">'+
            '<div class="mt-5">'+
              '<i class="fa-4x fas fa-user text-primary mb-4"></i>'+
              '<h4 class="h4 mb-2">Приветственное слово участникам</h4>'+
              '<p class="mb-2 text-muted"><b>Малов Игорь Владимирович </b>- ректор ФГБОУ ВО ИГМУ Минздрава России, д.м.н., профессор</p>'+
              '<p class="mb-2 text-muted"><b>Быков Юрий Николаевич </b>- проректор, заведующий кафедрой нервных болезней ФГБОУ ВО ИГМУ</p>'+
            '</div>'+
          '</div>'+
          '<div class="col-lg-4 col-md-6 text-center">'+
            '<div class="mt-5">'+
              '<i class="fa-4x fas fa-brain text-primary mb-4"></i>'+
              '<h4 class="h4 mb-2">К 80-летию Окладникова Владислава Ивановича </h4>'+
              '<p class="mb-2 text-muted"><b>Быков Юрий Николаевич </b>- проректор, заведующий кафедрой нервных болезней ФГБОУ ВО ИГМУ (Иркутск)</p>'+
            '</div>'+
          '</div>'+
          '<div class="col-lg-4 col-md-6 text-center">'+
            '<div class="mt-5">'+
              '<i class="fa-4x fas fa-gavel  text-primary mb-4"></i>'+
              '<h5 class="h5 mb-2">Кафедре нервных болезней ИГМУ – 100 лет </h5>'+
              '<p class="mb-2 text-muted"><b>Окладников Владислав Иванович </b>- профессор кафедры нервных болезней ФГБОУ ВО ИГМУ Минздрава России, д.м.н., профессор (Иркутск) </p>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="row justify-content-center">'+
          '<div class="col-lg-4 col-md-6 text-center">'+
            '<div class="mt-5">'+
              '<i class="fa-4x fas fa-bed text-primary mb-4"></i>'+
              '<h5 class="h5 mb-2">Нейродегенеративные заболевания и деменция </h5>'+
              '<p class="mb-2 text-muted"><b>Васильев Юрий Николаевич </b>- доцент кафедры нервных болезней ФГБОУ ВО ИГМУ Минздрава России, к.м.н. (Иркутск) </p>'+
            '</div>'+
          '</div>'+
          '<div class="col-lg-4 col-md-6 text-center">'+
            '<div class="mt-5">'+
              '<i class="fa-4x fas fa-user-md text-primary mb-4"></i>'+
              '<h5 class="h5 mb-2">Амбулаторное наблюдение пациентов с рассеянным склерозом </h5>'+
              '<p class="mb-2 text-muted"><b>Капустенская Жанна Исмагиловна </b>- доцент кафедры неврологии и нейрохирургии ИГМАПО – филиала ФГБОУ ДПО РМАНПО Минздрава России, к.м.н. (Иркутск)</p>'+
            '</div>'+
          '</div>'+
          '<div class="col-lg-4 col-md-6 text-center">'+
            '<div class="mt-5">'+
              '<i class="fa-4x fas fa-user-nurse text-primary mb-4"></i>'+
              '<h5 class="h5 mb-2">Междисциплинарный подход к терапии сосудистых и неврологических осложнений сахарного диабета (диалог кардиолога и невролога)</h5>'+
              '<p class="mb-2 text-muted"><b>Храмцова Наталья Анатольевна</b> - профессор кафедры терапии ИГМАПО – филиала ФГБОУ ДПО</p>'+
              '<p class="mb-2 text-muted"><b>Кабаков Роман Анатольевич</b> - Кабаков Роман Анатольевич, невролог-эпилептолог Иркутского диагностического центра, к.м.н. (Иркутск)</p>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+

      '<div class="container" style="margin-top: 20px;">'+
        '<div class="row justify-content-center">'+
          '<div class="col-lg-4 col-md-6 text-center">'+
            '<div class="mt-5">'+
              '<i class="fa-4x fas fa-user-injured text-primary mb-4"></i>'+
              '<h5 class="h5 mb-2">Дифференцированный подход к терапии когнитивных нарушений</h5>'+
              '<p class="mb-2 text-muted"><b>Бендер Татьяна Борисовна</b> - ассистент кафедры нервных болезней ФГБОУ ВО ИГМУ Минздрава</p>'+
            '</div>'+
          '</div>'+
          '<div class="col-lg-4 col-md-6 text-center">'+
            '<div class="mt-5">'+
              '<i class="fa-4x fas fa-blind text-primary mb-4"></i>'+
              '<h5 class="h5 mb-2">Миастения: современное состояние проблемы</h5>'+
              '<p class="mb-2 text-muted"><b>Смолин Александр Иванович</b> - ассистент кафедры нервных болезней ФГБОУ ВО ИГМУ </p>'+
            '</div>'+
          '</div>'+
          '<div class="col-lg-4 col-md-6 text-center">'+
            '<div class="mt-5">'+
              '<i class="fa-4x fas fa-wheelchair text-primary mb-4"></i>'+
              '<h5 class="h5 mb-2">Новые подходы к терапии хронического болевого синдрома при патологии периферической нервной системы путем модуляции системы оксида азот </h5>'+
              '<p class="mb-2 text-muted"><b>Шнайдер Наталья Алексеевна</b> - д.м.н., проф., НМИЦ ПН им. В.М. Бехтерева, Санкт-Петербург, КрасГМУ им. проф. В.Ф. Войно-Ясенецкого (Красноярск)</p>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</section>'+

    '<section class="page-section bg-primary">'+
    '<div class="container">'+
    '<div class="row justify-content-center">'+
    '<div class="col-lg-8 text-center">'+
      '<h3 class="text-center text-white mb-2">Целевая аудитория: врачи-неврологи, врачи-терапевты и врачи-эндокринологи.</h3>'+
      '<h3 class="text-center text-white mb-2">Документация по данному учебному мероприятию представлена в Комиссию по оценке учебных мероприятий и материалов для НМО.</h3>'+
      '<h2 class="text-center text-white mt-0 font-weight-bold">Участие в конференции бесплатное</h2>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</section>'+
    '</div>'+

    '</body>',

  data: {
    nav:'',
    userId:'',
    userGroup:'',
    userAgree:'',


    user:[],
    editClicked:false,
    userFirstnameAlert:false,
    userLastnameAlert:false,
    userSecnameAlert:false,
    userOrganizationAlert:false,
    degreeAlert:false,
    organizationPostAddressAlert:false,
    userEmailAlert:false,
    userPhoneNumberAlert:false,
    personalDataAgreeAlert:false,
    invalidEmail:false,
    userExistAlert:false,
    userGroupNameAler:false,
    showModal: false,
    passwordLenghAlert: false,
    passwordMismatchAlert: false,
    userPasswordAlert: false,
    userPasswordConfirmAlert: false,
    userAgreeAlert:false,
    existEmail: false,


    id:'',
    firstname: '',
    lastname: '',
    secname: '',
    organization: '',
    degree: '',
    organizationPostAddress: '',
    userEmail: '',
    phoneNumber: '',
    personalDataAgree: '',
    password: '',
    passwordConfirm: '',
  },
  created: function () {
    axios.get('/nav').then(result => {
      this.nav=result.data,
        window.userId = result.data.id,
        window.userGroup = result.data.userGroup
    });
  },
  watch:{
    userAttr: function(newVal){
      this.id = newVal.id;
      this.firstname = newVal.firstname;
      this.lastname = newVal.lastname;
      this.secname = newVal.secname;
      this.organization = newVal.organization;
      this.degree = newVal.degree;
      this.organizationPostAddress = newVal.organizationPostAddress;
      this.userEmail = newVal.userEmail;
      this.phoneNumber = newVal.phoneNumber;
      this.personalDataAgree = newVal.personalDataAgree;
      this.password = newVal.password;
      this.passwordConfirm = newVal.passwordConfirm;
    }
  },

  methods: {
    confirmAlarm: function (){
      this .showModal=false;
    },
    save: function () {

      //this.password = makePassword(10);
      //alert("пароль сгенерирован автоматичеки: " + this.password);

      var user = {
        firstname: capitalizeFirstLetter(this.firstname),
        lastname: capitalizeFirstLetter(this.lastname),
        secname: capitalizeFirstLetter(this.secname),
        organization: capitalizeFirstLetter(this.organization),
        degree: capitalizeFirstLetter(this.degree),
        organizationPostAddress: capitalizeFirstLetter(this.organizationPostAddress),
        userEmail: this.userEmail.toLowerCase(),
        phoneNumber: this.phoneNumber,
        personalDataAgree: this.personalDataAgree,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      };



      if (is_empty(this.password)) {
        this .userPasswordAlert = true;
      } else this .userPasswordAlert = false;

      if (is_empty(this.passwordConfirm)) {
        this .userPasswordConfirmAlert = true;
      } else this .userPasswordConfirmAlert = false;

      if (this.passwordConfirm!==this.password) {
        this .passwordMismatchAlert = true;
      } else this .passwordMismatchAlert = false;

      if (this.password.length <10) {
        this .passwordLenghAlert = true;
      } else this .passwordLenghAlert = false;





      if (is_empty(this.firstname)) {
        this .userFirstnameAlert = true;
      } else this .userFirstnameAlert = false;

      if (is_empty(this.lastname)) {
        this .userLastnameAlert = true;
      } else this .userLastnameAlert = false;

      if (is_empty(this.secname)) {
        this .userSecnameAlert = true;
      } else this .userSecnameAlert = false;

      if (is_empty(this.organization)) {
        this .userOrganizationAlert = true;
      } else this .userOrganizationAlert = false;

      if (is_empty(this.degree)) {
        this .degreeAlert = true;
      } else this .degreeAlert = false;

      if (is_empty(this.organizationPostAddress)) {
        this .organizationPostAddressAlert = true;
      } else this .organizationPostAddressAlert = false;

      if (is_empty(this.userEmail)) {
        this .userEmailAlert = true;
      } else this .userEmailAlert = false;

      if (is_empty(this.phoneNumber)) {
        this .userPhoneNumberAlert = true;
      } else this .userPhoneNumberAlert = false;

      if (!this.personalDataAgree) {
        this .personalDataAgreeAlert = true;
      } else this.personalDataAgreeAlert = false;

      if (!this.userAgree) {
        this .userAgreeAlert = true;
      } else this.userAgreeAlert = false;

      if (validateEmail(this.userEmail.toLowerCase())) {
        this.invalidEmail = false
      } else {
        this.invalidEmail = true;
      }

      axios.get("/checkUser/"+this.userEmail.toLowerCase()).then(responce => {

        if(responce.data.userExist==1) {
          this.existEmail = true;

        } else
        if(responce.data.userExist==0)  {
          this.existEmail = false;
          if ((!this.userFirstnameAlert) &&
            (!this.userLastnameAlert) &&
            (!this.userSecnameAlert) &&
            (!this.userOrganizationAlert) &&
            (!this.degreeAlert) &&
            (!this.organizationPostAddressAlert) &&
            (!this.userEmailAlert) &&
            (!this.userPhoneNumberAlert) &&
            (!this.personalDataAgreeAlert) &&
            (!this.invalidEmail) &&
            (!this.passwordLenghAlert) &&
            (!this.passwordMismatchAlert) &&
            (!this.userPasswordAlert) &&
            (!this.existEmail) &&
            (!this.userAgreeAlert) &&
            (!this.userPasswordConfirmAlert)
          ) {
            userApi.save({}, user).then (response => {
              this.modalHeader = capitalizeFirstLetter(this.lastname) +' '+capitalizeFirstLetter(this.firstname)+' '+capitalizeFirstLetter(this.secname)+', Вы успешно зарегистрированы!';
              this.id='';
              this.firstname ='';
              this.lastname = '';
              this.secname = '';
              this.organization = '';
              this.degree = '';
              this.organizationPostAddress = '';
              this.userEmail = '';
              this.phoneNumber = '';
              this.personalDataAgree = '';
              this.password = '';
              this.passwordConfirm = '';
              this.showModal=true;
              this.userFirstnameAlert=false;
              this.userLastnameAlert=false;
              this.userSecnameAlert=false;
              this.userOrganizationAlert=false;
              this.degreeAlert=false;
              this.organizationPostAddressAlert=false;
              this.userEmailAlert=false;
              this.userPhoneNumberAlert=false;
              this.personalDataAgreeAlert=false;
              this.invalidEmail=false;
              this.passwordLenghAlert=false;
              this.passwordMismatchAlert=false;
              this.userPasswordAlert=false;
              this.existEmail=false;
              this.userPasswordConfirmAlert=false;
            }, response => {
              alert("Сервер временно не доступен, попробуйте еще раз!");
            })
          }
        }
      });
    },
  }

});
