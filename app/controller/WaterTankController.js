import WaterTank from '../model/WaterTank';
import WaterTankView from '../vue/WaterTankView';

export default class WaterTankController {
	constructor() {
		this.model = new WaterTank();
		this.view = new WaterTankView(this.model);
	}
}