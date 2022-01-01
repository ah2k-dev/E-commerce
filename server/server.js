const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require('./db/connectDB')
//config
dotenv.config({ path: "server/config/config.env" });

const port = process.env.PORT || 3000
const start = () => {
    try {
        connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Server running on ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()
