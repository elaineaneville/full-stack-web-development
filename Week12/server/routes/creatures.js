import express from 'express';
import mongoose from 'mongoose';
import Creature from '../models/Creature.js';

const router = express.Router();

// GET all creatures
router.get('/', async (req, res) => {
  try {
    const creatures = await Creature.find();
    res.json(creatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single creature by ID
router.get('/:id', async (req, res) => {
  try {
    const creature = await Creature.findById(req.params.id);
    if (!creature) {
      return res.status(404).json({ message: 'Creature not found' });
    }
    res.json(creature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new creature
router.post('/', async (req, res) => {
  const creature = new Creature({
    name: req.body.name,
    species: req.body.species,
    habitat: req.body.habitat,
    rarity: req.body.rarity,
    description: req.body.description,
  });

  try {
    const newCreature = await creature.save();
    res.status(201).json(newCreature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a creature by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCreature = await Creature.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCreature) {
      return res.status(404).json({ message: 'Creature not found' });
    }
    res.json(updatedCreature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a creature by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCreature = await Creature.findByIdAndDelete(req.params.id);
    if (!deletedCreature) {
      return res.status(404).json({ message: 'Creature not found' });
    }
    res.json({ message: 'Creature deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});