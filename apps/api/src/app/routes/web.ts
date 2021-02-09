import * as express from 'express';

// import homeController from '../controllers/home';
//
const router = express.Router();

// router.get('/', homeController.welcome);
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

export default router;
