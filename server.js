// Node.js with Express Server
// const datauri = require("datauri")
// const mysql = require('mysql');
// const path = require('path');
// const fs = require("fs")


import datauri from 'datauri'
import mysql from 'mysql'
import path from 'path'
import fs from 'fs/promises'


const files = await fs.readdir(`./uploadFolder`, {recursive:true});

// console.log(files);
// console.log(files.length);

// Set up a MySQL connection pool
const pool = mysql.createPool({
    host: '192.168.0.80',
    user: 'wztpc',
    password: 'wzt@kol@390',
    database: 'modbus'
});


files.forEach(async file=>{
    let img = await datauri(`./uploadFolder/${file}`)
    // console.log(img)
    
    const imageBuffer = img;
    const imageName = file;
    const imageCategory = 'objects';

    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const testQuery = `SELECT imageName FROM scada_images WHERE imageName = "${imageName}";`
        connection.query(testQuery,(queryErr,results)=>{
            console.log(testQuery)
            console.log(results);
            console.log(results.length);

            if(results.length == 0){
                // Insert the image data into the database
                const query = 'INSERT INTO scada_images (imageBlob, imageName, imageCategory) VALUES (?, ?, ?)';
                connection.query(query, [imageBuffer, imageName, imageCategory], (queryErr, results) => {
                    connection.release();
                    
  

                });
            }

            
        })


        
    });

})







    // const imageBuffer = req.file.buffer;
    // const imageName = req.file.originalname;
    // const imageCategory = 'object';

    // pool.getConnection((err, connection) => {
    //     if (err) {
    //         // res.status(500).json({ error: 'Internal Server Error' });
    //         return;
    //     }

    //     // Insert the image data into the database
    //     const query = 'INSERT INTO scada_images (imageBlob, imageName, imageCategory) VALUES (?, ?, ?)';
    //     connection.query(query, [imageBuffer, imageName, imageCategory], (queryErr, results) => {
    //         connection.release();


    //     });
    // });


