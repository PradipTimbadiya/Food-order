require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.APIKEY, 
    api_secret: process.env.APISECRET 
})

exports.uploads = async function uploads(file,folder){
    const result = await cloudinary.uploader.upload(file,{folder:folder,overwrite:true});
    return result;
}

exports.destroy = async function destroy(publicUrl){
    const result = await cloudinary.uploader.destroy(publicUrl);
    return result;
}