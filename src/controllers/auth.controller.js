export const register = async (req, res) => {
  try {
    // Your registration logic
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    // Your login logic
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
