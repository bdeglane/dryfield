export default class ScoreView {
	constructor(Score) {
		this.score = Score;
		this.el = document.getElementById('score');
		this.update();
		this.initEvent();
	}

	initEvent() {
		this.score.on('update', ()=> {
			this.update();
		});
	}

	update() {
		this.el.querySelector('.value').innerText = this.score.score;
	}
}