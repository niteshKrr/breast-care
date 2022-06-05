require('./conn/mongo')
const express = require('express');
const hbs = require('hbs');
const async = require('hbs/lib/async');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload');
const path=require('path')
const app = express()
const port = 5000

const Stories=require('./models/stories');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir : path.join(__dirname,'public/tmp')
}))
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res) => {
  res.render('index');
})

app.get('/yourstory', (req, res) => {
  res.render('yourstory');
})

app.get('/testimonials', (req, res) => {
  res.render('testimonials');
})

app.get('/testimonials/list',async(req,res)=>{
  try {
    const testimonials=await Stories.find();
    res.send(testimonials);
  } catch (error) {
    console.log(error);
  }
});

app.post('/yourstory', async (req, res) => {
  try {
    console.log(req.body);
    const story=await new Stories(req.body);
    story.save();
    console.log(story);
    res.render('yourstory')
  } catch (error) {

  }

})

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`)
})