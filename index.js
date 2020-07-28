const express = require('express');

const path = require('path');
const db= require('./config/mongoose');
// const port=8000;
const Contact=require('./models/contact');

const app=express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

var contactList=[
    {
        name:"mohit",
        phone: "2645121265"
    },
    {
        name:"whatever",
        phone:"451215481"
    },
    {
        name:"you",
        phone:"694125"
    }
]

app.use(express.urlencoded());
app.use(express.static('assests'));

app.get('/' , function(req,res){
    // console.log(__dirname);
    // res.send('yeah its working fine now , i think! lets check though n here it is - its working ');
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home', { 
            title: "My Contact List",
            contact_list: contacts
        });
    });
    
    
});
app.get('/delete-contact', function(req, res){
    // console.log(req.params);
    // let contactIndex=contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }
    let id=req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting from db');
            return;
        }
        return res.redirect('back');
    });
    
    

});
app.get('/practice',function(req,res){
    return res.render('practice',{title: "playing with ejs"});
})

app.post('/Add-contact', function(req,res){

    // contactList.push({
    //     name: req.body.name,
    //     phone:req.body.phone
    // })
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('error in creating contact');
        return; }

        // console.log('******', newContact);
        res.redirect('back');
    });

    // return res.redirect('/');

    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // return res.redirect('/practice');
});

//.listen(8000);

app.listen(9000,function(err){
    if(err){
        console.log('error in running the server' + err);
    }
    console.log('yupp! express server working at port ' + 9000);
});