import { apiUrl } from "../config";

const mailModel = {
    sendMail: async function sendMail(id, title, email) {
        await fetch(`${apiUrl}/mail`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem("token")
              },
            body: JSON.stringify({
                id: id,
                title: title,
                email: email
            })
        });
    }
}

export default mailModel;