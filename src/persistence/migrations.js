import { Observable } from "domodel"

import Migrations from "/object/migrations.js"

import * as MIGRATIONS from './migrations/*.js';

const ITEM_NAME = "migrations"

export default properties => {

	const migrations = new Migrations()

	migrations.listen("completed", migration => {
		let completedMigrations = []
		if(localStorage.getItem(ITEM_NAME)) {
			completedMigrations = JSON.parse(localStorage.getItem(ITEM_NAME))
		}
		completedMigrations.push(migration)
		localStorage.setItem(ITEM_NAME, JSON.stringify(completedMigrations.map(migration => migration.toString())))
	})

	let completedMigrations = []

	if(localStorage.getItem(ITEM_NAME)) {
		completedMigrations = JSON.parse(localStorage.getItem(ITEM_NAME))
	} else {
		for(const key of Object.keys(MIGRATIONS)) {
			const migration_ = MIGRATIONS[key]({ ...properties, migrations })
			if(!completedMigrations.find(migration => migration.created === migration_.created && migration.name === migration_.name)) {
				console.log(`Running migration "${MIGRATIONS[key].name}..."`)
				migration_.emit("run")
			}
		}
	}


}
