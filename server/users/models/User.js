const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const Post = mongoose.model("Post");
// Create Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  familyname: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  profilePicture: {
    // link
    type: String,
    required: false,
    default: ""
  },
  password: {
    type: String,
    required: false,
    select: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  google: {
    googleId: { type: String, required: false }
  },
  OAuthProvider: {
    type: String,
    required: false
  },
  OAuthId: {
    type: String,
    required: false
  },

  permissionLevel: Number
});

// General Function for a model
userSchema.statics.findByEmail = function(email) {
  return this.find({ email: email });
};

userSchema.statics.userPost = async function(uid) {
  console.log("userSchema.statics.userPost ", uid)
  //await this.model('Post').({ author: uid }).exec();
  return new Promise( (resolve, reject) => {
    this.model('Post').find({ author: uid }, function (err, posts) {
      
      if(err) {
        console.warn(' userSchema.statics.userPost EError', err);
          reject(err);
        } else if(posts) {
          console.log(' userSchema.statics.userPost OK', posts);
          resolve(posts); 
        } else {
          console.log('userSchema.statics.userPost No results');
          reject(err);
        }
    });
  });  
};

userSchema.statics.userPostErase = async function(uid) {
  console.log("userSchema.statics.userPostErase ", uid)
  //await this.model('Post').({ author: uid }).exec();
  return new Promise( (resolve, reject) => {
    this.model('Post').deleteMany({ author: uid }, function (err, posts) {
        if(err) {
          console.log(' userSchema.statics.userPost EError', err);
            reject(err);
          } else  {
            console.log(' userSchema.statics.userPost OK', posts);
            resolve(posts); 
          }
      })
  }) 
};


userSchema.pre('deleteOne', { query: true, document: false }, async function(next) {
  let uid = this.getQuery()['_id']
  console.log("deleteOne User post  that refers=  ",uid ,this);
  //await this.model('Post').deleteMany({ author: uid });

  return new Promise((resolve, reject) => {
    mongoose.model('Post').deleteMany({ author: uid }, function (err, results) {
      console.log(' Pre deleteOne results -->')
      if(err) {
        console.log(' Pre deleteOne results  EError', err);
        reject(err);
      } else  {
        console.log(' Pre deleteOne results OK', results);
        resolve("ok")
      }
    });
    //resolve("ok");
  });

});

userSchema.statics.create = function(dataEntity) {
  const new_entity = new this(dataEntity);
  return new_entity.save();
};

userSchema.statics.list = function(perPage, page) {
  return new Promise((resolve, reject) => {
    this.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function(err, entities) {
        if (err) {
          reject(err);
        } else {
          resolve(entities);
        }
      });
  });
};

userSchema.statics.total = function() {
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

userSchema.statics.removeById = function(id) {
  return new Promise((resolve, reject) => {
    this.deleteOne({ _id: id }, err => {
      if (err) {
        console.log("  removeById bad ", err)
        reject(err);
      } else {
        console.log("  removeById good ", err)
        resolve(err);
      }
    });
  });
};

userSchema.statics.patch = function(id, userData) {
 // delete userData["permissionLevel"];
  delete userData["id"];

  // needs to Ensure no collision
  return new Promise((resolve, reject) => {
    this.findById(id, function(err, user) {
      if (err) reject(err);
      for (let i in userData) {
        user[i] = userData[i];
      }
      user.save(function(err, updatedUser) {
        if (err) return reject(err);
        resolve(updatedUser);
      });
    });
  });
};

mongoose.model("User", userSchema);
