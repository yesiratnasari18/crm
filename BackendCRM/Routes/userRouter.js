const express = require('express');
const Router = express.Router();
const userService = require('../Services/userService');

Router.post('/login', userService.userLogin)
Router.get('/dashboard', userService.dashboard)
Router.post('/userdata', userService.userData)
Router.get('/contact', userService.getKontak);
Router.post('/add/contact', userService.addCont);
// Router.put('/update/contact/:id', userService.updateKontak);
Router.put('/update/contact/:id', userService.updateCont);
Router.delete('/delete/contact/:id', userService.deleteKontak);
Router.get('/columns', userService.getColumns);
Router.post('/task', userService.addCont);
Router.patch('/task/move', userService.moveTask);
Router.patch('/task/reorder', userService.reorderTask);
Router.post('/update-task-list', userService.updateTaskListHandler);
Router.get('/sektor', userService.getSektor);
Router.get('/getUsers', userService.getUsers);
Router.post('/addUser', userService.addUser);
Router.put('/updateUser/:id', userService.updateUser);
Router.delete('/deleteUser/:id', userService.deleteUser);
Router.get('/getBobot', userService.getBobot);
Router.put('/updateBobot/:id_bobot', userService.updateBobot);
Router.get('/evaluate', userService.evaluate);
Router.get('/getAnalysis', userService.getAnalysis);
Router.get('/getKontakCount', userService.getKontakCount);
Router.get('/getSalesReport', userService.getSalesReport);
Router.get('/search', userService.searchHandler);
module.exports = Router