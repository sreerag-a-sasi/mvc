// const dayjs = require('dayjs');
// const fs = require('fs');

// exports.fileUpload = async function (file, directory) {
//     return new Promise((resolve, reject)=> {
//         try {
//             console.log("file : ", file);

//             if(file) {
//                 let mime_type = file.split(';')[0].split(':')[1].split('/')[1];
//                 console.log("mime_type : ",mime_type);

//                 if(mime_type === 'mp4'||'png' || 'jpg' || 'jpeg' || 'pdf') {
//                     console.log("Allowed file type");

//                     console.log("Math.random : ", Math.random() * 100)
//                     let file_name = dayjs() + String(Math.floor(Math.random() * 100)) + '.' + mime_type;
//                     console.log("file_name : ", file_name);

//                     let upload_path = `uploads/${directory}`;

//                     let base64 = file.split(';base64,').pop();
//                     console.log("base64 : ", base64);

//                     fs.mkdir(upload_path, {recursive : true},(err)=> {
//                         if(err) { 
//                             console.log("err : ",err);
//                             reject(err.message ? err.message : err);
//                         }else{
//                             let upload_path = `uploads/${directory}/${file_name}`;
//                             console.log("upload_path : ", upload_path);

//                             fs.writeFile(
//                                 upload_path,
//                                 base64,
//                                 {encoding : 'base64'},
//                                 function (err) {
//                                     if(err) {
//                                         console.log("err :",err);
//                                         reject(err.message ? err.message : err);
//                                     }else{
//                                         resolve(upload_path);
//                                     }
//                                 }
//                             )
//                         }
//                     })
//                 }else{
//                     reject("file size up to 100mb and Formats .mp4 .png .jpg .jpeg .pdf are only allowed");
//                 }
//             }else{
//                 reject("file is required");
//             }
//         } catch (error) {
//             console.log("error : ", error);
//             reject(error);
//         }
//     })
// }


const dayjs = require('dayjs');
const fs = require('fs');

exports.fileUpload = async function (file, directory) {

    return new Promise((resolve, reject)=> {
        try {

            // console.log("file : ", file);

            if(file) {
                let mime_type = file.split(';')[0].split(':')[1].split('/')[1];
                console.log("mime_type : ", mime_type);

                if(mime_type === 'mp4' || 'png' || 'jpg' || 'jpeg' || 'pdf') {
                    console.log("Allowed file type");

                    console.log("Math.random : ", Math.random() * 100)
                    let file_name = dayjs() + String(Math.floor(Math.random() * 100)) + '.' + mime_type;
                    console.log("file_name : ", file_name);

                    let upload_path = `uploads/${directory}`;

                    let base64 = file.split(';base64,').pop();
                    console.log("base64 : ", base64);

                    fs.mkdir(upload_path, {recursive : true},(err)=>{
                        if(err) {
                            console.log("err : ", err);
                            reject(err.message ? err.message : err);
                        }else {
                            let upload_path = `uploads/${directory}/${file_name}`;
                            console.log("upload_path : ", upload_path);

                            fs.writeFile(
                                upload_path,
                                base64,
                                {encoding : 'base64'},
                                function (err) {
                                    if(err) {
                                        console.log("err : ", err);
                                        reject(err.message ? err.message : err);
                                    }else {
                                        resolve(upload_path);
                                    }
                                }
                            )
                        }
                    })
                }else {
                    reject("File size up to 100mb and Formats .mp4 .png .jpeg .jpg .pdf are only allowed");
                }
            }else {
                reject("File is required");
            }
            
        } catch (error) {
            console.log("error :  ", error);
            reject(error);
        }
    })
}