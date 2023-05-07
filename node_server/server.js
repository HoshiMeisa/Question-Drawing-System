/* 
Nodejs后端服务器的代码
*/

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const multer = require('multer');
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, '../images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
const imageFolder = path.join(__dirname, '../images');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, '../images')));



app.get('/get_images', (req, res) => {
    fs.readdir(path.join(__dirname, '../images'), (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            const imagePaths = files.map(file => path.join('/images', file));
            res.json(imagePaths);
        }
    });
});


app.get('/get_images', (req, res) => {
    fs.readdir(path.join(__dirname, '../images'), (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            const imagePaths = files.map(file => path.join('/images', file));
            res.json(imagePaths);
        }
    });
});

app.get('/get_questions', (req, res) => {
    fs.readdir(imageFolder, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        const images = files.map((file) => {
          return {
            id: Date.now(),
            name: file,
            image: path.join('/images', file),
          };
        });
        res.send(images);
      }
    });
  });

app.post('/add_question', upload.single('image'), (req, res) => {
    const { name } = req.body;
    const imagePath = path.join('images', req.file.originalname);
  
    fs.readFile('questions.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        const questions = JSON.parse(data);
        const newQuestion = { id: Date.now(), name, image: imagePath };
        questions.push(newQuestion);
        fs.writeFile('questions.json', JSON.stringify(questions, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Server error');
          } else {
            res.send(newQuestion);
          }
        });
      }
    });
  });

app.get('/used-ids', (req, res) => {
    fs.readFile('answered.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.send(data);
        }
    });
});

app.post('/add-used-id', (req, res) => {
    const usedId = req.body.id;
    const questionImage = req.body.questionImage;
    const userInfo = req.body.userInfo;
    const ip = req.connection.remoteAddress;

    fs.readFile('answered.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            const usedIds = JSON.parse(data);
            usedIds.push({
                id: usedId,
                questionImage: questionImage,
                userInfo: { ...userInfo, ip: ip },
            });
            fs.writeFile('answered.json', JSON.stringify(usedIds, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Server error');
                } else {
                    res.send('Success');
                }
            });
        }
    });
});

app.delete('/delete_draw_record/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('answered.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            const usedIds = JSON.parse(data);
            const updatedUsedIds = usedIds.filter((item) => item.id !== id);
            fs.writeFile('answered.json', JSON.stringify(updatedUsedIds, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Server error');
                } else {
                    res.send('Success');
                }
            });
        }
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
