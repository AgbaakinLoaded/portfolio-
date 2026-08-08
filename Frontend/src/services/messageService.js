import axios from "axios";


const API_URL =
    `${import.meta.env.VITE_API_URL}/api/messages`;



// =====================================================
// GET ALL MESSAGES
// =====================================================

export async function getMessages() {

    const token =
        localStorage.getItem("token");


    const response = await axios.get(

        API_URL,

        {

            headers: {

                Authorization:
                    `Bearer ${token}`

            }

        }

    );


    return response.data;

}



// =====================================================
// DELETE MESSAGE
// =====================================================

export async function deleteMessage(id) {

    const token =
        localStorage.getItem("token");


    const response = await axios.delete(

        `${API_URL}/${id}`,

        {

            headers: {

                Authorization:
                    `Bearer ${token}`

            }

        }

    );


    return response.data;

}