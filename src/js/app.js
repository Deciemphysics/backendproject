const express = require('express');

const app = express();

const port = 5000;
const userRouter = express.Router();

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'pug');

userRouter.route('/')
  .get(function(req, res){
    res.render('index', {list:['a','b']});
  });

userRouter.route('/users')
  .get(function(req, res){
    res.render('users');
  });

userRouter.route('/edit')
  .get(function(req,res){
    res.send('Hello Edit');
  });

app.use('/', userRouter);

app.listen(5000, function(err){
  console.log('running server on port ' + port);
});

