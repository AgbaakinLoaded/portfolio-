const pool = require("../config/db");
const nodemailer = require("nodemailer");


// =====================================================
// EMAIL TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});


// =====================================================
// CREATE MESSAGE
// POST /api/messages
// =====================================================

exports.createMessage = async (req, res) => {

    try {

        const {
            name,
            email,
            message
        } = req.body;


        // Validate fields

        if (!name || !email || !message) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }


        // Save message to PostgreSQL

        const result = await pool.query(

            `INSERT INTO messages
            (name, email, message)

            VALUES
            ($1, $2, $3)

            RETURNING *`,

            [
                name,
                email,
                message
            ]

        );


        // Send email notification

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject:
                `New Portfolio Message from ${name}`,

            text: `
You received a new message from your portfolio.

Name: ${name}

Email: ${email}

Message:

${message}
            `,

            html: `

                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                ">

                    <h2 style="
                        color: #2563eb;
                    ">
                        New Portfolio Message
                    </h2>


                    <p>
                        Someone has contacted you
                        through your portfolio website.
                    </p>


                    <hr>


                    <p>
                        <strong>Name:</strong>
                        ${name}
                    </p>


                    <p>
                        <strong>Email:</strong>
                        ${email}
                    </p>


                    <p>
                        <strong>Message:</strong>
                    </p>


                    <div style="
                        background: #f3f4f6;
                        padding: 15px;
                        border-radius: 8px;
                        white-space: pre-wrap;
                    ">
                        ${message}
                    </div>


                    <br>


                    <p>
                        You can reply directly to this
                        email to respond to ${name}.
                    </p>

                </div>

            `

        });


        // Success response

        res.status(201).json({

            message: "Message sent successfully",

            data: result.rows[0]

        });


    } catch (error) {

        console.log(
            "Create message error:",
            error
        );


        res.status(500).json({

            message: "Failed to send message"

        });

    }

};



// =====================================================
// GET ALL MESSAGES
// GET /api/messages
// =====================================================

exports.getMessages = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT *
             FROM messages
             ORDER BY created_at DESC`

        );


        res.json(
            result.rows
        );


    } catch (error) {

        console.log(
            "Get messages error:",
            error
        );


        res.status(500).json({

            message: "Failed to fetch messages"

        });

    }

};



// =====================================================
// DELETE MESSAGE
// DELETE /api/messages/:id
// =====================================================

exports.deleteMessage = async (req, res) => {

    try {

        const { id } = req.params;


        const result = await pool.query(

            `DELETE FROM messages
             WHERE id = $1
             RETURNING *`,

            [id]

        );


        // Message doesn't exist

        if (result.rows.length === 0) {

            return res.status(404).json({

                message: "Message not found"

            });

        }


        res.json({

            message: "Message deleted successfully",

            data: result.rows[0]

        });


    } catch (error) {

        console.log(
            "Delete message error:",
            error
        );


        res.status(500).json({

            message: "Failed to delete message"

        });

    }

};