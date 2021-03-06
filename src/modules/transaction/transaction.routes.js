import { ensureAuth } from "../../middleware/auth.js";
import {
  index,
  // postTransaction,
  putTransaction,
  updateTransactionStatus,
  // deleteTransaction,
} from "./transaction.controller.js";

import transactionValidation from "./transaction.validator.js";

function TransactionRoutes(app) {
  app.route("/transaction/status/:id").put(ensureAuth, updateTransactionStatus);
  app
    .route("/transaction/:id")
    .put(ensureAuth, transactionValidation, putTransaction);
  // .delete(ensureAuth, deleteTransaction);
  app.route("/transaction").get(ensureAuth, index);
}

export default TransactionRoutes;
