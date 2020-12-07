const appendHtml = function(element, html) {
    element.innerHTML += html
}

const append = function(selector, html) {
    console.log(selector)
    let element = document.querySelectorAll(selector)

    for (let i = 0; i < element.length; i++) {
        element[i] = appendHtml(element[i], html)
    }
}
