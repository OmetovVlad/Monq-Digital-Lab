/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

export function selects(){
	//Открываем и закрываем селект
	const selects = document.querySelectorAll('.select__head');

	if (selects) {
		selects.forEach(function (item) {
			item.addEventListener("click", selectClick);
			return true;
		});
	} 

	function selectClick() {
		let selected = document.querySelectorAll('.select--open');

		if(this.parentNode.classList.contains('select--open')){
			this.parentNode.classList.remove('select--open');
		}  else {
			if (selected.length > 0){
				document.querySelector('.select--open').classList.remove('select--open');
			}
			this.parentNode.classList.add('select--open');
		}
	}

	//Меняем заголовок и закрываем
	const selectItems = document.querySelectorAll('.select__item-value');

	if (selectItems) {
		selectItems.forEach(function (item) {
			item.addEventListener("click", selectItemClick);
			return true;
		});
	} 

	function selectItemClick() {
		document.querySelector('.select--open').classList.remove('select--open');
		this.closest('.select').querySelector('.select__title').textContent = this.textContent;
	}

	//Закрываем по клику вне
	document.addEventListener( 'click', (e) => {
		if(document.getElementsByClassName('select--open').length > 0) {
			const withinBoundaries = e.composedPath().includes( document.querySelector('.select--open') );
			if(!withinBoundaries){
				document.querySelector('.select--open').classList.remove('select--open');
			}
		}
	})
	
}

export function inputNumbers(){
	const inputCodeList = document.querySelectorAll('.input-text--number');

	if (inputCodeList) {
		inputCodeList.forEach(function (item) {
			item.addEventListener("keyup", inputListener);
			
			function inputListener(){
				let regex = /[0-9]|\./;

				this.value = this.value.replace(/[a-zа-яё]/gi, '');
			}
		});
	}
}

export function saveData(){
	const saveButton = document.getElementById('save');

	if (saveButton) {
		saveButton.onclick = function() {
			
			//Тема
			var theme = document.getElementsByName('theme');

			for (var i = 0; i < theme.length; i++) {
				if (theme[i].checked){
					localStorage.setItem('themeLocal', theme[i].value);
				}
			}

			//Текстовые инпуты
			var inputsText = document.querySelectorAll('.input-text');

			for (i = 0; i < inputsText.length; i++) {
				(function(element) {
					var id = element.getAttribute('id');
					sessionStorage.setItem(id, element.value);
				})(inputsText[i]);
			}

			//homepage
			var homepage = document.getElementsByName('homepage');

			for (var i = 0; i < homepage.length; i++) {
				if (homepage[i].checked){
					localStorage.setItem('homepageLocal', homepage[i].value);
					// console.log(localStorage.getItem('homepageLocal'));
				}
			}

			//containerWidth
			var containerWidth = document.getElementsByName('containerWidth');

			for (var i = 0; i < containerWidth.length; i++) {
				if (containerWidth[i].checked){
					localStorage.setItem('containerWidthLocal', containerWidth[i].value);
				}
			}

			//firstDay
			var firstDay = document.getElementsByName('firstDay');

			for (var i = 0; i < firstDay.length; i++) {
				if (firstDay[i].checked){
					localStorage.setItem('firstDayLocal', firstDay[i].value);
				}
			}
			
			localStorageData();
		}
	}

}

export function localStorageData (){
	
	//Тема
	if(localStorage.getItem('themeLocal')) {
		let themeLocal = localStorage.getItem('themeLocal');
		let themeElement = document.querySelector('input[name="theme"][value="' + themeLocal + '"]');

		themeElement.setAttribute('checked','checked');
		document.querySelector('body').className = "";
		document.querySelector('body').classList.add(themeLocal + "-theme");
	}

	//Текстовые инпуты
	var inputsText = document.querySelectorAll('.input-text');

	for (let k = 0; k < inputsText.length; k++) {
		var id = inputsText[k].getAttribute('id');
		inputsText[k].value = sessionStorage.getItem(id);
	}

	//homepage
	if(localStorage.getItem('homepageLocal')) {
		let homepageLocal = localStorage.getItem('homepageLocal');
		let homepageElement = document.querySelector('input[name="homepage"][value="' + homepageLocal + '"]');
		
		homepageElement.setAttribute('checked','checked');
		homepageElement.closest('.select').querySelector('.select__title').textContent = homepageLocal;
	}

	//containerWidth
	if(localStorage.getItem('containerWidthLocal')) {
		let containerWidthLocal = localStorage.getItem('containerWidthLocal');
		let containerWidthElement = document.querySelector('input[name="containerWidth"][value="' + containerWidthLocal + '"]');
		
		containerWidthElement.setAttribute('checked','checked');
		containerWidthElement.closest('.select').querySelector('.select__title').textContent = containerWidthLocal;
	}

	//firstDay
	if(localStorage.getItem('firstDayLocal')) {
		let firstDayLocal = localStorage.getItem('firstDayLocal');
		let firstDayElement = document.querySelector('input[name="firstDay"][value="' + firstDayLocal + '"]');
		
		firstDayElement.setAttribute('checked','checked');
		firstDayElement.closest('.select').querySelector('.select__title').textContent = firstDayLocal;
	}
}