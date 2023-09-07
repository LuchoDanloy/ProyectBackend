import mongoose, { Schema } from "mongoose"
import paginate from "mongoose-paginate-v2";

const ticketCollection = 'tickets'

const TicketModel = new Schema({
    code: {type: Schema.Types.String, require: true} ,
    purchase_datetime: {type: Schema.Types.Date, require: true} ,
    amount: {type: Schema.Types.Number, require: true},
    purchaser: {type: Schema.Types.String, require: true}
});

TicketModel.plugin(paginate);

export default mongoose.model(ticketCollection, TicketModel);