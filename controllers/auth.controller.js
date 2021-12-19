const authUser = require('express').Router();
const accountModel = require('../models/account.model')
const bcrypt = require('bcrypt');
const passport = require('passport');

const saltRounds = 10;
const userAccountTable = 'TaiKhoanNguoiDung';
const managerAccountTable = 'TaiKhoanNguoiQuanLy';
const adminAccountTable = 'TaiKhoanNguoiQuanTri';

authUser.get('/signin',async (req, res) =>{
    const adminExist = await accountModel.all(adminAccountTable);
    if(!adminExist) {
        return res.redirect('/init');
    }
    if(req.keep-signin === 'true') {
        if(req.signedCookies.user) {
            let user = await userModel.get(userAccountTable, req.signedCookies.user);
            if(user) {
                return res.redirect('/home');
            } else {
                user = await userModel.get(managerAccountTable, req.signedCookies.user);
                if(user) {
                    return res.redirect('/manager', {
                        manager: user.Username
                    })
                } else {
                    user = await userModel.get(adminAccountTable, req.signedCookies.user); 
                    if(user) {
                        return res.redirect('/admin');
                    } else {
                        return res.render('signin');
                    }
                }
            }
        }
        
    }
    if(req.account) {
        let user = await userModel.get(userAccountTable, req.account.Username);
        if(user) {
            return res.redirect('/home');
        } else {
            user = await userModel.get(managerAccountTable, req.account.Username);
            if(user) {
                return res.redirect('/manager', {
                    manager: user.Username
                })
            } else {
                user = await userModel.get(adminAccountTable, req.account.Username); 
                if(user) {
                    return res.redirect('/admin');
                } else {
                    return res.render('signin');
                }
            }
        }
    }
    return res.render('signin');
})

authUser.post('/signin',async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return res.render('signin', {
                msg: 'Tên đăng nhập hoặc mật khẩu không chính xác!'
            });
        }
        if(!user) {
            return res.render('user/signin', {
                msg: 'Tên đăng nhập hoặc mật khẩu không chính xác!'
            });
            
        }
        req.logIn(user,async (err) => {
            if(err) {
                return res.render('signin', {
                    msg: 'Tên đăng nhập hoặc mật khẩu không chính xác!'
                });
            }
            if(req.body.keep === 'on') {
                res.cookie('keep-signin', 'true');
            } else {
                res.cookie('keep-signin', 'false');
            }
            res.cookie('user', user.Username, {signed: true});
            let account = await accountModel.get(userAccountTable, user.Username);
            if(account) {               
                if(account.TrangThai === '0') {
                    return res.redirect('/change-password');
                   
                }
                res.cookie('userId', account.NguoiLienQuan, {signed: true});
                return res.redirect("/home");  
            }
            account = await accountModel.get(managerAccountTable, user.Username);
            if(account) {                
                if(account.TrangThai === '0') {
                    res.clearCookie('user');
                    return res.redirect('/auth/signin', {
                        msg: 'Account is disabled!'
                    })
                }
                return res.redirect("/manager");  
            }            
            account = await accountModel.get(adminAccountTable, user.Username);
            if(account) {
                return res.redirect("/admin");  
            }    
        })
    })(req, res, next);
})


authUser.get('/signout', (req, res) => {
    
    if(req.signedCookies.user){
        res.clearCookie('user');
    }
    if(req.signedCookies.userId) {
        res.clearCookie('userId');
    }
    if(req.account) {
        req.logOut();
    }
    return res.redirect('/auth/signin');
})


module.exports = authUser;;