
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const cors = require('cors')({origin: true})
admin.initializeApp()

// Here we're using Gmail to send 

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alexander.v.grebennikov@gmail.com',
        pass: 'lasirenaverde'
    }
})

const readableDate = timestamp => {

    let date = new Date(timestamp + 10800000)

    let day = date.getDate()
    if(day.toString().length === 1) day = '0' + day

    let month = date.getMonth() + 1 
    if(month.toString().length === 1) month = '0' + month

    let hour = date.getHours()
    if(hour.toString().length === 1) hour = '0' + hour

    let minutes = date.getMinutes()
    if(minutes.toString().length === 1) minutes = '0' + minutes


    return(
        
                
                day + '.' +
                month + '.' + 
                date.getFullYear() + ' - ' +
                hour + ':' +
                minutes
                
         
    )}

exports.sendMail = functions.database.ref('/users/{uid}/{pushId}').onCreate((snapshot, context) => {
    

    const val = snapshot.val()

    
    // fomin@knopka-r.ru

    const mailOptions = {
        from: 'Новый заказ <order@knopka-r.ru>',  
        to: 'fomin@knopka-r.ru, a-greb@yandex.ru', 
        subject: `Новый заказ:  ${val.name}  ${readableDate(val.date)}`, 
        html: `<body style ="margin: auto; display: flex; align-items: flex-start; justify-content: center; ">

                <div style=" width: 600px;  display: flex; flex-direction: column;"> 
        
                <div style ="border: 2px solid #7f8fa6; border-radius: 20px; padding: 20px; background-color: ${val.color}; margin: 2px;
                color: white; font-weight: bold; font-family: Arial, Helvetica, sans-serif; font-size: 22px;">
                    ${val.type} - ${val.quantity} кг               
                </div>
    
                <div style ="border: 2px solid #7f8fa6; border-radius: 20px; padding: 20px; background-color: white; margin: 2px;
                color: black;  font-family: Arial, Helvetica, sans-serif; font-size: 15;
                background-image: url(https://knoprka-e6c2e.firebaseapp.com/assets/knp_backGb.png); background-size: 75px 75px; ">
                <p style="font-size: 22px;  margin: 0"><b>${val.name}</b></p>
                    ${readableDate(val.date)}<br><br>
                    ${val.email}<br>
                    ${val.phone}<br>
                    ${val.address}<br>
                    ${val.floor} этаж - лифт: ${val.lift ? 'есть' : 'нет'}<br><br>
                    <b>ВЫВОЗ: </b>${readableDate(val.removalDate)} 
    
    
                </div>

                <div style="text-align: center;
                font-family: Arial, Helvetica, sans-serif; margin: 5px;
                font-size: 12px;">
                    это автоматическое письмо - не отвечайте
                </div>
            
                </div>
            </body>
            ` 
    }

    return transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error)
        }
        console.log('Заказ отправлен: имя: ' + val.name + ' | ' + info.response)
    })
})

exports.addAdmin = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {
        return {
            message: `АДМИНИСТРАТОР: ${data.email}`
        }
    }).catch(err => {
        return err
    })
})