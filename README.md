Kakao Mailer
===========

A simple form processing for static pages

How it works
------------

Register your info and get your token:

```bash
    $ curl --data "--data "email=<your-email>&name=<your-name>&url=<your-url-to-redirect>" http://kakaomailer.herokuapp.com/register
Token: 780a8a9b-dc2d-4a58-83ar-4deefe446dee 
```

Test (optional):

```bash
curl --data "email=<your_email>&name=<your_name>&message=<your_message>&subject=<your_subject>" http://kakaomailer.herokuapp.com/user/<token>
```


```html
<form action="https://kakaomailer.herokuapp.com/user/<token>" method="POST">
  Email: <input type="text" name="name"><br>
  Name: <input type="text" name="email"><br>
  Subject: <input type="text" name="subject"><br>
  Message: <textarea name="message" cols="40" rows="5"></textarea>
  <input type="submit" value="Send Message">
</form>

```

Deploying
---------

This app was built to be deployed to Heroku

```bash
	$ git clone git@github.com:g3ortega/kakaomailer.git
	$ heroku create
	$ heroku config:set MANDRILL_APIKEY=<key>
	$ heroku addons:add heroku-postgresql:dev
	$ heroku ps:scale web=1
```

