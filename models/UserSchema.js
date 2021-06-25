var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
        join_date: { type: Date, default: Date.now },
        default_location: { lat: Schema.Types.Number, lon: Schema.Types.Number }
    }
);

module.exports = mongoose.model('User', UserSchema);