const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')


const app = express() 

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = 'mongodb+srv://Chiz:Chir@2000@cluster0-jgcxi.mongodb.net/test?retryWrites=true&w=majority'
var client;


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/todo', (req, res) => {
    const collection = client.db("test").collection("todos")
    collection.find().toArray(function (err, results) {
      if (err) {
        console.log(err)
        res.send([])
        return
      }
      
      res.send(results)
    })
  })


  var mongoClient = new MongoClient(uri, { reconnectTries : 
  Number.MAX_VALUE, autoReconnect : true, useNewUrlParser : true }) 
  mongoClient.connect((err, db) => {
    if (err != null) {
      console.log(err)
      return
    }
    client = db
  })


  app.post('/addTodo', (req, res) => {
    const collection = client.db('test').collection('todos')
    var todo = req.body.todo // parse the data from the request's body
    collection.insertOne({title: todo}, function (err, results) {
      if (err) {
        console.log(err)
        res.send('')
        return
      }
      res.send(results.ops[0]) 
    })
  })

  app.post('/deleteTodo', (req, res) => {
    const collection = client.db('test').collection('todos')
    collection.removeOne({'_id': mongo.ObjectID(req.body.todoID)},   function (err, results) {
      if (err) {
        console.log(err)
        res.send('')
        return
      }
      res.send() 
    })
  })

app.listen(process.env.PORT || 8080)