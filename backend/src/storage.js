let formsData = [];
let currentId = 1;

const createForm = (formData) => {
  const newForm = {
    id: currentId++,
    data: formData,
    timestamp: new Date().toISOString(),
  };

  formsData.push(newForm);
  return newForm;
};

const getAllForms = () => {
  return formsData;
};

const getFormById = (id) => {
  return formsData.find((f) => f.id === id);
};

const deleteFormById = (id) => {
  const formIndex = formsData.find((f) => f.id === id);

  if (index === -1) {
    return null;
  }

  const deletedForm = formsData.splice(formIndex, 1)[0];
  return deletedForm;
};

module.exports = {
  createForm,
  getAllForms,
  getFormById,
  deleteFormById,
};
