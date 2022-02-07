const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")

var sendMail = {
    send : function(toEmail, fromEmail, subject, html){
        if( toEmail == null )
        {
            return null;
        }

        const msg = {
            to: toEmail,
            from: fromEmail,
            subject: subject,
            html: html
        }

        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    }
}
module.exports = sendMail