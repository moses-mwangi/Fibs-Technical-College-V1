import { Router, Response, Request } from "express";
import {
  authenticateToken,
  AuthenticatedRequest,
  requireBranchAccess,
} from "../middleware/auth";
import demoDataService from "../services/demoDataService";

const router = Router();

// Get dashboard statistics
router.get(
  "/students",
  async (req: Request, res: Response) => {
    try {
      const student = demoDataService.getStudents();

      res.json({
        success: true,
        data: student,
      });
    } catch (error) {
      console.error("Enrollment stude  error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

router.get(
  "/stats",
  authenticateToken,
  requireBranchAccess,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = req.user!;
      let stats;

      if (user.role === "super_admin") {
        // Super admin sees all branches
        stats = {
          totalStudents: demoDataService.getTotalStudents(),
          activeStudents: demoDataService.getActiveStudents(),
          totalCourses: demoDataService.getTotalCourses(),
          totalStaff: demoDataService.getTotalStaff(),
          feesCollectedToday: demoDataService.getFeesCollectedToday(),
          monthlyRevenue: demoDataService.getMonthlyRevenue(),
          attendancePercentage: demoDataService.getAttendancePercentage(),
        };
      } else {
        // Branch admin and other roles see only their branch
        const branchId = user.branchId!;
        const branchStudents = demoDataService.getStudentsByBranch(branchId);
        const branchStaff = demoDataService.getStaffByBranch(branchId);
        const branchCourses = demoDataService.getCoursesByBranch(branchId);
        const branchPayments = demoDataService.getPaymentsByBranch(branchId);

        stats = {
          totalStudents: branchStudents.length,
          activeStudents: branchStudents.filter((s) => s.status === "active")
            .length,
          totalCourses: branchCourses.length,
          totalStaff: branchStaff.length,
          feesCollectedToday: branchPayments
            .filter(
              (p) =>
                p.paymentDate === new Date().toISOString().split("T")[0] &&
                p.status === "completed",
            )
            .reduce((sum, p) => sum + p.amount, 0),
          monthlyRevenue: branchPayments
            .filter((p) => {
              const paymentDate = new Date(p.paymentDate);
              const currentMonth = new Date().getMonth();
              const currentYear = new Date().getFullYear();
              return (
                paymentDate.getMonth() === currentMonth &&
                paymentDate.getFullYear() === currentYear &&
                p.status === "completed"
              );
            })
            .reduce((sum, p) => sum + p.amount, 0),
          attendancePercentage: demoDataService.getAttendancePercentage(),
        };
      }

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// Get student enrollment trends
router.get(
  "/enrollment-trends",
  authenticateToken,
  requireBranchAccess,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const trends = demoDataService.getStudentEnrollmentTrends();

      res.json({
        success: true,
        data: trends,
      });
    } catch (error) {
      console.error("Enrollment trends error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

// Get monthly revenue trends
router.get(
  "/revenue-trends",
  authenticateToken,
  requireBranchAccess,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const trends = demoDataService.getMonthlyRevenueTrends();

      res.json({
        success: true,
        data: trends,
      });
    } catch (error) {
      console.error("Revenue trends error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

// Get branch comparison
router.get(
  "/branch-comparison",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = req.user!;

      if (user.role !== "super_admin") {
        return res.status(403).json({
          success: false,
          message: "Access denied. Super admin only.",
        });
      }

      const comparison = demoDataService.getBranchComparison();

      res.json({
        success: true,
        data: comparison,
      });
    } catch (error) {
      console.error("Branch comparison error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

// Get recent activities
router.get(
  "/recent-activities",
  authenticateToken,
  requireBranchAccess,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = req.user!;

      interface Activity {
        id: string;
        type: "payment" | "application";
        description: string;
        timestamp: string;
        details: {
          amount?: number;
          method?: string;
          receiptNumber?: string;
          applicationNumber?: string;
          course?: string;
          status?: string;
        };
      }

      let activities: Activity[] = [];

      // Get recent payments
      const payments = demoDataService
        .getPayments()
        .filter(
          (p) => user.role === "super_admin" || p.branchId === user.branchId,
        )
        .sort(
          (a, b) =>
            new Date(b.paymentDate).getTime() -
            new Date(a.paymentDate).getTime(),
        )
        .slice(0, 5);

      payments.forEach((payment) => {
        const student = demoDataService.findStudentById(payment.studentId);
        activities.push({
          id: `payment-${payment.id}`,
          type: "payment",
          description: `Payment of KES ${payment.amount} received from ${student?.fullName || "Unknown Student"}`,
          timestamp: payment.paymentDate,
          details: {
            amount: payment.amount,
            method: payment.paymentMethod,
            receiptNumber: payment.receiptNumber,
          },
        });
      });

      // Get recent applications
      const applications = demoDataService
        .getApplications()
        .filter(
          (a) =>
            user.role === "super_admin" ||
            a.preferredBranchId === user.branchId,
        )
        .sort(
          (a, b) =>
            new Date(b.applicationDate).getTime() -
            new Date(a.applicationDate).getTime(),
        )
        .slice(0, 5);

      applications.forEach((application) => {
        activities.push({
          id: `application-${application.id}`,
          type: "application",
          description: `New application received from ${application.fullName}`,
          timestamp: application.applicationDate,
          details: {
            applicationNumber: application.applicationNumber,
            course:
              demoDataService.findCourseById(application.preferredCourseId)
                ?.name || "Unknown Course",
            status: application.status,
          },
        });
      });

      // Sort all activities by timestamp
      activities.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
      activities = activities.slice(0, 10); // Keep only the 10 most recent

      res.json({
        success: true,
        data: activities,
      });
    } catch (error) {
      console.error("Recent activities error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

export default router;
