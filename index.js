const app = require('express')();

app.get('/', (req, res) => {
  res.send('API Server Running');
});

app.listen(3000);
