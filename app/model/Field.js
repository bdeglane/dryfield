import EventEmitter from '../event/EventEmitter';

export default class Field extends EventEmitter {
	constructor() {
		super();
		this.timer = null;
		this.rebound = 0;
		this.increment = {
			water: 1,
			maturity: 1
		};
		this.water = {
			value: 50,
			increment: ()=> {
				return Math.ceil(-10 * this.increment.water);
			}
		};
		this.maturity = {
			value: 0,
			increment: ()=> {
				return Math.ceil(10 * this.increment.maturity);
			}
		};
	}

	grow() {
		if (this.maturity.value >= 100)
			this.maturity.value = 100;

		if (this.water.value <= 0)
			this.water.value = 0;


		// si le champs est prêt
		if (this.maturity.value >= 100) {
			// le modele emet l'evenement ready
			console.log('ready');
			this.emit('ready');
			// le model lance un timer de disponibilite
			this.startMaturityTimer();
		}
		// sinon si le champs n'est pas mature
		// et possede de l'eau
		else if (
			!this.isMature() &&
			this.hasWater()
		) {
			// le modele supprime le timer car il peut grandir
			this.clearMaturityTimer();
			// incrementation de la maturite du champs
			// decrementation de l'eau
			this.maturity.value += this.maturity.increment();
			this.water.value += this.water.increment();
			// le modele emet l'evenement notReady
			this.emit('notReady');
		}
		// si le champs n'a plus d'eau
		else if (
			this.water.value <= 0
		) {
			// le modele emet l'evenement needWater
			this.emit('needWater');
			// le model lance un timer de disponibilite
			this.startMaturityTimer();
		}
		this.emit('update');
	}

	startMaturityTimer() {
		if (this.timer === null) {
			this.timer = setInterval(()=> {
				this.isHarvest();
			}, 1000);
		}
	}

	clearMaturityTimer() {
		clearInterval(this.timer);
		this.timer = null;
	}

	hasWater() {
		if (this.water.value > 0)
			return true;
		return false;
	}

	isMature() {
		if (this.maturity.value >= 100)
			return true;
		return false;
	}

	isHarvest() {
		if (this.rebound >= 2) {
			clearInterval(this.timer);
			this.rebound = 0;
			this.maturity.value = 0;
			this.emit('notReady');
			this.clearMaturityTimer();
		} else {
			this.rebound += 1;
		}
	}

	irriguer(quantity) {
		this.water.value += quantity;
		this.emit('update');
	}

	recolter() {
		this.maturity.value = 0;
		this.emit('update');
	}

	incrementValue() {
		this.increment.maturity *= 0.85;
		this.increment.water *= 1.05;
	}

	needWater() {
		return Math.ceil(100 - this.water.value);
	}
}