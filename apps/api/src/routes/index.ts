import { Router } from 'express';
import authRoutes from './auth';
import dashboardRoutes from './dashboard';
import modulesRoutes from './modules';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'FIBS College Management System API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/modules', modulesRoutes);

// Legacy route support - redirect modules routes to /modules
// router.use('/students', (req, res, next) => {
//   req.url = '/modules' + req.url;
//   modulesRoutes(req, res, next);
// });

router.use('/courses', (req, res, next) => {
  req.url = '/modules' + req.url;
  modulesRoutes(req, res, next);
});

router.use('/staff', (req, res, next) => {
  req.url = '/modules' + req.url;
  modulesRoutes(req, res, next);
});

router.use('/payments', (req, res, next) => {
  req.url = '/modules' + req.url;
  modulesRoutes(req, res, next);
});

router.use('/branches', (req, res, next) => {
  req.url = '/modules' + req.url;
  modulesRoutes(req, res, next);
});

router.use('/applications', (req, res, next) => {
  req.url = '/modules' + req.url;
  modulesRoutes(req, res, next);
});

// API documentation endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'FIBS College Management System API',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /auth/login': 'Login user',
        'GET /auth/me': 'Get current user',
        'POST /auth/change-password': 'Change password',
        'POST /auth/forgot-password': 'Forgot password',
        'POST /auth/logout': 'Logout user'
      },
      dashboard: {
        'GET /dashboard/stats': 'Get dashboard statistics',
        'GET /dashboard/enrollment-trends': 'Get student enrollment trends',
        'GET /dashboard/revenue-trends': 'Get monthly revenue trends',
        'GET /dashboard/branch-comparison': 'Get branch comparison (super admin only)',
        'GET /dashboard/recent-activities': 'Get recent activities'
      },
      students: {
        'GET /students': 'Get students with pagination and filtering',
        'GET /students/:id': 'Get student by ID',
        'POST /students': 'Create new student',
        'PUT /students/:id': 'Update student',
        'DELETE /students/:id': 'Delete student'
      },
      courses: {
        'GET /courses': 'Get courses with pagination and filtering',
        'GET /courses/:id': 'Get course by ID',
        'POST /courses': 'Create new course',
        'PUT /courses/:id': 'Update course',
        'DELETE /courses/:id': 'Delete course'
      },
      staff: {
        'GET /staff': 'Get staff with pagination and filtering',
        'GET /staff/:id': 'Get staff by ID',
        'POST /staff': 'Create new staff',
        'PUT /staff/:id': 'Update staff',
        'DELETE /staff/:id': 'Delete staff'
      },
      payments: {
        'GET /payments': 'Get payments with pagination and filtering',
        'GET /payments/:id': 'Get payment by ID',
        'POST /payments': 'Record new payment'
      },
      branches: {
        'GET /branches': 'Get all branches',
        'GET /branches/:id': 'Get branch by ID'
      },
      applications: {
        'GET /applications': 'Get applications with pagination and filtering',
        'GET /applications/:id': 'Get application by ID',
        'PUT /applications/:id': 'Update application',
        'POST /applications/:id/convert': 'Convert application to student'
      }
    }
  });
});

export default router;
