import { apiUrl } from "../config";

const graphModel = {
    graphUserDocs: async function graphUserDocs() {
        const email = sessionStorage.getItem("user");
        const response = await fetch(`${apiUrl}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': sessionStorage.getItem("token")
            },
            body: JSON.stringify({ query: `{
                docs(email: "${email}") { _id, title, body }
            }`})
        });
        const result = await response.json();
        
        //console.log(result.data.docs);

        return result.data.docs;
    },
};

export default graphModel;