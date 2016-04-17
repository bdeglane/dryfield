export default class EventEmitter {
	constructor() {
		this.events = [];
	}

	/**
	 *
	 * création de l'événement si il n'existe pas
	 * sinon, ajout d'une callback sur l'événement
	 * on écoute l'événement
	 *
	 * @param eventName string
	 * @param fn callback
	 */
	on(eventName, fn) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	}

	/**
	 *
	 * @param eventName string
	 * @param fn callback
	 */
	off(eventName, fn) {
		let index = this.events[eventName].indexOf(fn);
		if (index !== -1) {
			this.events[eventName].splice(index, 1);
		}
	}

	/**
	 *
	 * déclenche l'événement
	 *
	 * @param eventName string
	 * @param data
	 */
	emit(eventName, data) {
		// todo delete show event name in console
		//console.log(eventName);
		if (this.events[eventName]) {
			for (let event in this.events[eventName]) {
				this.events[eventName][event](data);
			}
		}
	}
}