import { Request, Response, Router } from "express";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";
import { User } from "../models";
import demoDataService from "../services/demoDataService";
import { generateToken } from "../utils/jwt";

const router = Router();

// Login endpoint
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    let user;
    let branch = null;

    try {
      // Try to find user in database
      user = await User.findOne({
        where: { email, isActive: true },
        include: ["branch"],
      });
      if (user) {
        branch = user.branchId;
      }
    } catch (dbError) {
      // Fallback to demo data if database is not available
      console.log("Database not available, using demo data");
      const demoUser = demoDataService.findUserByEmail(email);
      if (demoUser && demoUser.isActive) {
        user = demoUser;
        branch = demoUser.branchId
          ? demoDataService.findBranchById(demoUser.branchId)
          : null;
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    let isValidPassword = false;
    if (typeof user.comparePassword === "function") {
      // Database user
      isValidPassword = await user.comparePassword(password);
    } else {
      // Demo user - check against demo passwords
      isValidPassword = await checkDemoPassword(email, password);
    }

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update last login (only for database users)
    if (typeof user.update === "function") {
      await user.update({ lastLogin: new Date() });
    }

    // Generate token
    const token = generateToken(user);

    // Return user data without password
    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      branchId: user.branchId,
      branch: branch,
      phoneNumber: user.phoneNumber,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
    };

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Helper function to check demo passwords
async function checkDemoPassword(
  email: string,
  password: string,
): Promise<boolean> {
  const demoPasswords: { [key: string]: string } = {
    "superadmin@fibscollege.com": "Admin123",
    "eldoretadmin@fibscollege.com": "Admin123",
    "lecturer@fibscollege.com": "Lecturer123",
    "accounts@fibscollege.com": "Accounts123",
  };

  return demoPasswords[email] === password;
}

// Get current user
router.get(
  "/me",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await User.findByPk(req.user!.id, {
        include: ["branch"],
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

// Change password
router.post(
  "/change-password",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password and new password are required",
        });
      }

      const user = await User.findByPk(req.user!.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Verify current password
      const isValidPassword = await user.comparePassword(currentPassword);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

// Forgot password (simulation - would normally send email)
router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      where: { email, isActive: true },
    });

    // Always return success to prevent email enumeration
    res.json({
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Logout (client-side token removal)
router.post(
  "/logout",
  authenticateToken,
  (req: AuthenticatedRequest, res: Response) => {
    res.json({
      success: true,
      message: "Logout successful",
    });
  },
);

export default router;
