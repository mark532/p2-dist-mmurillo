"use strict"
const headers = require('./headersCORS');
const pdf2base64 = require('pdf-to-base64');

const pp = "";



exports.handler = async(event, context) => {

    if (event.httpMethod == "OPTIONS") {
        return { statusCode: 200, headers, body: "OK" };
    }

    try {
        //const client = await pdf2base64;
        const data = JSON.parse(event.body);

        const client = await pdf2base64(data.url)
            .then(
                (response) => {
                    return response; //cGF0aC90by9maWxlLmpwZw==
                }
            )
            .catch(
                (error) => {
                    console.log(error); //Exepection error....
                }
            )

        return { statusCode: 200, headers, body: JSON.stringify(client) };
    } catch (error) {
        console.log(error);
        return { statusCode: 400, headers, body: JSON.stringify(error) };
    }
};