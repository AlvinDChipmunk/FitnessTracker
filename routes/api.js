const router = require("express").Router();
const Workout = require("../models/workout.js");

//route to create a workout - C in CRUD
router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(dbWorkout => { res.json(dbWorkout); })
    .catch(err => { res.json(err); });
});

//route to display one selected workout - R in CRUD
router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
	{ $push: { exercises: body } },
	// "runValidators" will ensure new exercises meet our schema requirements
    { new: true, runValidators: true } 
  )
    .then(dbWorkout => { res.json(dbWorkout); })
    .catch(err => { res.json(err); });
});

//route to look up a workout - special application of R in CRUD
router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then(dbWorkouts => { res.json(dbWorkouts); })
    .catch(err => { res.json(err); });
});

//route to look up a workout - special application of R in CRUD, with a return hit limit
router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(7)
    .then(dbWorkouts => {
      console.log(dbWorkouts)
      res.json(dbWorkouts);
    })
    .catch(err => { res.json(err); });
});

//route to delete a workout - D in CRUD
router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => { res.json(true); })
    .catch(err => { res.json(err); });
});

module.exports = router;
