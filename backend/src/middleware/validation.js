export const validateWaitlist = (req, res, next) => {
  const { name, email, phone } = req.body;
  const errors = [];

  if (!name || name.length < 2) errors.push('Nom invalide');
  
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !emailRegex.test(email)) errors.push('Email invalide');
  
  const phoneRegex = /^[0-9]{8,15}$/;
  if (!phone || !phoneRegex.test(phone)) errors.push('Téléphone invalide');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join(', ')
    });
  }

  next();
};