import { Router } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import demoDataService from '../services/demoDataService';

const router = Router();

// Read demo data from JSON files
// const getStudents = () => {
//   try {
//     const data = readFileSync(join(__dirname, '../data/students.json'), 'utf8');
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// };

// const demoDataService.getCourses = () => {
//   try {
//     const data = readFileSync(join(__dirname, '../data/courses.json'), 'utf8');
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// };

// const getStaff = () => {
//   try {
//     const data = readFileSync(join(__dirname, '../data/staff.json'), 'utf8');
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// };

// const getPayments = () => {
//   try {
//     const data = readFileSync(join(__dirname, '../data/payments.json'), 'utf8');
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// };

// const demoDataService.getBranches = () => {
//   try {
//     const data = readFileSync(join(__dirname, '../data/branches.json'), 'utf8');
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// };

// const getApplications = () => {
//   try {
//     const data = readFileSync(join(__dirname, '../data/applications.json'), 'utf8');
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// };

// Helper function to filter and paginate
const filterAndPaginate = (data: any[], filters: any, page: number = 1, limit: number = 10) => {
  let filteredData = [...data];

  // Apply filters
  if (filters.branchId) {
    filteredData = filteredData.filter(item => item.branchId === filters.branchId);
  }
  if (filters.courseId) {
    filteredData = filteredData.filter(item => item.courseId === filters.courseId);
  }
  if (filters.status) {
    filteredData = filteredData.filter(item => item.status === filters.status);
  }
  if (filters.role) {
    filteredData = filteredData.filter(item => item.role === filters.role);
  }
  if (filters.department) {
    filteredData = filteredData.filter(item => item.department === filters.department);
  }
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredData = filteredData.filter(item => 
      JSON.stringify(item).toLowerCase().includes(searchTerm)
    );
  }
  if (filters.startDate) {
    filteredData = filteredData.filter(item => item.date >= filters.startDate);
  }
  if (filters.endDate) {
    filteredData = filteredData.filter(item => item.date <= filters.endDate);
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: filteredData.length,
    page,
    totalPages: Math.ceil(filteredData.length / limit)
  };
};

// Helper function to enrich data with related entities
const enrichData = (data: any[], type: string) => {
  const branches = demoDataService.getBranches();
  const courses = demoDataService.getCourses();
  const students = demoDataService.getStudents();
  const staff = demoDataService.getStaff();

  return data.map(item => {
    const enriched = { ...item };

    // Add branch information
    if (item.branchId) {
      enriched.branch = branches.find(b => b.id === item.branchId);
    }

    // Add course information
    if (item.courseId) {
      enriched.course = courses.find(c => c.id === item.courseId);
    }

    // Add student information
    if (item.studentId) {
      enriched.student = students.find(s => s.id === item.studentId);
    }

    // Add staff information
    if (item.lecturerId) {
      enriched.lecturer = staff.find(s => s.id === item.lecturerId);
    }

    return enriched;
  });
};

// Student routes
router.get('/students', (req, res) => {
  try {
    const { page = 1, limit = 10, branchId, courseId, status, search } = req.query;
    const students = demoDataService.getStudents();
    const enrichedStudents = enrichData(students, 'student');
    
    const result = filterAndPaginate(enrichedStudents, {
      branchId,
      courseId,
      status,
      search
    }, Number(page), Number(limit));

    res.json({
      success: true,
      message: 'Students retrieved successfully',
      data: {
        students: result.data,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.get('/students/:id', (req, res) => {
  try {
    const { id } = req.params;
    const students = demoDataService.getStudents();
    const enrichedStudents = enrichData(students, 'student');
    const student = enrichedStudents.find(s => s.id === id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student retrieved successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve student',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.post('/students', (req, res) => {
  try {
    const students = demoDataService.getStudents();
    const newStudent = {
      id: `student-${students.length + 1}`,
      studentId: `STU${String(students.length + 1).padStart(4, '0')}`,
      ...req.body,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    students.push(newStudent);

    res.json({
      success: true,
      message: 'Student created successfully',
      data: enrichData([newStudent], 'student')[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.put('/students/:id', (req, res) => {
  try {
    const { id } = req.params;
    const students = demoDataService.getStudents();
    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    students[studentIndex] = { ...students[studentIndex], ...req.body };

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: enrichData([students[studentIndex]], 'student')[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update student',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.delete('/students/:id', (req, res) => {
  try {
    const { id } = req.params;
    const students = demoDataService.getStudents();
    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    students.splice(studentIndex, 1);

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Course routes
router.get('/courses', (req, res) => {
  try {
    const { page = 1, limit = 10, branchId, lecturerId, search } = req.query;
    const courses = demoDataService.getCourses();
    const enrichedCourses = enrichData(courses, 'course');
    
    const result = filterAndPaginate(enrichedCourses, {
      branchId,
      lecturerId: lecturerId,
      search
    }, Number(page), Number(limit));

    res.json({
      success: true,
      message: 'Courses retrieved successfully',
      data: {
        courses: result.data,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve courses',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.get('/courses/:id', (req, res) => {
  try {
    const { id } = req.params;
    const courses = demoDataService.getCourses();
    const enrichedCourses = enrichData(courses, 'course');
    const course = enrichedCourses.find(c => c.id === id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course retrieved successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve course',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.post('/courses', (req, res) => {
  try {
    const courses = demoDataService.getCourses();
    const newCourse = {
      id: `course-${courses.length + 1}`,
      ...req.body,
      isActive: true
    };

    courses.push(newCourse);

    res.json({
      success: true,
      message: 'Course created successfully',
      data: enrichData([newCourse], 'course')[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create course',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.put('/courses/:id', (req, res) => {
  try {
    const { id } = req.params;
    const courses = demoDataService.getCourses();
    const courseIndex = courses.findIndex(c => c.id === id);

    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    courses[courseIndex] = { ...courses[courseIndex], ...req.body };

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: enrichData([courses[courseIndex]], 'course')[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update course',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.delete('/courses/:id', (req, res) => {
  try {
    const { id } = req.params;
    const courses = demoDataService.getCourses();
    const courseIndex = courses.findIndex(c => c.id === id);

    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    courses.splice(courseIndex, 1);

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete course',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Staff routes
router.get('/staff', (req, res) => {
  try {
    const { page = 1, limit = 10, branchId, role, department, search } = req.query;
    const staff = demoDataService.getStaff();
    const enrichedStaff = enrichData(staff, 'staff');
    
    const result = filterAndPaginate(enrichedStaff, {
      branchId,
      role,
      department,
      search
    }, Number(page), Number(limit));

    res.json({
      success: true,
      message: 'Staff retrieved successfully',
      data: {
        staff: result.data,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve staff',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.get('/staff/:id', (req, res) => {
  try {
    const { id } = req.params;
    const staff = demoDataService.getStaff();
    const enrichedStaff = enrichData(staff, 'staff');
    const staffMember = enrichedStaff.find(s => s.id === id);

    if (!staffMember) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      message: 'Staff member retrieved successfully',
      data: staffMember
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve staff member',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.post('/staff', (req, res) => {
  try {
    const staff = demoDataService.getStaff();
    const newStaff = {
      id: `staff-${staff.length + 1}`,
      staffId: `STF${String(staff.length + 1).padStart(4, '0')}`,
      ...req.body,
      isActive: true,
      hireDate: new Date().toISOString().split('T')[0]
    };

    staff.push(newStaff);

    res.json({
      success: true,
      message: 'Staff member created successfully',
      data: enrichData([newStaff], 'staff')[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create staff member',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.put('/staff/:id', (req, res) => {
  try {
    const { id } = req.params;
    const staff = demoDataService.getStaff();
    const staffIndex = staff.findIndex(s => s.id === id);

    if (staffIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    staff[staffIndex] = { ...staff[staffIndex], ...req.body };

    res.json({
      success: true,
      message: 'Staff member updated successfully',
      data: enrichData([staff[staffIndex]], 'staff')[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update staff member',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.delete('/staff/:id', (req, res) => {
  try {
    const { id } = req.params;
    const staff = demoDataService.getStaff();
    const staffIndex = staff.findIndex(s => s.id === id);

    if (staffIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    staff.splice(staffIndex, 1);

    res.json({
      success: true,
      message: 'Staff member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete staff member',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Payment routes
router.get('/payments', (req, res) => {
  try {
    const { page = 1, limit = 10, branchId, studentId, status, startDate, endDate } = req.query;
    const payments = demoDataService.getPayments();
    const enrichedPayments = enrichData(payments, 'payment');
    
    const result = filterAndPaginate(enrichedPayments, {
      branchId,
      studentId,
      status,
      startDate,
      endDate
    }, Number(page), Number(limit));

    res.json({
      success: true,
      message: 'Payments retrieved successfully',
      data: {
        payments: result.data,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve payments',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.get('/payments/:id', (req, res) => {
  try {
    const { id } = req.params;
    const payments = demoDataService.getPayments();
    const enrichedPayments = enrichData(payments, 'payment');
    const payment = enrichedPayments.find(p => p.id === id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      message: 'Payment retrieved successfully',
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve payment',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.post('/payments', (req, res) => {
  try {
    const payments = demoDataService.getPayments();
    const branches = demoDataService.getBranches();
    const newPayment = {
      id: `payment-${payments.length + 1}`,
      receiptNumber: `RCP${String(payments.length + 1001).padStart(4, '0')}`,
      ...req.body,
      status: 'completed',
      createdBy: 'admin'
    };

    payments.push(newPayment);

    res.json({
      success: true,
      message: 'Payment recorded successfully',
      data: enrichData([newPayment], 'payment')[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to record payment',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Branch routes
router.get('/branches', (req, res) => {
  try {
    const branches = demoDataService.getBranches();

    res.json({
      success: true,
      message: 'Branches retrieved successfully',
      data: branches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve branches',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.get('/branches/:id', (req, res) => {
  try {
    const { id } = req.params;
    const branches = demoDataService.getBranches();
    const branch = branches.find(b => b.id === id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    res.json({
      success: true,
      message: 'Branch retrieved successfully',
      data: branch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve branch',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Application routes
router.get('/applications', (req, res) => {
  try {
    const { page = 1, limit = 10, branchId, courseId, status, search } = req.query;
    const applications = demoDataService.getApplications();
    const enrichedApplications = enrichData(applications, 'application');
    
    const result = filterAndPaginate(enrichedApplications, {
      branchId,
      courseId,
      status,
      search
    }, Number(page), Number(limit));

    res.json({
      success: true,
      message: 'Applications retrieved successfully',
      data: {
        applications: result.data,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve applications',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.get('/applications/:id', (req, res) => {
  try {
    const { id } = req.params;
    const applications = demoDataService.findApplicationById(id);
    const enrichedApplications = enrichData(applications, 'application');
    const application = enrichedApplications.find(a => a.id === id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application retrieved successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve application',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.put('/applications/:id', (req, res) => {
  try {
    const { id } = req.params;
    const applications = demoDataService.getApplications();
    // const applications = demoDataService.updateApplication(id, req.body);
    const applicationIndex = applications.findIndex(a => a.id === id);

    if (applicationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    applications[applicationIndex] = { ...applications[applicationIndex], ...req.body };

    res.json({
      success: true,
      message: 'Application updated successfully',
      data: enrichData([applications[applicationIndex]], 'application')[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update application',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.post('/applications/:id/convert', (req, res) => {
  try {
    const { id } = req.params;
    // const applications = degetApplications();
    const applications = demoDataService.getApplications();
    const students = demoDataService.getStudents();
    const applicationIndex = applications.findIndex(a => a.id === id);

    if (applicationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    const application = applications[applicationIndex];
    
    // Convert application to student
    const newStudent = {
      id: `student-${students.length + 1}`,
      studentId: `STU${String(students.length + 1).padStart(4, '0')}`,
      fullName: application.fullName,
      email: application.email,
      phoneNumber: application.phoneNumber,
      gender: application.gender,
      dateOfBirth: application.dateOfBirth,
      address: application.address,
      branchId: application.preferredBranchId,
      courseId: application.preferredCourseId,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    students.push(newStudent);
    application.status = 'converted';

    res.json({
      success: true,
      message: 'Application converted to student successfully',
      data: enrichData([newStudent], 'student')[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to convert application',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
