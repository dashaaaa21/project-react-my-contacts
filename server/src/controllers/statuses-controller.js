import Status from '../models/Status.js';
import Contact from '../models/Contact.js';

export const getStatuses = async (req, res) => {
  try {
    const statuses = await Status.find({ userId: req.userId });
    
    const contacts = await Contact.find({ userId: req.userId });
    const statusCounts = {};
    
    contacts.forEach(contact => {
      statusCounts[contact.status] = (statusCounts[contact.status] || 0) + 1;
    });
    
    const statusesWithCount = statuses.map(status => ({
      _id: status._id,
      name: status.name,
      color: status.color,
      count: statusCounts[status.name] || 0,
      isDefault: status.isDefault,
      createdAt: status.createdAt,
      updatedAt: status.updatedAt,
    }));
    
    return res.status(200).json(statusesWithCount);
  } catch (error) {
    console.error('Get statuses error', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createStatus = async (req, res) => {
  try {
    const { name, color } = req.body;
    
    if (!name || !color) {
      return res.status(400).json({ message: 'Name and color are required' });
    }
    
    const existingStatus = await Status.findOne({ 
      userId: req.userId, 
      name: name.toLowerCase() 
    });
    
    if (existingStatus) {
      return res.status(400).json({ message: 'Status already exists' });
    }
    
    const status = await Status.create({
      userId: req.userId,
      name: name.toLowerCase(),
      color,
      count: 0,
    });
    
    return res.status(201).json(status);
  } catch (error) {
    console.error('Create status error', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    
    const status = await Status.findOne({ _id: id, userId: req.userId });
    
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }
    
    if (status.isDefault && status.name === 'others') {
      return res.status(403).json({ message: 'Cannot edit default status "others"' });
    }
    
    const oldName = status.name;
    
    if (name && name.toLowerCase() !== oldName) {
      await Contact.updateMany(
        { userId: req.userId, status: oldName },
        { status: name.toLowerCase() }
      );
    }
    
    status.name = name ? name.toLowerCase() : status.name;
    status.color = color || status.color;
    
    await status.save();
    
    return res.status(200).json(status);
  } catch (error) {
    console.error('Update status error', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const status = await Status.findOne({ _id: id, userId: req.userId });
    
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }
    
    if (status.isDefault && status.name === 'others') {
      return res.status(403).json({ message: 'Cannot delete default status "others"' });
    }
    
    await Contact.updateMany(
      { userId: req.userId, status: status.name },
      { status: 'others' }
    );
    
    await Status.deleteOne({ _id: id });
    
    return res.status(200).json({ message: 'Status deleted' });
  } catch (error) {
    console.error('Delete status error', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const initializeDefaultStatuses = async (userId) => {
  const defaultStatuses = [
    { name: 'work', color: '#3b82f6', isDefault: true },
    { name: 'family', color: '#22c55e', isDefault: true },
    { name: 'private', color: '#a855f7', isDefault: true },
    { name: 'friends', color: '#eab308', isDefault: true },
    { name: 'others', color: '#ef4444', isDefault: true },
  ];
  
  try {
    for (const statusData of defaultStatuses) {
      await Status.create({
        userId,
        ...statusData,
      });
    }
  } catch (error) {
    console.error('Initialize default statuses error', error);
  }
};
