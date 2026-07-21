const pool = require('../config/database');

// Save assessment result
async function saveAssessment(email, name, goal, income, target, hours, skills, challenge, ceoScore, ceoLevel) {
  try {
    const result = await pool.query(
      `INSERT INTO assessments (email, name, goal, income, target_income, hours_weekly, skills, challenge, ceo_score, ceo_level)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, ceo_score, ceo_level`,
      [email, name, goal, income, target, hours, skills, challenge, ceoScore, ceoLevel]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// Get assessment by ID
async function getAssessment(assessmentId) {
  try {
    const result = await pool.query(
      'SELECT * FROM assessments WHERE id = $1',
      [assessmentId]
    );

    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
}

// Get assessments by user
async function getUserAssessments(userId) {
  try {
    const result = await pool.query(
      'SELECT * FROM assessments WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { saveAssessment, getAssessment, getUserAssessments };
