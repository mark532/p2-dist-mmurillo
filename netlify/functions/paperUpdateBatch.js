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
        const id = parseInt(event.path.split("/").reverse()[0]);
        const data = JSON.parse(event.body);
        console.log(event.body)

        data.b64 = await pdf2base64(data.url)
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

        await client.db("articles").collection("papers").updateOne({ _id: id }, { $set: data });

        return { statusCode: 200, headers, body: 'OK' };
    } catch (error) {
        console.log(error);
        return { statusCode: 422, headers, body: JSON.stringify(error) };
    }
};