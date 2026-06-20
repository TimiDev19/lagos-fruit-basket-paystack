// const axios = require("axios");

// const verifyPayment = async (req, res) => {
//   try {
//     const { reference } = req.body;

//     if (!reference) {
//       return res.status(400).json({
//         success: false,
//         message: "No payment reference provided",
//       });
//     }

//     const response = await axios.get(
//       `https://api.paystack.co/transaction/verify/${reference}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         },
//       }
//     );

//     const data = response.data.data;

//     // IMPORTANT CHECKS
//     if (data.status !== "success") {
//       return res.status(400).json({
//         success: false,
//         message: "Payment not successful",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//       data: {
//         reference: data.reference,
//         amount: data.amount,
//         email: data.customer.email,
//       },
//     });
//   } catch (error) {
//     console.error(error.response?.data || error.message);

//     return res.status(500).json({
//       success: false,
//       message: "Server error verifying payment",
//     });
//   }
// };

// module.exports = { verifyPayment };

const { verifyTransaction } = require("../services/paystack.service");

const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: "No payment reference provided",
      });
    }

    const data = await verifyTransaction(reference);

    if (data.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment not successful",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Server error verifying payment",
    });
  }
};

module.exports = { verifyPayment };