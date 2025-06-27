
import { Notification } from '../../models/Notification/index.js';
import { getIO } from '../../services/socketService.js';


export const createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    const savedNotification = await notification.save();
    
    // Emit to recipient  
      const io = getIO();
      io.to(savedNotification.recipient.toString()).emit('new-notification', savedNotification);

    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('sender', 'name email');

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    // Emit update
    const io = getIO();
    io.to(notification.recipient.toString()).emit('notification-updated', notification);

    res.json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllNotifications = async (req,res) => {
  try{
    const notification  = await Notification.find({})
     return res.status(200).json(notification);
  }catch (error){
    res.status(500).json({ error: error.message });
  }
}