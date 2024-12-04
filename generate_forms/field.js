export function renderField(obj) {
    switch (obj.type) {
        case "text":
            return renderText(obj)
        case "number":
            return renderNumber(obj)
        case "email":
            return renderEmail(obj)
        case "default":
            return renderDefault(obj)
    }
}

function renderText(obj) {
    return renderLabel(obj, (obj) => {
        let field = document.createElement("input")
        field.id = obj.id
        field.type = "text"

        // field.addEventListener("input", (event) => {
        //     obj.state[obj.id] = field.value
        // })
        field.addEventListener("input", (event) => { OnValueUpdated(obj, field) })

        return field
    })
}

function renderNumber(obj) {
    return renderLabel(obj, (obj) => {
        let field = document.createElement("input")
        field.id = obj.id
        field.type = "number"

        // field.addEventListener("input", (event) => {
        //     let value = field.value

        //     // if (field.value == "" && obj.state[obj.id].length > 1) {
        //     //     field.value = obj.state[obj.id]
        //     //     return
        //     // }

        //     obj.state[obj.id] = value
        //     field.value = value
        // })
        field.addEventListener("input", (event) => { OnValueUpdated(obj, field) })

        return field
    })
}

function renderEmail(obj) {
    return renderLabel(obj, (obj, container) => {
        let _container = container
        if (_container == null) {
            _container = document.createElement("div")
            _container.id = obj.id
        }

        let name = document.createElement("input")
        name.id = obj.id + "_name"
        name.type = "text"
        name.style.display = "inline"

        // name.addEventListener("input", (event) => {
        //     obj.state[obj.id] = name.value
        // })
        name.addEventListener("input", (event) => {
            OnValueUpdated({
                id: obj.id + "_name",
                state: obj.state,
            }, name)
        })

        _container.appendChild(name)

        let kukac = document.createElement("p")
        kukac.innerText = "@"
        kukac.style.display = "inline"

        _container.appendChild(kukac)

        let domain = document.createElement("input")
        domain.id = obj.id + "_domain"
        domain.type = "text"
        domain.style.display = "inline"

        // domain.addEventListener("input", (event) => {
        //     obj.state[obj.id] = domain.value
        // })
        domain.addEventListener("input", (event) => {
            OnValueUpdated({
                id: obj.id + "_domain",
                state: obj.state,
            }, domain)
        })

        _container.appendChild(domain)

        if (container == null) {
            return _container
        }
    })
}

function renderDefault(obj) {
    let field = document.createElement("div")
    field.id = obj.id

    return field
}

function renderLabel(obj, createFunc) {
    let container
    if (obj.label != null) {
        container = document.createElement("div")

        let label = document.createElement("p")
        label.for = obj.id
        label.innerText = obj.label
        label.id = "label_" + obj.id

        if (obj.labelOnTop == true) {
            label.style.display = "block"
            label.style.padding = 0
            label.style.margin = 0
        }
        else {
            label.style.display = "inline"
        }

        container.appendChild(label)
    }

    let field = createFunc(obj, container)

    if (container != null) {
        if (field != null) {
            container.appendChild(field)
        }

        return container
    }

    return field
}

export function renderForm(form) {
    let _form = document.createElement("div")
    var formState = {}

    if (form.showState) {
        let label = document.createElement("p")
        label.id = "form_state"
        label.innerText = "Form state: " + JSON.stringify(formState)
        _form.appendChild(label)
    }

    for (let index = 0; index < form.fields.length; index++) {
        let config = form.fields[index]
        config.labelOnTop = form.labelOnTop
        config.state = formState
        _form.appendChild(renderField(config))
    }

    let controls = form.controls
    if (controls != null) {
        if (controls.onSave != null) {
            let but = document.createElement("button")
            but.id = "form_onsave"
            but.innerText = "Save"
            but.onclick = () => { controls.onSave(formState) }
            _form.appendChild(but)
        }

        if (controls.onClear != null) {
            let but = document.createElement("button")
            but.id = "form_onclear"
            but.innerText = "Clear"
            but.onclick = () => { controls.onClear(formState) }
            _form.appendChild(but)
        }
    }

    return _form
}

function OnValueUpdated(obj, field) {
    let value = field.value
    obj.state[obj.id] = value
    field.value = value

    let output = document.getElementById("form_state")
    if (output != null) {
        output.innerText = "Form state: " + JSON.stringify(obj.state)
    }
}