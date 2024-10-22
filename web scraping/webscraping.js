const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const jsdom = require("jsdom");

const fs = require('fs');
const { JSDOM } = jsdom;
const app = express();
const port = 3000;
app.use(express.json()); 

let textFind = [];
let flagtext = [];
let urlVisited = [];
let urlNotVisited = [];

async function find(url) {
    try {
        urlVisited.push(url);
        const html = await new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) {
                    reject(error);
                } else if (response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(new Error(`Status Code: ${response.statusCode}`));
                }
            });
        });

        const $ = cheerio.load(html);

        // Get all anchor tags
        const allAnchorTags = $('a');

        // Find all elements containing "$"
        $('body').find('*').filter((i, el) => {
            const text = $(el).text().trim();
            if (text.includes('$')) {
                let a = text.substr(text.indexOf("$"), 9);
                if (textFind.indexOf(a) === -1 && /^[a-zA-Z]+$/.test(a[1])) {
                    textFind.push(a);
                    flagtext.push(a);
                    // console.log('ddeee',flagtext.length == 50, flagtext.length,textFind.length);
                    if(flagtext.length == 50){
                        flagtext = [];
                        try {
                            console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHH');
                            fs.writeFile('example.txt',  textFind.toString(), (err) => {
                                if (err) {
                                    console.error('Error writing to file', err);
                                } else {
                                    console.log('File written successfully');
                                }
                            });
                        } catch (err) {
                            console.error('Error writing to file', err);
                        }
                    }
                }
            }
        });

        // Extract URLs and add to not-visited list
        $('a').each((i, el) => {
            let href = decodeURI($(el).attr('href'));
            if (urlVisited.indexOf(href) === -1 && href && href.includes("docs/manual/")) {
                if(!href.includes(url)){
                    let newUrl = url.replace('/docs/manual/','');
                    href = newUrl+href
                    // href = href.replace("/","/")
                }
                urlNotVisited.push(decodeURI(href));
            }
        });

        return '2';
    } catch (err) {
        console.error('Error:', err);
        return '1';
    }
}

async function f(url) {
    urlNotVisited.push(url);
    while (urlNotVisited.length > 0) {
        const nextUrl = urlNotVisited.shift();
        await find(nextUrl);
        console.log('urlNotVisited',nextUrl);
    }
}

app.post('/', async (req, res) => {
    await f(req.body.url);
    // console.log('Finished processing URLs');
    res.send({ textFind });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
