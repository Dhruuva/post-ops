const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");
const PostSchema = new Schema(
  {
    slug: { type: String, lowercase: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tagList: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

PostSchema.plugin(uniqueValidator, { message: "Is already taken" });

PostSchema.pre('remove',{ query: true, document: false }, async function(next) {
  let id = this.getQuery()['_id']
    this.model.findOne({_id : id},  function(err, results) {
      if(err) {
         console.warn(' Pre remove results  EError', err);
         next();
      } else if(results) {
          console.log(' Pre remove results', results);
          next();
      } else {
        console.log(' Pre remove No results');
           next();
      }
    });

    // this.findById(id, function(err, entity) {
    //     console.log(' Pre remove 222 entity===',entity);

    //  });


  console.log(   "==Remove all the docs that refers=", id);
  //this.model('Post').remove({ author: this._id }, next());
  next();
});

PostSchema.pre('deleteOne',{ query: true, document: false }, function(next) {
   console.log("deleteOne,Delete  the docs that refers");
    //this.model('Post').remove({ author: this._id }, next());
    next();
});

// add later to test pre 
// PostSchema.pre('save', function(next) {
//   console.log("Post Pre save work", this);

//   if (!this.isNew) return next();
    
//   next();
 
// });

PostSchema.statics.create = function(dataEntity) {
  const new_entity = new this(dataEntity);
  return new_entity.save();
};

PostSchema.statics.list = function(perPage, page) {
  return new Promise((resolve, reject) => {
    this.find()
      .limit(perPage)
      .skip(perPage * page)
      .populate('author')
      .exec(function(err, entities) {
        if (err) {
          reject(err);
        } else {
          resolve(entities);
        }
      });
  });
};

PostSchema.statics.removeById = function(id) {
  return new Promise((resolve, reject) => {
    this.remove({ _id: id }, err => {

      if (err) {
        console.log(id, "PostSchema.statics.removeById " ,err )
        reject(err);
      } else {
        console.log(id ," Good PostSchema.statics.removeById " ,err )
        resolve(err);
      }
    });
  });
};

PostSchema.statics.patch = function(id, entityData) {
  // needs to Ensure no collision

  return new Promise((resolve, reject) => {
    this.findById(id, function(err, entity) {
      if (err) reject(err);
      for (let i in entityData) {
        entity[i] = entityData[i];
      }
      entity.save(function(err, updatedEntity) {
        if (err) return reject(err);
        resolve(updatedEntity);
      });
    });
  });
};

// Custom methods
PostSchema.statics.findBySlug = function(slug) {
  return this.find({ slug: slug });
};

PostSchema.statics.total = function() {
  return new Promise((resolve, reject) => {
    this.estimatedDocumentCount({})
        .exec(function(err, t) {
        if (err) {
          reject(err);
        } else {
          resolve(t);
        }
      });
  });
};

mongoose.model("Post", PostSchema);
