const { verifyTransaction } = require("../services/paystack.service");

exports.completeOrder = async (req, res) => {
  try {
    const {
      reference,
      emailParams,
      cart,
      itemNotes,
      pricing,
    } = req.body;

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: "Missing reference",
      });
    }

    const payment = await verifyTransaction(reference);

    if (payment.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    console.log("Verified payment:", payment.reference);

    console.log("Customer:", emailParams.customer_email);

    console.log("Cart:", cart);

    return res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Order processing failed",
    });
  }
};