const { Schema, model, SchemaTypes } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  phone: String,
  email: String,
  isFavorite: {
    type: Boolean,
    default: false
  },
  owner: { type: SchemaTypes.ObjectId, ref: 'user' },
  favorite: {
    type: Boolean,
    default: false,
  }
}, {
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id
      return ret
    }
  },
  toObject: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id
      return ret
    }
  }
}
)
contactSchema.virtual('info').get(function() {
  return `This is contact ${this.name}`
})
contactSchema.path('name').validate((value) => {
  const re = /[A-z]\w+/g
  return re.test(String(value))
})
contactSchema.plugin(mongoosePaginate)
const Contact = model('contact', contactSchema)

module.exports = Contact
