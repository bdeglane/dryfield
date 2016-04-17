import EventEmitter from '../event/EventEmitter';

export default class Score extends EventEmitter {
	constructor() {
		super();
		this.score = 0;
	}

	addScore(score) {
		this.score += score;
		this.emit('update');
	}

	removeScore(value) {
		this.score -= value;
		this.emit('update');
	}

	hasScore() {
		if (this.score > 0)
			return true;
		return false;
	}
}