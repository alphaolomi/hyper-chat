import * as express from 'express';
const router = express.Router();


router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

export default router;
