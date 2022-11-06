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
		console.log(this.textContent);
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