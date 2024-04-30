
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';

const generateEmail = async (pdfFile) => {

    // const buffer = await readFile(pdfFile.path);

    // let b = buffer.toString('base64');

    const chunks = [];
    const stream = pdfFile.stream();

    for await (const chunk of stream) {
        chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shreyanshguptaphy@gmail.com', // Replace this with your Email Id.
            pass: 'onpyikxdpgqlscjc' // Replace this with your Password.
        }
    });
    
    let mailOptions = {
        from: 'shreyanshguptaphy@gmail.com', // Replace this with your Email Id.
        to: ['shreyanshgupta.bt21cse@pec.edu.in'], // Replace this recipient Email address.
        cc: '',
        subject: 'Email With Attachments Testing',
        html: `<h1 style="color: Aqua">Welcome To DatSol Solutions</h1> <p>Please find the email </p>
        <h4 style="color: red">"Learn The Way, Create Your Own Way"</h4>
        `,
        attachments: [
            {
                filename: 'invoice.pdf',
                content: buffer,
            }
        ]
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log('Erroe Occured ' + error);
        }else {
            console.log("Email Sent Successfully to " + mailOptions.to);
        }
    });
}

 
export async function POST(req,res){

    try {
        // Handle file upload
        const formData = await req.formData();
        const pdfFile = formData.get('pdf');

        // console.log(pdfFile);
        if (!pdfFile) {
            console.error('No file uploaded');
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }
        await generateEmail(pdfFile);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
}
// upload.single('pdf')(req, res, async (err) => {
//     if (err instanceof multer.MulterError) {
//         // Multer error occurred
//         console.error('Multer error:', err);
//         return NextResponse.json({ message: 'Failed to upload file' }, { status: 500 });
//     } else if (err) {
//         // Other errors occurred
//         console.error('Error during file upload:', err);
//         return NextResponse.json({ message: 'Failed to upload file' }, { status: 500 });
//     }

//     // If no error, continue with processing
//     const pdfFile = req.file;

//     // Check if pdfFile exists
//     if (!pdfFile) {
//         console.error('No file uploaded');
//         return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
//     }

//     // Call function to generate email
//     await generateEmail(pdfFile);

//     // Return success response
//     return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
// });