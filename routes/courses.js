const { response } = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Courses=require('../models/courses');
const { createCourseValidation, getAllCourses } = require('../validations/courses');
/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API operations related to courses
 */

/**
 * @swagger
 * /api/v1/courses:
 *   post:
 *     summary: Get all courses
 *     tags: [Courses]
 *     security:
 *      - Auth: []
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          example:
 *            category: "DIGITAL_MARKETING" 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               category: "DIGITAL_MARKETING"
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', [auth(['TEACHER','STUDENT']),getAllCourses], async (request, response) => {

  const { category } = request.body;
  let course;
  let user=request.user;
  try {
    if(category){
      if(user.role == 'ADMIN'){
          course = await Courses.find({ category });
      }else{
          course = await course.find({ category,status:'ACTIVE' }).select('-created_by -status');
      }

    }else{
      if(user.role == 'ADMIN'){
        course = await Courses.find({});
      }else{
        course = await course.find({ status:'ACTIVE' }).select('-created_by -status');
      }
    }

    if (course?.length > 0) {
      return response.status(200).json({
        course: course,
        totalCount: course?.length || 0
      });
    } else {
      if(category){
        return response.status(200).json({
          msg: "No course found Against Category!",
          totalCount: 0
        });
      }else{
        return response.status(200).json({
          msg: "No Courses found!",
          totalCount: 0
        });
      }
    }


  } catch (error) {
    console.error(error.message);
    response.status(500).json({ msg: error.message });
  }
});

/**
 * @swagger
 * /api/v1/course/create:
 *   post:
 *     summary: Create a new Course
 *     tags: [Courses]
 *     security:
 *      - Auth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Website Development-I"
 *             description: "This includes details of HTML,CSS3,Javascript"
 *             category: "WEB_DEVELOPMENT"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               msg: "Course inserted Successfully!"
 *       400:
 *         description: Bad Request
 *       403:
 *         description: You Don't Have Access this Resource
 *       500:
 *         description: Internal server error
 */

router.post('/create', [auth(['admin']), createCourseValidation], async (request, response, next) => {
  const { name,
          description,
          category
        } = request.body;

  let course = await Courses.findOne({ name });
  if (course) {
    return response.status(400).json({
      msg: 'Course already exists',
    });
  }

  try {
    course = new Courses({ 
      name,
      description,
      category,
      created_by:request.user.id
    });
    await course.save();

    return response.status(200).json({
      msg: 'Course Created  Succesfully!',
    });

  } catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error!' });
  }



});


module.exports = router;
