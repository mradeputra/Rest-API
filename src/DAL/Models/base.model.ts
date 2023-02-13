import mongoose from 'mongoose'

const BaseSchema = new mongoose.Schema({
  activeFlag: {
    type: String,
    default: 'Y'
  },
  createdBy: {
    type: String,
    default: ''
  },
  lastUpdatedBy: {
    type: String,
    default: ''
  }
})

export default BaseSchema
