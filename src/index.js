// includes
const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// creating new express app
const app = express();

// providing port for heroku
const port = process.env.PORT;

const multer = require('multer');

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc | docx)$/)) {
            return cb(new Error('Please upload doc or docx file only'));
        }

        cb(undefined, true);
    }
})


// express middlewares

// server maintenance mode
// app.use((req, res, next) => {
// 	res.status(503).send('Server is under maintenance');
// });

// get json sent from clients
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// start the server
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// playground
const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('5e7738cb17a647b9800e4867');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    // const user = await User.findById('5e77348d4dde6a3674329a45')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
}

main();