const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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

