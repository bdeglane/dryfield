import Field from '../model/Field';
import FieldView from '../vue/FieldView';

export default class FieldsController {
	constructor(compteur) {
		this.compteur = compteur;
		this.model = new Field();
		this.view = new FieldView(this.model, this.compteur);
	}
}