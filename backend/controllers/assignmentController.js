const db = require('../config/db');

exports.createAssignment = async (req, res) => {
    const { title, description, marks } = req.body;
    const created_by = req.user.id;

    try {
        await db.query('INSERT INTO assignments (title, description, marks, created_by) VALUES (?, ?, ?, ?)',[title, description, marks, created_by]);

        res.status(201).json({ msg: 'Assignment created successfully' });
    } catch (error) {
        //console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getAssignments = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM assignments');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.updateAssignment = async (req, res) => {
    const { id } = req.params;
    const { title, description, marks } = req.body;
    const updated_by = req.user.id;
    
    try {
        const [rows] = await db.query('SELECT created_by FROM assignments WHERE id = ?', [id]);
        //console.log(rows,updated_by);
        if (rows.length === 0) return res.status(404).json({ msg: 'Assignment not found' });
        if (rows[0].created_by !== updated_by) return res.status(403).json({ msg: 'Not authorized' });

        await db.query('UPDATE assignments SET title = ?, description = ? , marks = ? WHERE id = ?',
            [title, description, marks, id]);
        res.json({ msg: 'Assignment updated successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deleteAssignment = async (req, res) => {
    const { id } = req.params;
    const deleted_by = req.user.id;

    try {
        const [rows] = await db.query('SELECT created_by FROM assignments WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ msg: 'Assignment not found' });
        if (rows[0].created_by !== deleted_by) return res.status(403).json({ msg: 'Not authorized' });

        await db.query('DELETE FROM assignments WHERE id = ?', [id]);
        res.json({ msg: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
