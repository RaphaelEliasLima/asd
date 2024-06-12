const express = require('express');
const app = express();
const port = 4000; // Alterada para 4000

app.use(express.json());

//rotas e lógica de backend aqui

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
