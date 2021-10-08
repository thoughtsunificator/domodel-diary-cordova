import { Observable } from "domodel"

/**
 * @global
 */
class Migration extends Observable {

	/**
	 * @event Migration#run
	 */

	/**
	 * @param {string} name
	 * @param {Date} created
	 */
	constructor(name, created) {
		super()
		this._name = name
		this._created = created
	}

	/**
	 * @type {string}
	 */
	get name() {
		return this._name
	}

	/**
	 * @type {Date}
	 */
	get created() {
		return this._created
	}

	toString() {
		return {
			name: this.name,
			created: this.created,
		}
	}

}

export default Migration
