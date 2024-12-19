import { renderField, renderForm } from "./field.js"

const app = document.getElementById("app")
// let globalState = {}

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


let form = await renderForm({
    showState: true,
    labelOnTop: true,
    savePath: "user_data",
    controls: {
        onSave: (state) => {
            console.log("Implement save state: " + JSON.stringify(state))

            fetch("http://localhost:8001/forms/user_data/", {
                method: "POST",
                body: JSON.stringify(state),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        },
        onClear: (state) => {
            for (const [key, value] of Object.entries(state)) {
                let node = document.getElementById(key)
                if (node.tagName == "SELECT") {
                    node.selectedIndex = 0
                }
                else if (node.tagName == "NUMBER") {
                    node.value = 0
                }
                else {
                    node.value = ""
                }
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
        },
        {
            id: "select1",
            type: "select",
            label: "ez itt most az első select",
            options: [
                {
                    value: "balls",
                    title: "Balls"
                },
                {
                    value: "balls2",
                    title: "Balls2"
                },
                {
                    value: "balls3",
                    title: "Balls3"
                }
            ]
        }
    ]
})
app.appendChild(form)

let form2 = await renderForm({
    showState: true,
    labelOnTop: true,
    savePath: "app_config",
    controls: {
        onSave: (state) => {
            console.log("Implement save state: " + JSON.stringify(state))

            fetch("http://localhost:8001/forms/app_config/", {
                method: "POST",
                body: JSON.stringify(state),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        },
        onClear: (state) => {
            for (const [key, value] of Object.entries(state)) {
                let node = document.getElementById(key)
                if (node.tagName == "SELECT") {
                    node.selectedIndex = 0
                }
                else if (node.tagName == "NUMBER") {
                    node.value = 0
                }
                else {
                    node.value = ""
                }
            }
        }
    },
    fields: [
        {
            id: "appName",
            type: "text",
            label: "Alkalmazás neve:",
        },
        {
            id: "appVersion",
            type: "text",
            label: "Alkalmazás verzió:",
        },
        {
            id: "appPlatform",
            type: "select",
            label: "Alkalmazás platformja:",
            options: [
                {
                    value: "windows",
                    title: "Windows"
                },
                {
                    value: "linux",
                    title: "Linux"
                },
                {
                    value: "ios",
                    title: "IOS"
                },
                {
                    value: "android",
                    title: "Android"
                }
            ]
        }
    ]
})
app.appendChild(form2)