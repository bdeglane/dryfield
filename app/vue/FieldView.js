import EventEmitter from '../event/EventEmitter';

export default class FieldView extends EventEmitter {
	constructor(Field, id) {
		super();
		this.field = Field;
		this.id = id;
		this.el = document.getElementById('field-' + this.id);
		this.update();
		this.init();
		this.bindButton();
	}

	init() {
		this.field.on('update', ()=> {
			this.update();
		});
		this.field.on('notReady', ()=> {
			this.disableButton('rec');
		});
		this.field.on('ready', ()=> {
			this.enableButton('rec');
		});
		this.field.on('needWater', ()=> {

		});
	}

	bindButton() {
		this.irriguer();
		this.recolter();
	}

	disableButton(name) {
		let button = document.getElementById(name + '-' + this.id);
		button.classList.add('disabled');
		this.update();
	}

	enableButton(name) {
		let button = document.getElementById(name + '-' + this.id);
		button.classList.remove('disabled');
		this.update();
	}

	irriguer() {
		let irr = document.getElementById('irr-' + this.id);
		irr.addEventListener('click', (e)=> {
			e.preventDefault();
			this.emit('irriguer');
		}, false);
	}

	recolter() {
		let rec = document.getElementById('rec-' + this.id);
		rec.addEventListener('click', (e)=> {
			e.preventDefault();
			if (this.field.isMature()) {
				this.emit('recolter');
				this.disableButton('rec');
			}
		}, false);
	}

	update() {
		let water = this.el.querySelector('.progress-water-' + this.id);
		//water.innerText = this.field.water.value;
		water.setAttribute('aria-valuenow', this.field.water.value);
		water.setAttribute('style', 'width:' + this.field.water.value + '%');

		let maturity = this.el.querySelector('.progress-maturity-' + this.id);
		//maturity.innerText = this.field.maturity.value;
		maturity.setAttribute('aria-valuenow', this.field.maturity.value);
		maturity.setAttribute('style', 'width:' + this.field.maturity.value + '%');
	}
}