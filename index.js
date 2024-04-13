const express = require('express');
const {connectToMongoDB} =require('./connect')
const app =express();
const routeUrl = require('./routes/url')
const URL = require('./models/url');
const { Timestamp } = require('bson');
const port=8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log('connected'))
.catch((error)=>console.log('error',error))

app.use(express.json())

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );
    
    // if (entry && entry.redirecturl) {
    //     res.redirect(entry.redirecturl);
    // } else {
    //     res.status(404).send("URL not found");
    //     // Or redirect to a default URL
    //     // res.redirect('your_default_url_here');
    // }
    res.redirect(entry.redirecturl)
});

app.use('/url',routeUrl);

app.listen(port,()=>console.log(`listen to Port ${port}`));
