const docsModel = {
    getAllDocs: async function getAllDocs() {
        const response = await fetch("https://jsramverk-editor-gusu20.azurewebsites.net/docs");
        const result = await response.json();

        return result.data;
    },
    getOneDoc: async function getOneDoc(id) {
        const response = await fetch(`https://jsramverk-editor-gusu20.azurewebsites.net/docs/seldoc/${id}`);
        const result = await response.json();

        return result.data;
    },
    createCurrentDoc: async function createCurrentDoc(value) {
        let titlestr = value.replace( /(<([^>]+)>)/ig, '');
        let title = titlestr.split(' ').slice(0, 5).join(' '); //Get the first five words from the text as the title.
        await fetch("https://jsramverk-editor-gusu20.azurewebsites.net/docs/create", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                title: title,
                body: value
            })
        });
    },
    saveCurrentDoc: async function saveCurrentDoc(id, body) {
        await fetch("https://jsramverk-editor-gusu20.azurewebsites.net/docs/update", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                id: id,
                body: body
            })
        }); 
    }
};

export default docsModel;