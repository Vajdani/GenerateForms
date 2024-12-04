import { renderField, renderForm } from "./field.js"

const app = document.getElementById("app")
let globalState = {}

// let text1 = renderField({
//     id: "text1",
//     type: "text",
//     state: globalState,
//     label: "ez itt most az első text",
//     labelOnTop : true,
// })
// app.appendChild(text1)

// app.appendChild(document.createElement("br"))
// app.appendChild(document.createElement("br"))
// let text2 = renderField({
//     id: "text2",
//     type: "text",
//     state: globalState,
//     label: "ez itt most a második text",
// })
// app.appendChild(text2)

// app.appendChild(document.createElement("br"))
// app.appendChild(document.createElement("br"))
// let number = renderField({
//     id: "number1",
//     type: "number",
//     state: globalState,
//     label: "ez itt most az első number",
// })
// app.appendChild(number)


// app.appendChild(document.createElement("br"))
// app.appendChild(document.createElement("br"))
// let email1 = renderField({
//     id: "email1",
//     type: "email",
//     state: globalState,
//     label: "ez itt most az első ímél",
//     labelOnTop : true,
// })
// app.appendChild(email1)


let form = renderForm({
    showState: true,
    labelOnTop: true,
    controls: {
        onSave: (state) => {
            console.log("Implement save state: " + JSON.stringify(state))
        },
        onClear: (state) => {
            for (const [key, value] of Object.entries(state)) {
                document.getElementById(key).value = ""
            }
        }
    },
    fields: [
        {
            id: "text1",
            type: "text",
            label: "ez itt most az első text",
        },
        {
            id: "text2",
            type: "text",
            label: "ez itt most a második text",
        },
        {
            id: "number1",
            type: "number",
            label: "ez itt most az első number",
        },
        {
            id: "email1",
            type: "email",
            label: "ez itt most az első ímél",
        }
    ]
})
app.appendChild(form)