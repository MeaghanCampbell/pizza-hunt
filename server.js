const express = require('express');

// import mongoose
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// connect mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
    // true by default    
    useFindAndModify: false,
    // fallback to old parser if they find a bug
    useNewUrlParser: true,
    // false by default
    useUnifiedTopology: true
})

// use this to log mongo queries being executed
mongoose.set('debug', true)

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
