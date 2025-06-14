// // import Vendor from '../models/vendor.model.js';

// // export const getAllVendors = async (req, res) => {
// //   try {
// //     const vendors = await Vendor.find();
// //     res.json(vendors);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // export const createVendor = async (req, res) => {
// //   try {
// //     const vendor = await Vendor.create(req.body);
// //     res.status(201).json(vendor);
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // };
// import Vendor from '../models/vendorModel.js';

// exports.createVendor = async (req, res, next) => {
//   try {
//     const vendor = await Vendor.create({ ...req.body, createdBy: req.user.id });
//     res.status(201).json(vendor);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getAllVendors = async (req, res, next) => {
//   try {
//     const vendors = await Vendor.find().populate('createdBy', 'email name');
//     res.status(200).json(vendors);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getVendorById = async (req, res, next) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id).populate('createdBy', 'email name');
//     if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

//     res.status(200).json(vendor);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.updateVendor = async (req, res, next) => {
//   try {
//     const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

//     res.status(200).json(vendor);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.deleteVendor = async (req, res, next) => {
//   try {
//     const vendor = await Vendor.findByIdAndDelete(req.params.id);
//     if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

//     res.status(200).json({ message: 'Vendor deleted' });
//   } catch (err) {
//     next(err);
//   }
// };