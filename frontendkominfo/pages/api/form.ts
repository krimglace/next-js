import nodemailer from 'nodemailer';

function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  try{
    return res.redirect(307, `/logintry?id=${body.search}`)
  }catch(err){
    console.error(err)
  }
  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body)

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: `${body.search}` })
}

export default handler;