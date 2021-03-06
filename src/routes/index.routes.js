import { ensureAuth } from "../middleware/auth.js";
import APIsRoutes from "../modules/api/api.routes.js";
import BankRoutes from "../modules/bank/bank.routes.js";
import CategoryRoutes from "../modules/category/category.routes.js";
import NominalRoutes from "../modules/nominal/nominal.routes.js";
import PaymentRoutes from "../modules/payment/payment.routes.js";
import TransactionRoutes from "../modules/transaction/transaction.routes.js";
import UserRoutes from "../modules/user/user.routes.js";
import VoucherRoutes from "../modules/voucher/voucher.routes.js";

function MainRoutes(app) {
  app.get("/", ensureAuth, (req, res) => {
    res.render("index", {
      title: "Welcome",
      path: "/",
    });
  });

  UserRoutes(app);
  CategoryRoutes(app);
  NominalRoutes(app);
  VoucherRoutes(app);
  BankRoutes(app);
  PaymentRoutes(app);
  TransactionRoutes(app);

  // APIs
  APIsRoutes(app);
}

export default MainRoutes;
