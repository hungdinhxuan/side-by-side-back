const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const EvaluationSchema = new Schema(
  {
    walletId: { type: Schema.Types.ObjectId, required: true, ref: 'wallets' },
    ammount: { type: Number, required: true, default: 0 },
    methods: { type: String },
    renterId: { type: Schema.Types.ObjectId, required: true, ref: 'renters' },
    playerID: { type: Schema.Types.ObjectId, required: true, ref: 'players' },
    content: { type: String, default: '' },
    rating: { type: String, enum: ['1', '2', '3', '4', '5'], default: '5' },
  },
  { timestamps: true }
);

EvaluationSchema.plugin(mongoose_delete);

module.exports = mongoose.model('evaluations', EvaluationSchema);
