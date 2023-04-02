const scheema = require("../../model/itemScheema");

module.exports = {
  //admin show catogery
  get: (req, res) => {
    res.send("catogerys");
  },
  //admin add catogery
  post: async (req, res) => {
    const exist = await scheema.find({ i_code: req.body.code });
    if (exist.length == 0) {
      await scheema.insertMany({
        i_name: req.body.itemname,
        i_catogery: req.body.itemcatogery,
        i_code: req.body.itemcode,
      });
      res.send("200:ok , item added sucsessfully");
    } else {
      res.send("409:error , item already exist");
    }
    
  },
  //admin edit catogery
  put:async (req, res) => {
    const exist = await scheema.find({i_code:req.body.itemcode}) 
    if(exist.length == 1){
        await scheema.updateOne({i_code:req.body.itemcode},{i_name:req.body.itemname,i_catogery:req.body.itemcatogery})
        res.send('200:ok , item updated scsussfully')
    }else{
        res.send("404:error , item not exist");

    }
  },
  //admin delete catogery
  delete:async (req, res) => {
    const exist = await scheema.find({i_code:req.body.itemcode}) 
    if(exist.length == 1){
        await scheema.deleteOne({i_code:req.body.itemcode})
    res.send("200:0k , deleted catogery sucsessfully");
    }else{
        res.send('404:error , item not fount')
    }
  },
};
