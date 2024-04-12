import mongoose from "mongoose";


const pdfSchema = new mongoose.Schema(
    {
  bookName: { 
    type: String, 
    required: true
     },

 description: { 
    type: String, 
    required: true 
    },

    bookImage :{
        type : String,
    },


  bookFile: {
     type: String, 
     required: true 
    },

  uploadedBy: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
    },
    
    accessCount: {
       type: Number, default: 0
       }
       ,
    genre: {
      type: String,
      required: true ,
      default: 'Unknown'
    },
    approved: {
      type: Boolean, 
      default: false 
    }
}
, { timestamps: true });

 export const Book = mongoose.model('Book', pdfSchema);

