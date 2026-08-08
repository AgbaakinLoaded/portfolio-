import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../components/admin/Sidebar";

import {
    getMessages,
    deleteMessage
} from "../services/messageService";


function AdminMessages() {

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(true);


    // Load messages

    useEffect(() => {

        async function loadMessages() {

            try {

                const data = await getMessages();

                setMessages(data);

            } catch (error) {

                console.log(
                    "Messages error:",
                    error
                );

                toast.error(
                    "Failed to load messages"
                );

            } finally {

                setLoading(false);

            }

        }


        loadMessages();

    }, []);


    // Delete message

    async function handleDelete(id) {

        const confirmDelete =
            window.confirm(
                "Delete this message?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await deleteMessage(id);


            setMessages(
                messages.filter(
                    message =>
                        message.id !== id
                )
            );


            toast.success(
                "Message deleted successfully"
            );


        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to delete message"
            );

        }

    }


    return (

        <div className="
            flex
            flex-col
            md:flex-row
            min-h-screen
        ">


            <Sidebar />


            <main className="
                flex-1
                p-5
                md:p-10
                bg-gray-100
            ">


                <h1 className="
                    text-4xl
                    font-bold
                    mb-8
                ">

                    Messages

                </h1>



                {loading ? (

                    <div className="
                        bg-white
                        rounded-xl
                        shadow
                        p-8
                    ">

                        <p className="
                            text-xl
                            text-gray-500
                        ">

                            Loading messages...

                        </p>

                    </div>

                ) : messages.length === 0 ? (

                    <div className="
                        bg-white
                        rounded-xl
                        shadow
                        p-8
                        text-center
                    ">

                        <p className="
                            text-xl
                            text-gray-500
                        ">

                            No messages yet.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-5">


                        {messages.map((message) => (

                            <div
                                key={message.id}
                                className="
                                    bg-white
                                    rounded-xl
                                    shadow
                                    p-6
                                "
                            >


                                <div className="
                                    flex
                                    flex-col
                                    md:flex-row
                                    md:items-center
                                    md:justify-between
                                    gap-4
                                    mb-5
                                ">


                                    <div>

                                        <h2 className="
                                            text-xl
                                            font-bold
                                        ">

                                            {message.name}

                                        </h2>


                                        <a
                                            href={`mailto:${message.email}`}
                                            className="
                                                text-blue-600
                                                hover:underline
                                            "
                                        >

                                            {message.email}

                                        </a>

                                    </div>


                                    <p className="
                                        text-sm
                                        text-gray-500
                                    ">

                                        {new Date(
                                            message.created_at
                                        ).toLocaleString()}

                                    </p>


                                </div>



                                <div className="
                                    bg-gray-50
                                    rounded-lg
                                    p-5
                                    mb-5
                                ">

                                    <p className="
                                        text-gray-700
                                        whitespace-pre-wrap
                                        leading-relaxed
                                    ">

                                        {message.message}

                                    </p>

                                </div>



                                <div className="
                                    flex
                                    justify-end
                                ">

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                message.id
                                            )
                                        }
                                        className="
                                            bg-red-600
                                            hover:bg-red-700
                                            text-white
                                            px-5
                                            py-2
                                            rounded-lg
                                        "
                                    >

                                        Delete

                                    </button>

                                </div>


                            </div>

                        ))}


                    </div>

                )}


            </main>


        </div>

    );

}


export default AdminMessages;