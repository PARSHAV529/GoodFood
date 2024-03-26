
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')


cloudinary.config({
    cloud_name: 'Ydrsuf7z53',
    api_key: '535112157722962',
    api_secret: 'dEPO-uMbuFRnL0ZLxtWjpXKgj58'
  });
const uploads = (buffer) =>{
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
      streamifier.createReadStream(buffer).pipe(stream);
    });
}
module.exports = uploads