const express = require('express');
const app = express();
const port = 80;
const bodyParser = require('body-parser');

const config = require('./config/key.js')

const { User } = require('./models/User.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const conn = require('./config/dev.js');
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('mongoDB Connected!'))
    .catch(error => console.log(error));

app.get('/', (request, response) => {
    response.send('hello react!');
});

app.post('/register', (request, response) => {
    const user = new User(request.body);

    user.save((error, userInfo) => {
        if (error) {
            return response.json({ success: false, error });
        }
        return response.status(200).json({
            success: true
        });
    });
});

app.post('/login', (request, response) => {
    data = {
        email: request.body.email
    }

    user.findOne(data, (error, user) => {
        if (!user) {
            return response.json({
                loginSuccess: false,
                message: "해당하는 이메일이 없습니다."
            })
        }

        user.comparePassword(request.body.password, (error, isMatch) => {
            if (!isMatch) {
                return response.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
            }

            user.generateToken((error, user) => {
                if (error) return response.status(400).send(error);
            });
        });
    });
});

app.listen(port, () => {
    console.log(`app start! port: ${port}`);
});