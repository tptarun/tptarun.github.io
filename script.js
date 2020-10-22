

$('.txt').html(function(i, html) {
    var chars = $.trim(html).split("");
  
    return '<span>' + chars.join('</span><span>') + '</span>';
  });

 
 
//caption

class TextScramble {
	constructor(el) {
	  this.el = el;
	  this.chars = '!<>-_\\/[]{}—=+*^?#________';
	  this.update = this.update.bind(this);
	}
  
	setText(newText) {
	  const oldText = this.el.innerText;
	  const length = Math.max(oldText.length, newText.length);
	  const promise = new Promise(resolve => this.resolve = resolve);
  
	  this.queue = [];
	  for (let i = 0; i < length; i++) {
		const from = oldText[i] || '';
		const to = newText[i] || '';
		const start = Math.floor(Math.random() * 40);
		const end = Math.floor(Math.random() * 40) + start;
		this.queue.push({ from, to, start, end });
	  }
  
	  cancelAnimationFrame(this.frameRequest);
	  this.frame = 0;
	  this.update();
	  return promise;
	}
  
	update() {
	  let output = '';
	  let complete = 0;
	  for (let i = 0, n = this.queue.length; i < n; i++) {
		let { from, to, start, end, char } = this.queue[i];
  
		if (this.frame >= end) {
		  complete++;
		  output += to;
		} else if (this.frame >= start) {
		  if (!char || Math.random() < 0.28) {char = this.randomChar();this.queue[i].char = char;}
		  output += `<span class='dud'>${char}</span>`;
		} else {
		  output += from;
		}
	  }
	  this.el.innerHTML = output;
	  if (complete === this.queue.length) {this.resolve();} else {
		this.frameRequest = requestAnimationFrame(this.update);this.frame++;}
	}
  
	randomChar() {
	  return this.chars[Math.floor(Math.random() * this.chars.length)];
	}}
  
  
  const phrases = [
  'Python Developer',
  'Web Designer',
  'Video Editor',
  '3D Artist',
  'Game Developer',
  'Gamer🎮',
  '& A Learner🙏'];
  
  
  const el = document.querySelector('.text');
  const fx = new TextScramble(el);
  
  let counter = 0;
  const next = () => {
	fx.setText(phrases[counter]).then(() => {
	  setTimeout(next, 800);
	});
	counter = (counter + 1) % phrases.length;
  };
  
  next();

 // Cache selectors
var lastId,
topMenu = $("#mainNav"),
topMenuHeight = topMenu.outerHeight()+1,
// All list items
menuItems = topMenu.find("a"),
// Anchors corresponding to menu items
scrollItems = menuItems.map(function(){
  var item = $($(this).attr("href"));
   if (item.length) { return item; }
});

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
 var href = $(this).attr("href"),
	 offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
 $('html, body').stop().animate({ 
	 scrollTop: offsetTop
 }, 850);
 e.preventDefault();
});


