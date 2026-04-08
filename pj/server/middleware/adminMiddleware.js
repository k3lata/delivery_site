function adminMiddleware(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
  
    next();
  }
  
  module.exports = adminMiddleware;