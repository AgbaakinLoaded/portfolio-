import axios from "axios";


const API_URL =
    "http://localhost:5000/api/auth";


export async function verifyAdmin() {

    const token =
        localStorage.getItem("token");


    const response = await axios.get(

        `${API_URL}/verify`,

        {
            headers: {

                Authorization:
                    `Bearer ${token}`

            }

        }

    );


    return response.data;

}