import ScoreController from './controller/ScoreController';
import WaterTankController from './controller/WaterTankController';
import FieldsController from './controller/FieldsController';

export default class Game {
	constructor() {
		this.timer = null;
		this.controllers = {
			score: new ScoreController(),
			water: new WaterTankController(),
			fields: [
				new FieldsController(0),
				new FieldsController(1),
				new FieldsController(2)
			]
		};
	}

	init() {
		this.initFieldEvent();
		this.irriguerEvent();
		this.initWaterTankEvent();
		this.recolterEvent();
		this.frame();
	}

	frame() {
		this.timer = setInterval(()=> {
			this.check();
			for (let field in this.controllers.fields) {
				this.controllers.fields[field].model.grow();
			}
		}, 1000);
	}

	initFieldEvent() {
		for (let field in this.controllers.fields) {
			this.controllers.fields[field].model.on('update', ()=> {
				this.controllers.fields[field].view.update();
			});
		}
	}

	initWaterTankEvent() {
		this.controllers.water.model.on('sec', ()=> {
			for (let field in this.controllers.fields) {
				this.controllers.fields[field].view.disableButton('irr');
			}
		});
		this.controllers.water.model.on('full', ()=> {
			for (let field in this.controllers.fields) {
				this.controllers.fields[field].view.enableButton('irr');
			}
		});
		this.controllers.water.view.on('buyWater', ()=> {
			if (this.controllers.score.model.hasScore()) {
				this.controllers.score.model.removeScore(1);
				this.controllers.water.model.addWater(100);
			}
		});
	}

	irriguerEvent() {
		for (let field in this.controllers.fields) {
			this.controllers.fields[field].view.on('irriguer', ()=> {
				if (this.controllers.fields[field].model.water.value < 100) {
					let needed = this.controllers.fields[field].model.needWater();
					this.controllers.fields[field].model.irriguer(this.getTankWater(needed));
				}
			});
		}
	}

	recolterEvent() {
		for (let field in this.controllers.fields) {
			this.controllers.fields[field].view.on('recolter', ()=> {
				if (this.controllers.fields[field].model.isMature()) {
					this.controllers.fields[field].model.recolter();
					this.controllers.score.model.addScore(1);
					this.controllers.fields[field].model.incrementValue();
				}
			});
		}
	}

	getTankWater(quantity) {
		return this.controllers.water.model.getWater(quantity);
	}

	check() {
		if (this.isGameOver()) {
			clearInterval(this.timer);
			$('#gameOVer').modal({
				keyboard: true,
				backdrop: true
			});
		}
	}

	isGameOver() {
		if (
			this.controllers.water.model.water === 0 &&
			!this.controllers.fields[0].model.hasWater() &&
			!this.controllers.fields[1].model.hasWater() &&
			!this.controllers.fields[2].model.hasWater()
		) {
			return true;
		} else {
			return false;
		}
	}
}