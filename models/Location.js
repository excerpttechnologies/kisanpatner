const mongoose = require('mongoose');

const stateSchema   = new mongoose.Schema({ name: { type: String, required: true, unique: true } });
const districtSchema = new mongoose.Schema({ name: String, stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State' } });
const talukSchema    = new mongoose.Schema({ name: String, districtId: { type: mongoose.Schema.Types.ObjectId, ref: 'District' } });
const villageSchema  = new mongoose.Schema({ name: String, talukId: { type: mongoose.Schema.Types.ObjectId, ref: 'Taluk' } });

districtSchema.index({ stateId: 1 });
talukSchema.index({ districtId: 1 });
villageSchema.index({ talukId: 1 });

module.exports = {
  State:    mongoose.model('State',    stateSchema),
  District: mongoose.model('District', districtSchema),
  Taluk:    mongoose.model('Taluk',    talukSchema),
  Village:  mongoose.model('Village',  villageSchema),
};
