import Vendor from '../models/vendorModel.js';

// export const createVendor = async (req, res, next) => {
//   try {
//     const vendor = await Vendor.create({ ...req.body, createdBy: req.user.id });
//     res.status(201).json(vendor);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getAllVendors = async (req, res, next) => {
//   try {
//     const vendors = await Vendor.find().populate('createdBy', 'email name');
//     res.status(200).json(vendors);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getVendorById = async (req, res, next) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id).populate('createdBy', 'email name');
//     if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

//     res.status(200).json(vendor);
//   } catch (err) {
//     next(err);
//   }
// };

// export const updateVendor = async (req, res, next) => {
//   try {
//     const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

//     res.status(200).json(vendor);
//   } catch (err) {
//     next(err);
//   }
// };

// export const deleteVendor = async (req, res, next) => {
//   try {
//     const vendor = await Vendor.findByIdAndDelete(req.params.id);
//     if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

//     res.status(200).json({ message: 'Vendor deleted' });
//   } catch (err) {
//     next(err);
//     }
// };

// import Vendor from '../models/vendorModel.js';



// GET all vendors – Public
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ name: 1 });
    res.status(200).json(vendors);
} catch (error) {
    res.status(500).json({ message: 'Error fetching vendors', error: error.message });
}
};

// GET single vendor by ID – Public
// export const getVendorById = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id);
//     if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
//     res.status(200).json(vendor);
//   } catch (error) {
//       res.status(500).json({ message: 'Error fetching vendor', error: error.message });
//   }
// };

// FILTER vendors by city or service – Public
export const filterVendors = async (req, res) => {
  try {
    const { id, city, service } = req.query;

    const filter = {};
    if (id) {
      filter._id = id;
    }
    if (city) {
      filter.city = city;
    }
    if (service) {
      filter.services = { $in: [service] }; // assuming services is an array
    }

    const vendors = await Vendor.find(filter);
    if (vendors.length === 0) {
      return res.status(404).json({ message: 'No vendors match the provided criteria' });
    }
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering vendors', error: error.message });
  }
};


// CREATE vendor – Admin only
export const createVendor = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

    const vendor = new Vendor(req.body);
    const savedVendor = await vendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
      res.status(500).json({ message: 'Error creating vendor', error: error.message });
  }
};

// UPDATE vendor – Admin only
export const updateVendor = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedVendor) return res.status(404).json({ message: 'Vendor not found' });

    res.status(200).json(updatedVendor);
  } catch (error) {
      res.status(500).json({ message: 'Error updating vendor', error: error.message });
  }
};

// DELETE vendor – Admin only
export const deleteVendor = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) return res.status(404).json({ message: 'Vendor not found' });

    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
  res.status(500).json({ message: 'Error deleting vendor', error: error.message });
  }
};