import { apiUrl } from "../config";

const docsModel = {
    getUserDocs: async function getUserDocs() {
        const response = await fetch(`${apiUrl}/docs`, {
            method: 'GET',
            headers: {
            'x-access-token': sessionStorage.getItem("token")
        }
    });
        const result = await response.json();

        return result.data;
    },
    getOneDoc: async function getOneDoc(id) {
        const response = await fetch(`${apiUrl}/docs/seldoc/${id}`, {
            method: 'GET',
            headers: {
            'x-access-token': sessionStorage.getItem("token")
            }
        });
        const result = await response.json();

        return result.data;
    },
    createCurrentDoc: async function createCurrentDoc(value) {
        let titlestr = value.replace( /(<([^>]+)>)/ig, '');
        let title = titlestr.split(' ').slice(0, 5).join(' '); //Get the first five words from the text as the title.
        await fetch(`${apiUrl}/docs/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem("token")
              },
            body: JSON.stringify({
                title: title,
                body: value,
            })
        });
    },
    saveCurrentDoc: async function saveCurrentDoc(id, body) {
        await fetch(`${apiUrl}/docs/update`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem("token")
              },
            body: JSON.stringify({
                id: id,
                body: body
            })
        }); 
    },
    addUserToDoc: async function addUserToDoc(id, email) {
        await fetch(`${apiUrl}/docs/addusertodoc`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem("token")
              },
            body: JSON.stringify({
                id: id,
                email: email
            })
        }); 
    }
};

export default docsModel;