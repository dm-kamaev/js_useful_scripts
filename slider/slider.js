// TODO: Переписать в функциональном стиле
// TODO: Добавить slideshow
// TODO: Передалать методы
// TODO: Пофиксить глюк отсутствия анимации при пролистывании первого слайда
// (сделать gotTo(1) а потом goTo(0))
// TODO: CSS динамически добавлять
// TODO: Динамические HTML создавать
var Slider = function() {
  this.initialize.apply(this, arguments);
};
Slider.prototype = {

  initialize: function(slider) {
    this.ul = slider.children[0];
    this.li = this.ul.children;
    console.log('this.ul = ', this.ul);
    console.log('this.li = ', this.li);
    // make <ul> as large as all <li>’s
    this.ul.style.width = (this.li[0].clientWidth * this.li.length) + 'px';
    console.log('this.ul.style.width =', this.ul.style.width);
    this.currentIndex = 0;
  },

  goTo: function(index) {
    // filter invalid indices
    if (index < 0 || index > this.li.length - 1) return;

    // move <ul> left
    this.ul.style.left = '-' + (100 * index) + '%';
    console.log(this.ul.style.left)
    this.currentIndex = index;
  },

  goToPrev: function() {
    this.goTo(this.currentIndex - 1);
  },

  goToNext: function() {
    this.goTo(this.currentIndex + 1);
  }
};