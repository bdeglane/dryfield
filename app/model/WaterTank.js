import EventEmitter from '../event/EventEmitter';

export default class WaterTank extends EventEmitter {
	constructor() {
		super();
		this.water = 500;
	}

	getWater(quantity) {
		if (this.water > 0) {
			let reserve = this.water - quantity;
			if (reserve <= 0) {
				let small = this.water;
				this.water = 0;
				this.emit('update');
				this.emit('sec');
				return small;
			}
			this.water -= quantity;
			this.emit('update');
			return quantity;


			//return (10);
		} else {
			return 0;
		}
	}

	addWater(quantity) {
		this.water += quantity;
		this.emit('update');
		this.emit('full');
	}
}