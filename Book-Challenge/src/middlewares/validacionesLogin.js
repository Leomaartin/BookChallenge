const { check, validationResult } = require('express-validator');

module.exports = [
  check('name')
    .notEmpty().withMessage('Debe completar su nombre')
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

  check('email')
    .notEmpty().withMessage('Debe completar su email')
    .isEmail().withMessage('Debe ingresar un email válido'),

  check('country')
    .notEmpty().withMessage('Debe completar su país')
    .isLength({ min: 4 }).withMessage('El país debe tener al menos 4 caracteres'),

  check('password')
    .isStrongPassword({ minLength: 6, maxLength: 10, minUppercase: 0, minSymbols: 0, minNumbers: 2 })
    .withMessage('La clave debe contener de 6 a 10 caracteres y al menos dos números'),

  check('category')
    .notEmpty().withMessage('Debe seleccionar una categoría'),
];