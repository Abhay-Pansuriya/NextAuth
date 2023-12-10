import mongoose from "mongoose";
const connect = async () => {
    if (mongoose?.connection?.[0]?.readyState) return;
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Mongo Connections successfully established")
    } catch (error) {
        console.log("🚀 ~ file: db.js:12 ~ connect ~ error:", error)
        throw new Error("Error While connecting to Database")
    }
}

export default connect