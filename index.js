require("dotenv").config();
const { app } = require("./src");

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log("http://localhost:" + PORT));
