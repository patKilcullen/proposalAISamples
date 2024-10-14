import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    clientName: {
    type: String,
    },
    clientContact: {
    type: String,
    },
    clientEmail: {
    type: String,
    },
    clientMobile: {
    type: String,
    },
    clientAddress: {
    type: String,
    }
},
)

export default mongoose.model("Client", clientSchema);

 