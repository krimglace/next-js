import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const KEY = 'pusatlayanankominfo'

export default function (req: NextApiRequest, res: NextApiResponse){
  
  if(!req.body){
    res.statusCode = 404
    res.end('Error')
    // return
  }
  const{ email, password, codeToken } = req.body
  res.json({
    token: jwt.sign({
      email, password, codeToken,
      userLogin: email === email && password === password && codeToken === 'layanankominfo'
    }, KEY),
    email, password, codeToken
  })
}