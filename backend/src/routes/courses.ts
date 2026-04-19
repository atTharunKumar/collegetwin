import express, { Request, Response, Router } from 'express';
import { Course } from '../models/Course.js';

const router = Router();

// GET all courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// GET course by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// POST create course
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, code, instructor, description, credits, schedule } = req.body;

    if (!name || !code || !instructor || credits === undefined) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const course = new Course({
      name,
      code,
      instructor,
      description,
      credits,
      schedule,
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Course code already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create course' });
    }
  }
});

// PUT update course
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// DELETE course
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

export default router;
