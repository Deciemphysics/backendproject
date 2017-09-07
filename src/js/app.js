const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express()

const port = 5000;
const userRouter = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ exended: true }));
app.use(session({
  secret: 'janky potato child',
  cookie: { maxAge:300000 }  
}))



app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'pug');

userRouter.route('/add')
  .get(function(req, res){
    if (!req.session.users) {
      req.session.users = [];
    }
    res.render('index', {users: req.session.users});
  })
  .post(function(req, res){
    console.log('Push initiated');
    let userName = req.body.name;
    let userEmail = req.body.email;
    let userAge = req.body.age;
    let user = {
      name: userName,
      email: userEmail,
      age: userAge
    }
    if (!req.session.users) {
      req.session.users = [];
    }
    req.session.users.push(user);
    res.send(req.session.users);
  });

userRouter.route('/')
  .get(function(req, res){
    if (!req.session.users) {
      req.session.users = [];
    }
    res.render('users', {users: req.session.users});
  })
  .post(function(req, res){
    console.log('Push initiated');
    let userName = req.body.name;
    let userEmail = req.body.email;
    let userAge = req.body.age;
    let user = {
      name: userName,
      email: userEmail,
      age: userAge
    }
    if (!req.session.users) {
      req.session.users = [];
    }
    req.session.users.push(user);
    res.redirect('/');
  });
;

userRouter.route('/del:id')
  .post(function(req,res){
    let id = req.params.id;
    let userId;
    for (let user of req.session.users) {
      if (user.name == id){
        userId = req.session.users.indexOf(user);
      }
    };
    req.session.users.splice(userId, 1);
    res.redirect('/');    
  })

userRouter.route('/:id')
  .get(function(req,res){
    let id = req.params.id;
    let userId;
    for (user of req.session.users) {
      if (user.name == id){
        userId = req.session.users.indexOf(user);
      }
    };
    res.render('edit', {userId: userId, users: req.session.users});
  })
  .post(function(req,res){
    let id = req.params.id;
    let userId;
    console.log(req.session.users);
    for (let user of req.session.users) {
      if (user.name == id){
        userId = req.session.users.indexOf(user);
      }
    };
    let userName = req.body.name;
    let userEmail = req.body.email;
    let userAge = req.body.age;
    let user = {
      name: userName,
      email: userEmail,
      age: userAge
    }
    req.session.users[userId] = user;
    res.redirect('/');    
  })
  ;

app.use('/', userRouter);

app.listen(5000, function(err){
  console.log('running server on port ' + port);
});

