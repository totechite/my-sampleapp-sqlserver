var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.onload = () => {
    fetch('./api/memo/list').then((value) => __awaiter(this, void 0, void 0, function* () {
        const json = yield value.json();
        const list = json.list;
        list.forEach(elem => {
            addListElem(elem.content);
        });
    }));
};
function post_memo() {
    const textareaElem = document.getElementById("memo");
    const data = textareaElem.value;
    fetch('./api/memo/post', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ content: data })
    }).then(() => addListElem(data));
}
function addListElem(content) {
    let olElem = document.getElementById('list-parent');
    let liElem = document.createElement('li');
    liElem.textContent = `${content}`;
    olElem.appendChild(liElem);
}
//# sourceMappingURL=main.js.map