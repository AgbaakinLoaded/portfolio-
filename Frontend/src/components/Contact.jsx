import { useState } from "react";
import toast from "react-hot-toast";

function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [sending, setSending] = useState(false);


    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }


    async function handleSubmit(e) {

        e.preventDefault();

        setSending(true);


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/messages`,
                {
                    method: "POST",

                    headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message || "Failed to send message"
                );

            }


            toast.success(
                "Message sent successfully 🚀"
            );


            setForm({
                name: "",
                email: "",
                message: ""
            });


        } catch (error) {

            console.log(
                "Contact form error:",
                error
            );


            toast.error(
                "Failed to send message"
            );

        } finally {

            setSending(false);

        }

    }


    return (

        <section className="py-20 bg-white">

            <div className="max-w-5xl mx-auto px-6">


                <h2 className="
                    text-4xl
                    font-bold
                    text-center
                    mb-12
                ">

                    Contact Me

                </h2>



                <div className="
                    grid
                    md:grid-cols-2
                    gap-10
                ">


                    {/* Contact Information */}

                    <div>


                        <h3 className="
                            text-2xl
                            font-bold
                            mb-5
                        ">

                            Get in Touch

                        </h3>



                        <p className="
                            text-gray-600
                            leading-relaxed
                            mb-6
                        ">

                            I’m always open to discussing data analytics, technology, and opportunities to collaborate. 
                            If you have a project, an opportunity, or simply want to connect, feel free to reach out.

                        </p>



                        <div className="space-y-4">


                            <a
                            href="mailto:akindeleemmanuel39@gmail.com"
                            className="hover:text-blue-600 transition"
                            >
                                E-mail: akindeleemmanuel39@gmail.com
                            </a>

                            <br></br>

                            <a
                            href="https://www.linkedin.com/in/akindele-emmanuel-4843a82aa/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                            >
                                 LinkedIn: Let Connect
                            </a>

                            <br></br>

                            <a
                            href="https://github.com/AgbaakinLoaded"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                            >
                             GitHub: View my projects 
                            </a>


                        </div>


                    </div>



                    {/* Contact Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        <input

                            type="text"

                            name="name"

                            value={form.name}

                            onChange={handleChange}

                            placeholder="Your Name"

                            required

                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "

                        />



                        <input

                            type="email"

                            name="email"

                            value={form.email}

                            onChange={handleChange}

                            placeholder="Your Email"

                            required

                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "

                        />



                        <textarea

                            name="message"

                            value={form.message}

                            onChange={handleChange}

                            rows="6"

                            placeholder="Your Message"

                            required

                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                resize-y
                            "

                        />



                        <button

                            type="submit"

                            disabled={sending}

                            className="
                                bg-blue-600
                                text-white
                                px-6
                                py-3
                                rounded-lg
                                hover:bg-blue-700
                                transition
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "

                        >

                            {sending
                                ? "Sending..."
                                : "Send Message"
                            }

                        </button>


                    </form>


                </div>


            </div>

        </section>

    );

}


export default Contact;