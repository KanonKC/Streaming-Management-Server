import { isMischangingThaiLanguage } from "../../services/Gemini.service"

const datasets = [
    {label: true, text: "]n,"},
    {label: false, text: "อะไรก็ได้"},
    {label: false, text: "กินข้าว"},
    {label: true, text: "rb,rNvtwidHwfh"},
    {label: false, text: "antidisestablishmentarianism"},
    {label: true, text: "'ko"},
]

const batchPackge = datasets.map(data => isMischangingThaiLanguage(data.text))
Promise.all(batchPackge).then(result => {
    let count = 0
    console.log("Result", "Expected")
    for (let i = 0; i < result.length; i++) {
        console.log(result[i], datasets[i].label)
        if (result[i] === datasets[i].label) {
            count++
        }
    }

    console.log("Accuracy", count / datasets.length)
})