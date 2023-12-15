const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.get('/home', (req, res) => {
	res.status(200).json('Welcome, your app is working well');
});

const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	let notes;

	fs.readFile(path.join(__dirname, 'data.js'), 'utf-8', (err, data) => {
		if (err) console.log('Error reading file! ♠', err);
		notes = eval(data);

		res.render('index', {
			title: 'Notes App',
			notes,
		});
	});
});

app.post('/create', (req, res) => {
	fs.readFile(path.join(__dirname, 'data.js'), 'utf-8', (err, data) => {
		if (err) console.log('Error reading file! ♠', err);
		notes = eval(data);
		const last_note = notes[notes.length - 1];
		const last_id = last_note ? last_note.id : 0;
		notes.push({
			id: last_id + 1,
			content: req.body.note,
		});
		const updated_notes = JSON.stringify(notes, null, 2);
		fs.writeFileSync(
			path.join(__dirname, 'data.js'),
			updated_notes,
			'utf8'
		);
		res.redirect('/');
	});
});

app.delete('/:id', (req, res) => {
	const id = Number(req.params.id);

	fs.readFile(path.join(__dirname, 'data.js'), 'utf-8', (err, data) => {
		if (err) console.log('Error reading file! ♠', err);
		let notes = eval(data);

		notes = notes.filter((note) => note.id !== id);
		const updated_notes = JSON.stringify(notes, null, 2);

		fs.writeFileSync(
			path.join(__dirname, 'data.js'),
			updated_notes,
			'utf8'
		);
		res.status(200).json({
			success: true,
			message: 'Item deleted successfully.',
		});
	});
});

app.listen(port, () => {
	console.log('listening on port ' + port + '...');
});

// Export the Express API
module.exports = app;
