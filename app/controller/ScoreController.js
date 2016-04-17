import Score from '../model/Score';
import ScoreView from '../vue/ScoreView';

export default class ScoreController {
	constructor() {
		this.model = new Score();
		this.view = new ScoreView(this.model);
	}
}