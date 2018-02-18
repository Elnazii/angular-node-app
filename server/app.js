var restify = require('restify');
var fs = require('fs');
var nodemailer = require('nodemailer');

var server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());
server.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const sampleUsers = [];

server.opts(/\.*/, function (req, res, next) {
    res.send(200);
    next();
});
server.get('/users/', function(req, res) {
    res.send(sampleUsers);
});

server.post('/user/add', function(req, res) {
    sampleUsers.push(req.body);
    res.send("User has been added");
});

server.post('/login', function (req,res) {
    const userInfo = req.body || {};
    if (!userInfo.email){
        res.send("Email is invalid.");
        return;
    }
    if (!userInfo.password){
        res.send("Password is invalid.");
        return;
    }
    for (let user of sampleUsers){
        if(user.email.toUpperCase() === userInfo.email.toUpperCase() && user.password === userInfo.password){
            res.send('Login succeed');
            return;
        }
    }

    res.send("Email or password is invalid.");

});


server.post('/signup', function(req, res){
    const validationResult = validation(req.body);
    if (validationResult){
        res.send(validationResult);
        return;
    }
    const data = formatData(req.body);
    saveData(data);
    sendEmail(data);
    res.send("Your information has been successfully added.");
});

const saveData = function (data) {
    // savde into file
    fs.appendFile("./data/users.txt", data , function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

}

const sendEmail = function (data) {
    nodemailer.createTestAccount((err, account) => {
        const GMAIL_FROM = 'user@gmail.com';

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_FROM, // generated ethereal user
                pass: 'pass'  // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: GMAIL_FROM, // sender address
            to: 'reciever@gmail.com', // list of receivers
            subject: 'subject', // Subject line
            text: data, // plain text body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}
const formatData = function (data) {
    let formattedData = '';
    formattedData += 'Name: ' + data.name + '\n';
    formattedData += 'Email: ' + data.email + '\n';
    formattedData += 'Country: ' + data.country + '\n';
    formattedData += 'Mobile: ' + data.mobile + '\n';
    formattedData += 'Skill: ' + data.skill + '\n';
    formattedData += 'Date: ' + new Date() + '\n';
    formattedData +=  '-------------------------\n';

    return formattedData;
}

const validation = function (data) {
    if (!data.name){
        return "Name is not valid."
    }
    if (!data.email){
        return "Email is not valid."
    }
    if (!data.country){
        return "Country is not valid."
    }
    if (!data.mobile){
        return "Mobile is not valid."
    }
    if (!data.skill){
        return "Skill is not valid."
    }
    return null;
}


server.listen(8000, function() {
    console.log('%s listening at %s', server.name, server.url);
});