const storage = require("./storage");

const getRoot = (req, res) => {
  res.json({
    message: "Backend API",
    endpoints: {
      "POST /api/forms": "Submit form data",
      "GET /api/forms": "Get all forms",
      "GET /api/forms/:id": "Get form by ID",
      "DELETE /api/forms/:id": "Delete form by ID",
    },
  });
};

const createForm = (req, res) => {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(400).json({
        success: false,
        message: "Form data is required",
      });
    }

    const newForm = storage.createForm(formData);

    res.status(201).json({
      success: true,
      message: "Form data saved successfully",
      data: newForm,
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllForms = (req, res) => {
  try {
    const forms = storage.getAllForms();

    res.status(200).json({
      success: true,
      data: forms,
    });
  } catch (error) {
    console.error("Error retrieving forms:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getFormById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const form = storage.getFormById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: `Form with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: form,
    });
  } catch (error) {
    console.error("Error retrieving form:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteFormById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedForm = storage.deleteFormById(id);

    if (!deletedForm) {
      return res.status(404).json({
        success: false,
        message: `Form with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Form deleted successfully",
      data: deletedForm,
    });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getRoot,
  createForm,
  getAllForms,
  getFormById,
  deleteFormById,
};
