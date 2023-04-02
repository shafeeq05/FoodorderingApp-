const scheema = require("../../model/addVendorScheema");
const bcript = require("bcrypt");
const salt = 10;

module.exports = {
  get: (req, res) => {
    res.send("200:ok , vendors");
  },
  //admin add the vendors
  post: async (req, res) => {
    const exist = await scheema.find({ v_username: req.body.username });
    const pwd = await bcript.hash(req.body.password, salt).then((pwd) => pwd);
    if (exist.length == 0) {
      await scheema({
        v_name: req.body.name,
        v_username: req.body.username,
        v_password: await pwd,
        v_phone: req.body.phone,
      }).save();
      res.send("200:ok , added vendor sucsessfully");
    } else {
      res.send(":error , username already exist");
    }
  },
  //admin update the vendor details
  put: async (req, res) => {
    const exist = await scheema.find({ v_username: req.body.username });
    const pwd = await bcript.hash(req.body.password, salt).then((pwd) => pwd);
    if (exist.length == 1) {
      await scheema.updateOne(
        { v_username: req.body.username },
        {
          v_name: req.body.name,
          v_password: await pwd,
          v_phone: req.body.phone,
        }
      );
      res.send('200:ok , sucsessfully updated the vendor details')
    }else(res.send('404:error , user not fount'))
  },
};
