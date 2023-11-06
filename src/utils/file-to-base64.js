import { rejects } from "assert";
import { toast } from 'react-toastify';

export async function fileToBase64(event) {
    return new Promise((resolve, rejects) => {
        debugger;
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            const fileName = file.name.split('.').slice(0, -1).join('.');
            const fileExtension = file.name.split('.').pop();
            reader.onload = function (e) {
                const base64String = e.target.result.split(',')[1];
                const mimeType = e.target.result.split(';')[0].split(':')[1];
                resolve({ base64String, mimeType, fileName, fileExtension })
            };

            reader.onerror = function (e) {
                console.log(e);
                toast.error("Ocorreu um erro na leitura do arquivo.");
                rejects(null);
            }

            reader.readAsDataURL(file);
        }

    })
}

