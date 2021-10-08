import CryptoES from "crypto-es";

import Migration from "/object/migration.js"

import { ITEM_NAME } from "../local-storage.js"

export default properties => {

	const { diary, migrations } = properties

	const migration = new Migration("md5", new Date("2021-10-06"))

	if(diary.firstRun) {
		migrations.emit("completed", migration)
	} else {
		migration.listen("run", () => {
			const listener = diary.listen("login", password => {
				diary.removeListener(listener)
				try {
					const bytes = CryptoES.AES.decrypt(localStorage.getItem(ITEM_NAME), password);
					const decryptedData = bytes.toString(CryptoES.enc.Utf8)
					const cryptedPassword = CryptoES.MD5(password).toString();
					const ciphertext = CryptoES.AES.encrypt(decryptedData, cryptedPassword).toString()
					localStorage.setItem(ITEM_NAME, ciphertext)
					const notes = JSON.parse(decryptedData)
					notes.forEach(note => diary.notes.add(note.content, new Date(note.date)))
					diary.password = cryptedPassword
					migrations.emit("completed", migration)
					diary.emit("authSuccess")
				} catch(ex) {
					console.error(ex)
				}
			})
		})
	}



	return migration
}
