"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');
const pdf2base64 = require('pdf-to-base64');

exports.handler = async(event, context) => {

    if (event.httpMethod == "OPTIONS") {
        return { statusCode: 200, headers, body: "OK" };
    }

    try {
        const client = await clientPromise;
        const data = JSON.parse(event.body);
        data._id = parseInt(data._id)
        console.log(event.body)

        let pp = pdf2base64(data.url)
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
        data.b64 = pp.toString();


        await client.db("articles").collection("papers").insertOne(data);

        return { statusCode: 200, headers, body: 'OK' };
    } catch (error) {
        console.log(error);
        return { statusCode: 422, headers, body: JSON.stringify(error) };
    }
};