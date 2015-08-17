var express = require('express');
var app = express();
var fs = require('fs');
var sm = require('sitemap');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


app.use("/styles", express.static(__dirname + '/../public/stylesheets'));
app.use("/scripts", express.static(__dirname + '/../public/javascripts'));
app.use("/images", express.static(__dirname + '/../public/images'));
app.use("/fonts", express.static(__dirname + '/../public/fonts'));
app.use("/data", express.static(__dirname + '/../data'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Sitemap
var sitemap = sm.createSitemap({
    hostname: 'http://yourdomain.com',
    cacheTime: 600000, // 600 sec - cache purge period 
    urls: [{
            url: '/',
            changefreq: 'monthly',
            priority: 0.7
        }, {
            url: '/skills',
            changefreq: 'monthly',
            priority: 0.7
        }, {
            url: '/experiences',
            changefreq: 'monthly',
            priority: 0.7
        }, {
            url: '/contact',
            changefreq: 'monthly',
            priority: 0.7
        },

    ]
});
app.get('/sitemap.xml', function(req, res) {
    sitemap.toXML(function(xml) {
        res.header('Content-Type', 'application/xml');
        res.send(xml);
    });
});

//Robots.txt
app.get('/robots.txt', function(req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /\nSitemap: http://ogpoyraz.com/sitemap.xml");
});

//Contact Form
app.post("/contact", function(req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'yourmail@gmail.com',
            pass: 'yourpassword'
        }
    });
    var htmlStr = "<table>"
    		+"<tr><td>İsim: </td><td>" + req.body.name +"</td></tr>"
    		+"<tr><td>Mail: </td><td>" + req.body.email +"</td></tr>"
    		+"<tr><td>Konu: </td><td>" + req.body.subject +"</td></tr>"
    		+"<tr><td>Mesaj: </td><td>" + req.body.message +"</td></tr>" + "</table>";

    //Mail options
    var mailOptions = {
        from: req.body.name+' ✔ <'+req.body.email+'>',
        to: 'yourmail@gmail.com',
        subject: 'yourdomain.com Contact Form - '+req.body.subject, 
        html: htmlStr // html body
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
        	res.redirect("/contact#problem-sending-mail");
        }
        else{
        	res.redirect("/contact#thank-you");
        }
    });
});


app.get('/', function(req, res) {
    res.render('pages/index');
});
app.get('/skills', function(req, res) {
    res.render('pages/skills');
});
app.get('/experiences', function(req, res) {
    res.render('pages/experiences');
});
app.get('/contact', function(req, res) {
    res.render('pages/contact');
});



// app.get('/interest', function(req, res) {
//     res.render('pages/interests');
// });
// app.get('/login', function(req, res) {
//     res.render('pages/login');
// });
// app.get('/about', function(req, res) {
//     res.render('pages/about');
// });

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res) {
    res.render('pages/singles/404');
});
app.listen(80);
