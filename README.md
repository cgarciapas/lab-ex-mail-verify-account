Add `.env` file with same keys as `.env.example` file.

Add your Gmaps api key in `views/layout.hbs`

---

Verify account after create user.

__1.__ Add `verified` field to user model (Boolean, default false)

Do not allow users to sign in if they aren't verified! Check passport config :)

__2.__ Add `token` field to user model. Initialite it to a random token string in usersController.doCreate
(check crypto npm library)

__3.__ Send mail after user creation:

`npm i nodemailer`

Check this example

```
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ironhacker@gmail.com',
    pass: process.env.MAIL_PASSWORD
  }
});

transporter.sendMail({
  from: '"My Awesome Project 👻" <ironhacker@gmail.com>',
  to: 'ironhacker2@gmail.com', 
  subject: 'Awesome Subject',
  text: 'Awesome Message',
  html: '<b>Awesome Message</b>'
})
.then(info => console.log(info))
.catch(error => console.log(error))

```

Think about the email text!

__4.__ Add /users/verify route and usersController.verify method

Find user by token and update `verified` field!
