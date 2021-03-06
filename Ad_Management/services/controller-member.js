const dbController = require("./db-member")
const emailController = require("./mail-service")
const formidable = require('formidable')

dbController.dbController.connection()
var currentloginuser

var controller = {
    login : function(req, res){
        res.render("member-login",{title : "Member Login Page",data : null})
    },

    loginverify : async function(req, res){
        var email = req.body.email
        var password = req.body.password

        var data = await dbController.loginmember(email, password)
        currlogin = data
        if (data != null)
        {   
            currentloginuser=data._id.toString()
            res.redirect("/member/viewadds")
        }
        else
        {
            res.render("member-login", {title : "Member Login Page"})
        }
    },

    register : function(req, res){
        res.render("member-register",{title : "Member Register Page"})
    },

    registerpost : function(req, res){
        var memberdata = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        dbController.dbController.addmember(memberdata)
        console.log("member details Added")
        res.redirect("/member")
    },
    
    forgotpassword : function(req, res){
        res.render("member-forgotpassword", {title : "member Forgot Password Page"})
    },

    sendpassword : async function(req, res){
        var email = req.body.email
        var user = await dbController.dbController.getUserByEmail(email)
        if(user == null)
        {
            res.send("Invalid email address")
        }
        else
        {
            var password = user.password
            var name = user.name
            emailController.send(email, "ashwathrapolu@gmail.com", "Password Recovery", "Dear "+name+" , your password is  " + "<b>" + "" + password + "</b>")
            res.render("member-login", {title : "member Login Page"})
        }
    },

    viewadds : function(req, res){
        var id= currentloginuser
        dbController.dbController.viewAdds(id,res)
    },
   
    uploadView : function(req, res){
            res.render("staff-upload-view", {title : "Form with upload"})
    },

    updateimg : async function(req, res){
        var id=req.params.id
        await res.render("staff-upload-view1", {title : "Form with upload",id:id})
    },

    uploadAction : async function(req, res){
        var id=currentloginuser
        console.log("inside controller function")
        var form = new formidable.IncomingForm();
        dbController.insertAd(req, form,id) 
        await res.redirect("/member/viewadds")
    },

    updateimgpost : async function(req, res){
        console.log("id:",)
        console.log("inside controller function img")
        var form = new formidable.IncomingForm();
        dbController.insertimg(req, form,) 
        await res.redirect("/member/viewadds")
    },

    delete :function(req, res, id){
        var id = req.params.id
        dbController.dbController.deleteadd(id,res)
    },

    dadd :function(req, res, id){
        var id = currentloginuser
        dbController.dbController.dadd(id,res)
    },

    dacc :function(req, res, id){
        var id = currentloginuser
        dbController.dbController.dacc(id,res)
    },

    uacc : function(req, res){
        var id = currentloginuser
        dbController.dbController.uacc(id,res)
    },
    uaccpost : function(req, res){
        dbController.dbController.uaccpost(req,res)
        console.log("Data Updated")
        res.redirect("/member")
    },
    
    updatedet : function(req, res){
        var id = req.params.id
        dbController.dbController.updatedet(id,res)
    },

    updatedetpost : function(req, res){
        dbController.dbController.updatedetpost(req,res)
        console.log("Data Updated")
        res.redirect("/member/viewadds")
    },

    view : async function(req, res){
        var id=req.params.id
        var ad= await dbController.getbyid(id)
        if(ad != null)
        {
            var imageurl= "/media/" + ad._id + "." + ad.image
            console.log("image:",imageurl)
            res.render("ad-view",{data:ad,imageurl:imageurl})
        }
        else
        {
            res.render("member-viewadds")
        }
    },

    logout : function(req, res){
        req.session.destroy( function(err){
            console.log("session destroyed")
        })  
        res.render("member-login", {title : "Member Login Page"})
    },
}
module.exports = controller