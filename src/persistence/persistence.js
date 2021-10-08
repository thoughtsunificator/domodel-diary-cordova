import LocalStorage from "./local-storage.js"
import Migrations from "./migrations.js"

export default properties => {

	LocalStorage(properties)
	Migrations(properties)

}
