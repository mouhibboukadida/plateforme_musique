import Waitlist from '../models/waitlist.js';

export const addToWaitlist = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const existing = await Waitlist.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email déjà inscrit'
      });
    }

    const member = await Waitlist.create({ name, email, phone });

    res.status(201).json({
      success: true,
      message: 'Inscription réussie ! 🎉',
      data: member
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

export const getAllMembers = async (req, res) => {
  try {
    const members = await Waitlist.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: members.length,
      data: members
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const member = await Waitlist.findByPk(id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Membre non trouvé'
      });
    }

    member.status = status;
    await member.save();

    res.json({
      success: true,
      message: 'Statut mis à jour',
      data: member
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Waitlist.findByPk(id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Membre non trouvé'
      });
    }

    await member.destroy();
    res.json({ success: true, message: 'Membre supprimé' });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const total = await Waitlist.count();
    const pending = await Waitlist.count({ where: { status: 'pending' } });
    const approved = await Waitlist.count({ where: { status: 'approved' } });
    const rejected = await Waitlist.count({ where: { status: 'rejected' } });

    res.json({
      success: true,
      data: { total, pending, approved, rejected }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};