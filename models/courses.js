const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  category: {
    enum: ["DIGITAL_MARKETING","E_COMMERCE","CYBER_SECURITY","WEB_DEVELOPMENT"],
  },
  created_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
  },
  status:{
    type:String,
    enum:['ACTIVE','INACTIVE','PENDING','REJECTED'],
    default:'ACTIVE',
  }
});
// courseSchema.pre('save',async (next)=>{

  
//   try {
//     if(this.name){
//       this.slug =process.env.BASEURL+ '/'+ this.category+'/'+this.name.toLowerCase().replace(/\s/g, '-');
//     }else{
//       this.slug = process.env.BASEURL+ '/'+ this.category+'/'+'BQ'.toLowerCase().replace(/\s/g, '-'); 
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });


const Courses = mongoose.model('Courses', courseSchema);

module.exports = Courses;
