const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors())
app.use(express.json())

app.get('/',(req,res) => {
    res.send('The server Home page')
})




const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://RomjanHossain:Y3WXHmu0y1JkUscI@cluster0.4ievbno.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
   
    await client.connect();


    const blogsDB = client.db("dental").collection("dentalBlogs");


    app.get('/blogs',async(req,res) => {
        const result = await blogsDB.find().sort({date : -1}).toArray();
        res.send(result);
    })


    app.get('/blog',async(req,res) => {
      const id = req.query.id;
      const query = {_id : new ObjectId(id)}
      const result = await blogsDB.findOne(query)
      res.send(result);
    })
    



    
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);









app.listen(port,() => {
    console.log('the sever is running.')
})