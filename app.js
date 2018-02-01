let model = {
	currentCat: null,
	cats: [
	{
		clickCount: 0,
		name: 'Cat1',
		imgSrc : 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'	
	},
	{
		clickCount: 0,
		name: 'Cat2',
		imgSrc: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'
	},
	{
		clickCount: 0,
		name: 'Cat3',
		imgSrc: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'
	},
	{
		clickCount: 0,
		name: 'Cat4',
		imgSrc: 'http://www.top13.net/wp-content/uploads/2015/10/perfectly-timed-funny-cat-pictures-5.jpg'
	},
	{
		clickCount: 0,
		name: 'Cat5',
		imgSrc: 'https://d4n5pyzr6ibrc.cloudfront.net/media/27FB7F0C-9885-42A6-9E0C19C35242B5AC/4785B1C2-8734-405D-96DC23A6A32F256B/thul-90efb785-97af-5e51-94cf-503fc81b6940.jpg?response-content-disposition=inline'
	}
  ]
};

let octopus = {
	init: function() {
		model.currentCat = model.cats[0];
		catListView.init();
		catView.init();
	},
	getCurrentCat: function() {
		return model.currentCat;
	},
	getCats: function() {
		return model.cats;
	},

	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},
	incrementCounter: function(){
		model.currentCat.clickCount++;
		catView.render();
	},
	adminActivator: function(){
		if (adminPanel.style.visibility == 'hidden'){
		adminPanel.style.visibility = 'visible';}
		else {adminPanel.style.visibility = 'hidden';}
	},
	adminSaver: function(){
		catView.countElem.textContent = catView.adminClicks.value;
		catView.catNameElem.textContent = catView.adminName.value;
		catView.catImageElem.src = catView.adminUrl.value;
	}
};


let catView = {
	init: function() {
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImageElem = document.getElementById('cat-img');
		this.countElem = document.getElementById('cat-count');
		
		this.adminPanel = document.getElementById('adminPanel');
		this.adminActivate = document.getElementById('adminActivate');
		this.adminCancel = document.getElementById('adminCancel');
		this.adminName = document.getElementById('catName');
		this.adminUrl = document.getElementById('catUrl');
		this.adminClicks = document.getElementById('catClicks');
		this.adminSave = document.getElementById('adminSave');
		
		this.catImageElem.addEventListener('click', function(){
			octopus.incrementCounter();

		});

		this.adminActivate.addEventListener('click', function(){
			octopus.adminActivator();
		});

		this.adminCancel.addEventListener('click', function(){
			octopus.adminActivator();
		});

		this.adminSave.addEventListener('click', function(){
			octopus.adminSaver();
		});

	this.render();
	},
	render: function(){
		let currentCat = octopus.getCurrentCat();
		this.countElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.imgSrc;
		this.adminPanel.style.visibility = 'hidden';
	}
};

let catListView = {
	init: function(){
		this.catListElem = document.getElementById('cat-list');
		this.render();
	},

	render: function(){
		let cat, elem, i;
		var cats = octopus.getCats();
		this.catListElem.innerHTML = '';

		for (i=0; i<cats.length; i++) {
			cat = cats[i];

			elem = document.createElement('li');
			elem.textContent = cat.name;

			elem.addEventListener('click', (function(catCopy){
				return function(){
					octopus.setCurrentCat(catCopy);
					catView.render();
				};
			})(cat));

			this.catListElem.appendChild(elem);


		}
	}
};

octopus.init();
