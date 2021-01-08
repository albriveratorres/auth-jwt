const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to API'
    });
});

app.post('/api/post', verifiToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, autData) =>{
        if(err){
            res.sendStatus(403);
        }else{
           res.json({
                message: 'post created ...',
                autData
            }); 
        }
    });
    
});

app.post('/api/login', (req,res) => {
    const user = {
        id:1,
        username: 'eddy',
        email: 'alb.riveratorres@gmail.com'
    };

    jwt.sign({user}, 'secretkey', { expiresIn: '1h'}, (err, token) => {
        res.json({
            token
        })
    });
});

// Authorization: Bearer <token>
function verifiToken(req, res, next) {
    const bearer = req.headers['authorization'];

    if(typeof bearer !== 'undefined'){
        const bearerToken = bearer.split(' ')[1]//esta llamando al metodo split de la cadena Bearer <token> especificamente a token
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(3000, () => {
    console.log('Server on Port 3000')
})