import React from "react";
import Layout from "./Layout";
import CompanyLogo from "../assets/images/tfLogo.png";
import "../css/Receipt.css";

const Receipt = ({ cartDetails }) => {
    const hasCart = cartDetails.length !== 0;

    return (
        <Layout>
            <div className="receipt-container">
                <h2 className="receipt-title">{hasCart ? "Receipt" : "Your Receipt"}</h2>
                <hr className="spacer" />

                <div className="receipt-header">
                <div className="receipt-left">
                    {hasCart && (
                    <img src={CompanyLogo} alt="Ticket Forum" className="logo-img" />
                    )}
                    <p className="invoice">Invoice #: {hasCart ? cartDetails.id : "N/A"}</p>
                </div>

                <div className="receipt-right">
                    <h4 className="ship-to-title">Ship To:</h4>
                    {hasCart ? (
                    <>
                        <p className="ship-to-name">
                        {cartDetails.payer.name.given_name} {cartDetails.payer.name.surname}
                        </p>
                        <p className="ship-to-address">
                        {cartDetails.purchase_units[0].shipping.address.address_line_1},&nbsp;
                        {cartDetails.purchase_units[0].shipping.address.admin_area_2},&nbsp;
                        {cartDetails.purchase_units[0].shipping.address.admin_area_1},&nbsp;
                        {cartDetails.purchase_units[0].shipping.address.postal_code}&nbsp;
                        {cartDetails.purchase_units[0].shipping.address.country_code}
                        </p>
                    </>
                    ) : (
                    <>
                        <p className="ship-to-name">N/A</p>
                        <p className="ship-to-address">N/A</p>
                    </>
                    )}
                </div>
                </div>

                {/* Receipt Items Table */}
                <div className="receipt-table-wrapper">
                <table className="receipt-table">
                    <thead>
                    <tr>
                        <th>Item Description</th>
                        <th>Qty</th>
                        <th>Each</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {hasCart ? (
                        cartDetails.purchase_units[0].items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.unit_amount.value}</td>
                            <td>${(item.unit_amount.value * item.quantity).toFixed(2)}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td>N/A</td>
                        <td>-</td>
                        <td>-</td>
                        <td>$0.00</td>
                        </tr>
                    )}

                    {/* Totals */}
                    <tr className="receipt-totals">
                        <td></td>
                        <td></td>
                        <td>Subtotal:</td>
                        <td>{hasCart ? `$${cartDetails.purchase_units[0].amount.value}` : "$0.00"}</td>
                    </tr>
                    <tr className="receipt-totals">
                        <td></td>
                        <td></td>
                        <td>Shipping:</td>
                        <td>$0.00</td>
                    </tr>
                    {hasCart && (
                        <tr className="receipt-total-final">
                        <td></td>
                        <td></td>
                        <td><strong>Total:</strong></td>
                        <td><strong>${cartDetails.purchase_units[0].amount.value}</strong></td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>

                <hr className="spacer" />
                <h3 className="thank-you-message">
                Thanks for shopping with Ticket Forum{hasCart ? "" : "!"}
                </h3>
            </div>
            </Layout>
        );
    };

    export default Receipt;
