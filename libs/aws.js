import multerS3 from 'multer-s3-transform';
import aws from 'aws-sdk';
import multer from 'multer';
import tinify from "tinify";
import fs from 'fs'
import sharp from 'sharp'

tinify.key = process.env.TINYPNG_KEY;

require('dotenv').config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET
});

const s3 = new aws.S3();

const dateNow = Date.now().toString()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'reddex',
    shouldTransform: true,
    transforms: [{
      id: 'original',
      key: async function (req, file, cb) {
        const fullPath = `${dateNow}_${file.originalname}/original-${file.originalname}`;
        cb(null, fullPath)
      },
      transform: function (req, file, cb) {
        cb(null, sharp().jpeg())
      }
    },
    {
      id: 'thumbnail',
      key: function (req, file, cb) {
        cb(null, `${dateNow}_${file.originalname}/thumbnail-${file.originalname}`)
      },
      transform: function (req, file, cb) {
        cb(null, sharp().resize({
          width: 400,
          fit: 'cover'
        }).jpeg({
          quality: 90,
          chromaSubsampling: '4:4:4'
        }))
      }
    }]
  }),
  files: 1,
  fileSize: 2000000,
  fileFilter: (req, file, cb) => {
    let isFinished = 0;
    const acceptedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg"
    ];

    for ( let i = 0; i < acceptedMimeTypes.length; i++ ) {
      if ( file.mimetype === acceptedMimeTypes[i] ) {
        isFinished = 1;
        return cb(null, true);
      }  
    }

    if ( isFinished === 0 ) {
      cb(null, false);
    }
  }
});

const deleteObject = (url) => {
  const regex = /(?<=\/)[\d][\S][^\/]+/gim;
  const key = url.match(regex).toString();

  var params = {
    Bucket: process.env.AWS_BUCKET,
    Prefix: key,
    MaxKeys: 2
  }
  
  s3.listObjectsV2(params, (err, data) => {
    if ( err ) return console.log(err)

    params = {
      Bucket: process.env.AWS_BUCKET
    }
    params.Delete = {Objects:[]};

    data.Contents.forEach(x => {
      params.Delete.Objects.push({Key: x.Key})
    })

    s3.deleteObjects(params, (err, data) => {
      if (err) return false;

      return true;
    })
  })
}

module.exports = {
  upload,
  deleteObject
};