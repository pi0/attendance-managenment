const otplib = require('otplib').default
const express = require('express')
const bodyParser = require('body-parser')
const {
  Device,
  User,
  Session,
  Log
} = require('./db')


const app = module.exports = express()

app.use(bodyParser.json())

app.listen(4000)
console.log('API Server listening on 4000')

// --------------------------------
// /api/new_dev : Creates new Device
// --------------------------------

//TODO: make random secret
app.post('/api/devices/new', async(req, res) => {
  var dev = new Device({
    name: req.body.name,
    secret: 'GFJXE6STPBNFKS2EJBXESMLPN52FI4LC'
  });

  await dev.save()
  res.end('new device has been added')

})

// --------------------------------
// /api/devices : List all devices
// --------------------------------
app.get('/api/devices', async(req, res) => {
  let devices = await Device.find({})
  res.json(devices)
})

// --------------------------------
// /api/new_user : Creates new User
// --------------------------------
app.post('/api/users/new', async(req, res) => {
  var user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username
  });

  await user.save()
  res.end('new user has been added')

})
// --------------------------------
// /api/users : List all users
// --------------------------------
app.get('/api/users', async(req, res) => {
  let users = await User.find({})
  res.json(users)
})

// --------------------------------
// /api/editusers : edit users
// TODO: edit user
// -------------------------------- 
app.get('/api/users/edit', async(req, res) => {
  let users = await User.find({})
  res.json(users)
})

// --------------------------------
// /api/verifyotp : verify OTP
// --------------------------------
app.post('/api/otp/verify', async(req, res) => {

  const {
    username,
    otp
  } = req.body;

  let devices = await Device.find({})
  let device = devices.find(d => d.otp === otp)

  if (!device) {
    return res.json({
      error: 'Invalid Code! (device not found)'
    })
  }

  // Find the session
  async function getSession(date, deviceId) {

    date = new Date(date)
    day = date.getDay()
    hour = date.getHours()

    console.log(day, hour)

    let session = await Session.findOne({
      times: {
        $elemMatch: {
          day: day,
          from: {
            $lt: hour
          },
          to: {
            $gt: hour
          },
        }
      },
      devices: deviceId
    })

    console.log(session)
    return session
  }

  let session = await getSession(Date.now(), device._id)
  console.log(session)


  var log = new Log({
    type: 'check in',
    device_id: device._id,
    session: session
  });

  await log.save()


  return res.json({
    device
  })
})

// --------------------------------
// /api/logs : List all logs
// --------------------------------
app.get('/api/logs', async(req, res) => {
  let logs = await Log.find({})
  res.json(logs)
})
