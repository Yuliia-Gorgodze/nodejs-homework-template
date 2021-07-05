const { Schema, model, SchemaTypes } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const contactSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  isFavorite: {
    type: Boolean,
    default: false
  },
  owner: { type: SchemaTypes.ObjectId, ref: 'users' },
  features: {
    type: Array,
    set: (data) => (!data ? [] : data)
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
