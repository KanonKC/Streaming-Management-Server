import { createMagicNumberMysteryBox } from "../modules/MagicNumberMysteryBox/CreateMagicNumberMysteryBox";

createMagicNumberMysteryBox("4", {
    minNumber: 1,
    maxNumber: 10,
}).then((response) => {
    console.log(response)
})