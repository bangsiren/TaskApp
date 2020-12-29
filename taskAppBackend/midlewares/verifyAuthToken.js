const jwt = require('jsonwebtoken');

const verifyAuthToken = (req,res,next) => {   
      // console.log(req.headers)
      let token = null;
      console.log(req.headers)
      if(req.headers.authorization){
          token = req.headers['authorization'];
      }else {
        return res.status(401).send({message: 'Unauthorize Access'})
      }
      
      try {
        let decoded = jwt.verify(token,'BANGSI')
        let fullName = decoded.fullName;
        req.headers.author = fullName;
        next();
      } catch (error) {
        return res.status(401).send({message: 'Unauthorize Access'})
      }
} 


module.exports = verifyAuthToken;