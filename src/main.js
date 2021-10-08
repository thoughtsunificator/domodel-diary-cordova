import "assets/main.css"

import { Core } from "domodel"
import { DiaryModel, DiaryBinding, Diary } from "domodel-diary"

import Persistence from "./persistence/persistence.js"


const diary = new Diary()

Persistence({ diary })

Core.run(DiaryModel, {
	binding: new DiaryBinding({ diary }),
	parentNode: document.body
})

document.addEventListener("pause", function() {
	diary.emit("logout")
}, false);
