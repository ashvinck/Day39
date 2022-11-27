import express from "express"; // "type": "module"
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT; //not using dotenv here

// Default request 
app.get("/", function (request, response) {
    response.send(`Welcome to Files. 
    To create file :/createfile;
    read file: /getfiles`);
});

// Api request to create a file with end point "/createfile"
app.get("/createfile", function (request, response) {
    // Function to create a text file with its contents timeStamp
    const dateFunction = () => {
        const timeStamp = new Date().toString();
        fs.writeFile(`./Files/current-date-time.txt`, timeStamp, (err) => {
            if (err) throw err;
            else {
                console.log("File Created Successfully")
            }
        })
    }
    response.send(dateFunction());
})

// Api request to read files in the created folder with end point "/getfiles"
app.get("/getfiles", function (request, response) {
    fs.readdir("./Files/", (err, files) => {
        if (files.length === 0) {
            response.send("Oops! It looks like this folder is empty.")
        }
        else {
            const myJSON = JSON.stringify(files);
            response.send(myJSON);
        }
    })
});


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
