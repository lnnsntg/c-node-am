const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
const publicDirectoryPaht = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPaht));

app.get("/weather", (req, res) => {
    res.send([
        {
            name: "Philadephia",
        },
        {
            country: "United States",
        },
    ]);
});

app.listen(port || 3000, () => {
    console.log(`Server running!!! at port ${ port }`);
});
