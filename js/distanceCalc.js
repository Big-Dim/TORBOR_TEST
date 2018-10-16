// Отрисовка карты и рассчет расстояния
let map;

ymaps.ready(init);

function init() {
    var mapDivId = 'map'; //Id контейнера для карты 
    var mapCenter = [45.03, 38.97]; //Координата центра карты по умолчанию
    map = new ymaps.Map(mapDivId , { center: mapCenter, zoom: 10 });

};

 function dCalc(pos_n){
	$("input").prop('disabled', true);
    var pointA = $("#from"+pos_n).val(); //Откуда считаем
    var pointB = $("#to"+pos_n).val(); ; //Куда считаем
	var d = new Date();
	var day_tm = d.getMonth() + "/" + d.getDate() +"  "+ d.getHours() +":" + d.getMinutes();
    ymaps.route([pointA , pointB ]).then(
      function (route) {
         var distance = route.getLength()/1000; //Получаем расстояние
		 $("#mess_txt").append(day_tm, " ", pointA, " - ", pointB, ": ",distance.toFixed()," km</br>\n");
         //map.geoObjects.add(route); //Рисуем маршрут на карте
		 $("input").prop('disabled', false);
      },
      function (error) {
		 $("#mess_txt").append('<p style="color:red">Ошибка: ' + error.message,"</p>\n");
		 $("input").prop('disabled', false);
      }
   );
 
} 

// VUE

$(function() {
    
Vue.component('ielem', {
  props: ['pos'],
  template: '<div class="ui-block-a"><div class="ui-body ui-body-a"><input id="from{{pos}}" v-el:in_from placeholder="Адрес 1" value="Краснодар" type="text"></div></div>\n\
  <div class="ui-block-b"><div class="ui-body ui-body-a"><input placeholder="Адрес 2" id="to{{pos}}" v-el:in_to value="Москва" type="text"></div></div>\n\
  <div class="ui-block-c"><div class="ui-body ui-body-a"><input role="button"  value="Go" id="calc" type="button" @click="calc">&nbsp<input role="button"  value="Clear" id="clr" type="button" @click="clr"></div></div>\n',
  methods: {
	calc: function() {
	  dCalc(this.pos);
    },
	clr: function() {
		this.$els.in_from.value ="";
		this.$els.in_to.value ="";
    }

  }
});

Vue.component('mess', {
  props: ['mess_txt'],
  template: '<div class="ui-block-solo"><div class="ui-body ui-body-c">{{mess_txt}}</div></div>\n',
});

var myViewModel = new Vue({
  el: '#my_view',
  data: {
    pos:0,
    values: []
  },
  methods: {
    add: function()  {
	  if (this.pos <9){
	    this.pos+=1;
        this.values.push(this.pos+1);
	  }
    }
  }
});


}); 
 

