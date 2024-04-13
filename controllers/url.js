const shortid=require('shortid')
const URL=require('../models/url');
const { json } = require('body-parser');

async function handleGenerateNewShortUrl(req,res){
      const body = req.body;

       const shortID=shortid();
       if(!body.url) return res.status(400).json({error:'url is required'});
       await URL.create(
        {   shortId: shortID,
            redirecturl:body.url,
            visitHistory:[],
         }
       );
       return res.json({id:shortID});
}

module.exports = {handleGenerateNewShortUrl}