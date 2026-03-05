// Mock Database for QuickSlot Mobile App
export const db = {
  mobileUsers: [
    { 
      id: 1001, 
      name: 'John Doe', 
      email: 'john.doe@ustp.edu.ph', 
      idNumber: '2023-0001234',
      userType: 'student',
      college: 'College of Information Technology and Computing',
      status: 'active',
      verified: true,
      registeredDate: '2026-01-15',
      totalRentals: 5,
      currentRentals: 1
    },
    { 
      id: 1002, 
      name: 'Dr. Jane Smith', 
      email: 'jane.smith@ustp.edu.ph', 
      idNumber: '2021-0005678',
      userType: 'faculty',
      college: 'College of Engineering',
      status: 'active',
      verified: true,
      registeredDate: '2026-01-10',
      totalRentals: 3,
      currentRentals: 0
    },
    { 
      id: 1003, 
      name: 'Mark Johnson', 
      email: 'mark.johnson@ustp.edu.ph', 
      idNumber: '2022-0009012',
      userType: 'staff',
      college: 'Administration',
      status: 'suspended',
      verified: true,
      registeredDate: '2026-01-05',
      totalRentals: 2,
      currentRentals: 1
    },
    { 
      id: 1004, 
      name: 'Maria Garcia', 
      email: 'maria.garcia@ustp.edu.ph', 
      idNumber: '2024-0003456',
      userType: 'student',
      college: 'College of Science and Mathematics',
      status: 'pending',
      verified: false,
      registeredDate: '2026-02-14',
      totalRentals: 0,
      currentRentals: 0
    },
    { 
      id: 1005, 
      name: 'Robert Chen', 
      email: 'robert.chen@ustp.edu.ph', 
      idNumber: '2023-0007890',
      userType: 'student',
      college: 'College of Technology',
      status: 'active',
      verified: true,
      registeredDate: '2026-01-20',
      totalRentals: 2,
      currentRentals: 1
    }
  ],

  gadgets: [
    { 
      id: 'G001', 
      name: 'MacBook Pro 14', 
      category: 'Laptop',
      brand: 'Apple',
      model: 'M3 Pro',
      specs: 'M3 Pro, 16GB RAM, 512GB SSD',
      dailyRate: 350,
      status: 'available',
      condition: 'excellent',
      location: 'IT Lab A',
      imageUrl: 'https://via.placeholder.com/150'
    },
    { 
      id: 'G002', 
      name: 'iPad Pro 12.9', 
      category: 'Tablet',
      brand: 'Apple',
      model: 'M2',
      specs: 'M2, 256GB, Magic Keyboard',
      dailyRate: 200,
      status: 'rented',
      condition: 'good',
      location: 'Engineering Lab',
      imageUrl: 'https://via.placeholder.com/150'
    },
    { 
      id: 'G003', 
      name: 'Canon EOS 90D', 
      category: 'Camera',
      brand: 'Canon',
      model: 'EOS 90D',
      specs: '32.5MP, 18-135mm lens',
      dailyRate: 300,
      status: 'available',
      condition: 'good',
      location: 'Media Center',
      imageUrl: 'https://via.placeholder.com/150'
    },
    { 
      id: 'G004', 
      name: 'Epson EB-695Wi', 
      category: 'Projector',
      brand: 'Epson',
      model: 'EB-695Wi',
      specs: 'Ultra Short Throw, 3500 lumens',
      dailyRate: 400,
      status: 'maintenance',
      condition: 'needs repair',
      location: 'AV Room',
      imageUrl: 'https://via.placeholder.com/150'
    },
    { 
      id: 'G005', 
      name: 'Wacom Intuos Pro', 
      category: 'Graphics Tablet',
      brand: 'Wacom',
      model: 'Intuos Pro',
      specs: 'Large, Bluetooth',
      dailyRate: 150,
      status: 'available',
      condition: 'excellent',
      location: 'Design Studio',
      imageUrl: 'https://via.placeholder.com/150'
    },
    { 
      id: 'G006', 
      name: 'Dell XPS 15', 
      category: 'Laptop',
      brand: 'Dell',
      model: 'XPS 15',
      specs: 'i9, 32GB RAM, RTX 4060',
      dailyRate: 380,
      status: 'available',
      condition: 'excellent',
      location: 'IT Lab B',
      imageUrl: 'https://via.placeholder.com/150'
    },
    { 
      id: 'G007', 
      name: 'GoPro Hero 12', 
      category: 'Camera',
      brand: 'GoPro',
      model: 'Hero 12',
      specs: '5.3K video, Waterproof',
      dailyRate: 180,
      status: 'rented',
      condition: 'good',
      location: 'Media Center',
      imageUrl: 'https://via.placeholder.com/150'
    }
  ],

  rentals: [
    {
      id: 'R001',
      userId: 1001,
      userName: 'John Doe',
      gadgetId: 'G002',
      gadgetName: 'iPad Pro 12.9',
      rentDate: '2026-02-10',
      expectedReturn: '2026-02-17',
      actualReturn: null,
      status: 'active',
      dailyRate: 200,
      totalAmount: 1400,
      paid: 700,
      lateFee: 0
    },
    {
      id: 'R002',
      userId: 1003,
      userName: 'Mark Johnson',
      gadgetId: 'G007',
      gadgetName: 'GoPro Hero 12',
      rentDate: '2026-02-12',
      expectedReturn: '2026-02-15',
      actualReturn: null,
      status: 'overdue',
      dailyRate: 180,
      totalAmount: 540,
      paid: 180,
      lateFee: 180
    },
    {
      id: 'R003',
      userId: 1005,
      userName: 'Robert Chen',
      gadgetId: 'G001',
      gadgetName: 'MacBook Pro 14',
      rentDate: '2026-02-14',
      expectedReturn: '2026-02-16',
      actualReturn: null,
      status: 'active',
      dailyRate: 350,
      totalAmount: 700,
      paid: 350,
      lateFee: 0
    },
    {
      id: 'R004',
      userId: 1002,
      userName: 'Dr. Jane Smith',
      gadgetId: 'G003',
      gadgetName: 'Canon EOS 90D',
      rentDate: '2026-02-05',
      expectedReturn: '2026-02-12',
      actualReturn: '2026-02-12',
      status: 'completed',
      dailyRate: 300,
      totalAmount: 2100,
      paid: 2100,
      lateFee: 0
    },
    {
      id: 'R005',
      userId: 1001,
      userName: 'John Doe',
      gadgetId: 'G005',
      gadgetName: 'Wacom Intuos Pro',
      rentDate: '2026-02-01',
      expectedReturn: '2026-02-08',
      actualReturn: '2026-02-09',
      status: 'completed',
      dailyRate: 150,
      totalAmount: 1200,
      paid: 1200,
      lateFee: 150
    }
  ],

  notifications: [
    {
      id: 'N001',
      userId: 1003,
      title: 'Overdue Rental',
      message: 'Your GoPro rental is overdue. Please return immediately.',
      type: 'warning',
      sentDate: '2026-02-15',
      read: false
    },
    {
      id: 'N002',
      userId: 1004,
      title: 'Registration Approved',
      message: 'Your account has been verified. You can now rent gadgets.',
      type: 'success',
      sentDate: '2026-02-14',
      read: true
    }
  ]
};

export const dbOperations = {
  getAvailableGadgets: () => db.gadgets.filter(g => g.status === 'available'),
  getRentedGadgets: () => db.gadgets.filter(g => g.status === 'rented'),
  getMaintenanceGadgets: () => db.gadgets.filter(g => g.status === 'maintenance'),
  
  getActiveRentals: () => db.rentals.filter(r => r.status === 'active'),
  getOverdueRentals: () => db.rentals.filter(r => r.status === 'overdue'),
  getCompletedRentals: () => db.rentals.filter(r => r.status === 'completed'),
  
  getUserRentals: (userId) => db.rentals.filter(r => r.userId === userId),
  
  getGadgetById: (id) => db.gadgets.find(g => g.id === id),
  
  authenticateUser: (email) => db.mobileUsers.find(u => u.email === email && u.status === 'active'),
  
  createRental: (rentalData) => {
    const newRental = {
      id: `R${String(db.rentals.length + 1).padStart(3, '0')}`,
      ...rentalData,
      rentDate: new Date().toISOString().split('T')[0],
      status: 'active',
      paid: 0,
      lateFee: 0
    };
    db.rentals.push(newRental);
    
    const gadget = db.gadgets.find(g => g.id === rentalData.gadgetId);
    if (gadget) gadget.status = 'rented';
    
    return newRental;
  }
};