
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')


const serviceAccount = require("./knoprka-e6c2e-firebase-adminsdk-t8y97-854aa5a381.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://knoprka-e6c2e.firebaseio.com"
  })


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'knopkarecycling@gmail.com',
        pass: 'Knopka-R2222'
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
        from: 'Кнопка Ресайклинг <no-reply@knopka-r.ru>',  
        to: 'fomin@knopka-r.ru', 
        subject: `Заявка на вывоз:  ${val.type} - ${val.quantity} кг`, 
        html: `<body style ="margin: auto; display: flex; align-items: flex-start; justify-content: center; ">

                <div style=" width: 600px;  display: flex; flex-direction: column;"> 
        
                <div style ="border: 2px solid #7f8fa6; border-radius: 20px; padding: 20px; background-color: ${val.color}; margin: 2px;
                color: white; font-weight: bold; font-family: Arial, Helvetica, sans-serif; font-size: 22px;">
                    ВИД СЫРЬЯ: ${val.type} - ${val.quantity} кг               
                </div>
    
                <div style ="border: 2px solid #7f8fa6; border-radius: 20px; padding: 20px; background-color: white; margin: 2px;
                color: black;  font-family: Arial, Helvetica, sans-serif; font-size: 15;
                background-image: url(https://knoprka-e6c2e.firebaseapp.com/assets/knp_backGb.png); background-size: 75px 75px; ">
                Дата заказа: ${readableDate(val.date)}<br><br>
                <p style="font-size: 22px;  margin: 0"><b>Имя: ${val.name}</b></p>
                  
                    E-mail: ${val.email}<br>
                    Телефон: ${val.phone}<br>
                    Адрес вывоза: ${val.address}<br>
                    ${val.floor} этаж - лифт: ${val.lift ? 'есть' : 'нет'}<br><br>
                    <b>Желаемая дата вывоза: </b>${readableDate(val.removalDate)} 
    
    
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

    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        const result = 'Заказ отправлен: имя: ' + val.name + ' | ' + info.response
        console.log(result)
        return result
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

exports.userList = functions.https.onCall((data, context) => {
    
    const isAdmin = context.auth.token.admin === true
    if (!isAdmin) {
      return { error: `Unauthorized` }
    }
  
    return admin
      .auth()
      .listUsers()
      .then((listUsersResult) => {
          
        const result = listUsersResult.users.map(user => {
            
          const { uid, email, photoURL, displayName, disabled } = user
          
          return { uid, email, photoURL, displayName, disabled }
        })
  
        return { result }
      })
      .catch((error) => {
        return { error: 'Error listing users' }
      })
  })



  exports.sendConfMail = functions.https.onCall((data, context) => {

    const mailOptions = {
        from: 'Кнопка Ресайклинг <noreply@knopka-r.ru>',  
        to: `${data.email}`, 
        subject: `Ваш заказ от ${readableDate(data.date)} принят`, 
        html:`<body style ="margin: auto; display: flex; align-items: flex-start; justify-content: center; ">

        <div style=" width: 600px;  display: flex; flex-direction: column;"> 
   

        <div style ="border: 2px solid #7f8fa6; border-radius: 20px; padding: 20px; background-color: white; margin: 2px;
        color: black;  font-family: Arial, Helvetica, sans-serif; font-size: 15;
        background-image: url(https://knopka-r-site.firebaseapp.com/assets/knp_backGb.png); background-size: 75px 75px; ">
        <img src='https://knopka-r-site.web.app/assets/knp-app.png' width="100" height="100">     
        <p style="font-size: 22px;  margin: 0"><b>Здравствуйте, ${data.name}!</b></p>
            Ваш заказ от ${readableDate(data.date)} принят<br>
            Ожидайте звонка оператора для подтверждения заказа<br>
            и уточнения даты вывоза<br><br>
            Подробности заказа:<br>
            Вид сырья: ${data.type} - ${data.quantity} кг<br>
            E-mail: ${data.email}<br>
            Телефон: ${data.phone}<br>
            Адрез вывоза: ${data.address}<br>
            ${data.floor} этаж - лифт: ${data.lift ? 'есть' : 'нет'}<br><br>
            С уважением,<br>
            команда Кнопка Ресайклинг<br>


        </div>

        <div style="text-align: center;
        font-family: Arial, Helvetica, sans-serif; margin: 5px;
        font-size: 12px;">
            это автоматическое письмо - не отвечайте
        </div>
    
        </div>
    </body>`
    }

    const isAdmin = context.auth.token.admin === true

    if (!isAdmin) {
      return { error: `Unauthorized` }
    }

    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        const result = 'Заказ отправлен: имя: ' + data.name + ' | ' + info.response
        console.log(result)
        return info
    })
  })