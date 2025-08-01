import Vendor from '../models/vendorModel.js';
import Route from "../models/routesModel.js";



//GET all vendors with their routes - public
export const getAllVendorsWithRoutes = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("routes")
    
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all vendors – Public
export const getVendorById = async (req, res) => {
  try {
    // Get vendor and all their routes
    const vendorId = req.params.id
    const vendor = await Vendor.findById(vendorId).populate("routes");
    
    res.status(200).json({ vendor });

    // const vendors = await Vendor.find().sort({ name: 1 });
    // res.status(200).json(vendors);
} catch (error) {
    res.status(500).json({ message: 'Error fetching vendors', error: error.message });
}
};

// FILTER vendors by city or service – Public
export const filterVendorsByRoute = async (req, res) => {
  try {
    const {
  from,
  to,
  minPrice,
  maxPrice,
  minSeats,
  departureTime,
  arrivalTime,
  vehicleType
} = req.query;

const matchConditions = [];

if (from) {
  matchConditions.push({
    $regexMatch: {
      input: { $toLower: "$$route.from" },
      regex: from.toLowerCase(),
      options: "i"
    }
  });
}

if (to) {
  matchConditions.push({
    $regexMatch: {
      input: { $toLower: "$$route.to" },
      regex: to.toLowerCase(),
      options: "i"
    }
  });
}

if (minPrice) {
  matchConditions.push({
    $gte: ["$$route.price", Number(minPrice)]
  });
}

if (maxPrice) {
  matchConditions.push({
    $lte: ["$$route.price", Number(maxPrice)]
  });
}

if (minSeats) {
  matchConditions.push({
    $gte: ["$$route.availableSeats", Number(minSeats)]
  });
}

if (departureTime) {
  matchConditions.push({
    $eq: ["$$route.departureTime", departureTime]
  });
}

if (arrivalTime) {
  matchConditions.push({
    $eq: ["$$route.arrivalTime", arrivalTime]
  });
}

if (vehicleType) {
  matchConditions.push({
    $eq: ["$$route.vehicle.type", vehicleType]
  });
}

const vendors = await Vendor.aggregate([
  {
    $lookup: {
      from: "routes",
      localField: "_id",
      foreignField: "vendorId",
      as: "routes"
    }
  },
  {
    $addFields: {
      filteredRoutes: {
        $filter: {
          input: "$routes",
          as: "route",
          cond: {
            $and: matchConditions.length > 0 ? matchConditions : [{ $literal: true }]
          }
        }
      }
    }
  },
  {
    $match: {
      "filteredRoutes.0": { $exists: true }
    }
  },
  {
    $project: {
      name: 1,
      logo: 1,
      services: 1,
      contactInfo: 1,
      rating: 1,
      numberOfRatings: 1,
      isVerified: 1,
      routes: "$filteredRoutes"
    }
  }
]);
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const allroutes = async (req, res) => {};

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

export const createBulkVendors = async (req, res) => {
  try {
    const newVendors = await Vendor.insertMany(req.body);
    res.status(201).json({ message: 'Vendors added successfully', data: newVendors });
  } catch (err) {
    res.status(500).json({ message: 'Error inserting vendors', error: err.message });
  }
};


//Add routes to respective vendor/company - Admin only
export const createRoute = async (req, res) => {
  const {vendorId, from, to, departureTime, 
    arrivalTime, duration, price, availableSeats, 
    layout, type, features, seats} = req.body
  
  try {

     if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

    const newRoute = new Route({
      vendorId: vendorId, // sent from frontend or known
      from: from,
      to: to,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      duration: duration,
      price: price,
      availableSeats: availableSeats,
      vehicle: {
        layout: layout,
        type: type,
        features: features, //[]
        seats: seats
      }
    });

    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addBulkRoutes = async (req, res) => {
  try {
    const routes = await Route.insertMany(req.body);
    res.status(201).json({ message: 'Routes added successfully', data: routes });
  } catch (error) {
    res.status(500).json({ message: 'Error adding routes', error: error.message });
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

