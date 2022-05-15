window.onload = () => {
    fetch('./api/memo/list').then(async value => {
        const json = await value.json()
        const list = json.list

        list.forEach(elem => {
            addListElem(elem.content)
        });
    })
}

function post_memo() {
    const textareaElem = document.getElementById("memo") as HTMLTextAreaElement
    const data = textareaElem.value

    fetch('./api/memo/post', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ content: data })
    }
    )
}

function addListElem(content) {
    let olElem = document.getElementById('list-parent');
    let liElem = document.createElement('li');
    liElem.textContent = `${content}`;
    olElem.appendChild(liElem);
}