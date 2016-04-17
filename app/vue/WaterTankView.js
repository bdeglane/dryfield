import EventEmitter from '../event/EventEmitter';

export default class WaterTankView extends EventEmitter {
	constructor(waterTank) {
		super();
		this.waterTank = waterTank;
		this.el = document.getElementById('water-tank');
		this.update();
		this.initEvent();
		this.buyWater();
	}

	initEvent() {
		this.waterTank.on('update', ()=> {
			this.update();
		});
	}

	buyWater() {
		let buy = document.getElementById('buy');
		buy.addEventListener('click', (e)=> {
			e.preventDefault();
			this.emit('buyWater');
		}, false);
	}

	update() {
		this.el.querySelector('.value').innerText = this.waterTank.water;
	}
}