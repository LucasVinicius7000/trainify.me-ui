import axios from "axios";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_HOST;

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    // Caso o token da api expire 
    if (error?.response?.status === 401) {
        // Obtem a sessão do usuário para pegar o refresh token
        let { user } = await getSession();
        try {
            // Obtem um novo token e refresh token usando o refresh token antigo
            let newAcessToken = (await api.post(`/Auth/refresh-token`, user.refreshToken)).data;
            if (newAcessToken) {
                // Insere novo token no cabeçalho de autorização do axios
                api.defaults.headers.common['Authorization'] = `Bearer ${newAcessToken.data.token}`;
                // Atualiza a sessão com novo token e refresh token
                user.token = newAcessToken.data.token;
                user.refreshToken = newAcessToken.data.refreshToken;
                const csrfToken = await getCsrfToken();
                await getSession({
                    req: {
                        body: {
                            csrfToken,
                            data: { user },
                        },
                    },
                })
                // Lança a requisição não autorizada novamente com novo token
                return api.request(error.config);
            }
        } catch (error) {
            signOut({ redirect: "/" });
            return;
        }
    }
    else return error;
});

export default api;