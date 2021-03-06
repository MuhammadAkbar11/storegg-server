import { validationResult } from "express-validator";
import BaseError, {
  TransfromError,
  ValidationError,
} from "../../helpers/baseError.helper.js";
import {
  createTransaction,
  deleteTransactionById,
  findAllTransaction,
  findTransactionById,
  updateTransaction,
  updateTransactionStatusById,
} from "./transaction.repository.js";

export const index = async (req, res, next) => {
  try {
    const flashdata = req.flash("flashdata");
    const errors = req.flash("errors")[0];
    const transactions = await findAllTransaction();
    res.render("transaction/v_transaction", {
      title: "Transaction",
      path: "/transaction",
      flashdata: flashdata,
      transactions: transactions,
      errors: errors,
      values: null,
    });
  } catch (error) {
    const baseError = new TransfromError(error);
    next(baseError);
  }
};

// export const postTransaction = async (req, res, next) => {
//   const validate = validationResult(req);
//   if (!validate.isEmpty()) {
//     const errValidate = new ValidationError(validate.array(), "", {
//       values: req.body,
//     });
//     // Response Validation Error Here
//     return;
//   }

//   try {
//     const newTransactionData = {
//       historyVoucherTopup: "HistoryVoucherTopup Data",
//       historyPayment: "HistoryPayment Data",
//       name: "Name Data",
//       accountUser: "AccountUser Data",
//       tax: "Tax Data",
//       value: "Value Data",
//       status: "Status Data",
//     };

//     await createTransaction(newTransactionData);

//     // Response Success
//   } catch (error) {
//     console.log("[controller] postTransaction ");
//     const trError = new TransfromError(error);
//     next(trError);
//     // Redirect Error
//     // req.flash("flashdata", {
//     //   type: "error",
//     //   title: "Oppps",
//     //   message: "Gagal membuat Transaction",
//     // });
//     // res.redirect("/transaction?action_error=true");
//   }
// };

export const putTransaction = async (req, res, next) => {
  const ID = req.params.id;
  const {
    historyVoucherTopup,
    historyPayment,
    name,
    accountUser,
    tax,
    value,
    status,
  } = req.body;

  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    const errValidate = new ValidationError(validate.array(), "", {
      values: req.body,
    });
    // response error validation
    return;
  }

  try {
    const transaction = await findTransactionById(ID);

    if (!transaction) {
      throw new BaseError(
        "NOT_FOUND",
        404,
        "transaction tidak ditemukan",
        true
      );
    }

    const updatedTransactionData = {
      historyVoucherTopup: historyVoucherTopup,
      historyPayment: historyPayment,
      name: name,
      accountUser: accountUser,
      tax: tax,
      value: value,
      status: status,
    };

    await updateTransaction(ID, updatedTransactionData);

    // Response Success
  } catch (error) {
    const trError = new TransfromError(error);
    next(trError);
  }
};

export const updateTransactionStatus = async (req, res, next) => {
  const ID = req.params.id;
  const { status } = req.body;
  const statusTypes = {
    failed: "Membatalkan",
    success: "Menerima",
  };

  try {
    const transaction = await findTransactionById(ID);

    if (!transaction) {
      req.flash("flashdata", {
        type: "error",
        title: "Oppss",
        message: `Gagal ${statusTypes[status]} Transaksi, karena Transaksi dengan ID <strong>${ID}</strong> tidak di temukan`,
      });
      res.redirect(`/transaction?action_error=true`);
      return;
    }

    const message = `Berhasil ${statusTypes[status]} Transaksi`;

    await updateTransactionStatusById(ID, status);

    req.flash("flashdata", {
      type: "success",
      title: "Berhasil!",
      message: message,
    });
    res.redirect("/transaction");
  } catch (error) {
    console.log(error);
    req.flash("flashdata", {
      type: "error",
      title: "Oppps!",
      message: `Gagal ${statusTypes[status]} Transaksi `,
    });
    res.redirect(`/transaction?action_error=true`);
  }
};

// export const deleteTransaction = async (req, res, next) => {
//   const ID = req.params.id;

//   try {
//     const transaction = await findTransactionById(ID);

//     if (!transaction) {
//       // response here
//       return;
//     }

//     await deleteTransactionById(ID);

//     // Response Success
//   } catch (error) {
//     const trError = new TransfromError(error);
//     next(trError);
//   }
// };
