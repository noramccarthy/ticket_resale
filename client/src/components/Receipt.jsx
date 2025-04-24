import React from "react";
import Layout from "./Layout"; // Make sure this wraps Navbar and Footer
import CompanyLogo from '../assets/images/tfLogo.png';
import '../css/Receipt.css';

const Receipt = ({ cartDetails }) => {
    const hasCart = cartDetails.length !== 0;

    return (
        <Layout>
            <div className="wrapper">
                <div className="close_container">
                    <a className="link" href="/">
                        <button className="close">
                            {hasCart ? "Close Receipt" : "Home Page"}
                        </button>
                    </a>
                </div>

                <div className="receipt_container">
                    <h1>{hasCart ? "RECEIPT" : "YOUR RECEIPT"}</h1>
                    <hr className="spacer" />
                    <div className="flex">
                        <div className="left">
                            {hasCart && (
                                <img className='logo_img' src={CompanyLogo} alt="Ticket Forum" />
                            )}
                            <h5 className="push_left">
                                Invoice#: {hasCart ? cartDetails.id : "N/A"}
                            </h5>
                        </div>

                        <div className="right">
                            <h4 className="push_left title">Ship To:</h4>
                            {hasCart ? (
                                <>
                                    <h5 className="push_left">
                                        {cartDetails.payer.name.given_name} {cartDetails.payer.name.surname}
                                    </h5>
                                    <h5 className="push_left">
                                        {cartDetails.purchase_units[0].shipping.address.address_line_1}, {cartDetails.purchase_units[0].shipping.address.admin_area_2}, {cartDetails.purchase_units[0].shipping.address.admin_area_1}, {cartDetails.purchase_units[0].shipping.address.postal_code} {cartDetails.purchase_units[0].shipping.address.country_code}
                                    </h5>
                                </>
                            ) : (
                                <>
                                    <h5 className="push_left">N/A</h5>
                                    <h5 className="push_left">N/A</h5>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="receipt_table">
                        <table className="r_table">
                            <thead>
                                <tr className="receipt_row">
                                    <th className="receipt_th_1">Item Desc.</th>
                                    <th className="receipt_th_2">Qty</th>
                                    <th className="receipt_th_3">{hasCart ? "Each" : ""}</th>
                                    <th className="receipt_th_4">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hasCart ? (
                                    cartDetails.purchase_units[0].items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="receipt_td">{item.name}</td>
                                            <td className="receipt_td">{item.quantity}</td>
                                            <td className="receipt_td">{item.unit_amount.value}</td>
                                            <td className="receipt_td">{(item.unit_amount.value * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="receipt_td">N/A</td>
                                        <td className="receipt_td"></td>
                                        <td className="receipt_td"></td>
                                        <td className="receipt_td">$0.00</td>
                                    </tr>
                                )}

                                {/* Totals */}
                                <tr>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td">{hasCart ? "Sub Total:" : "Shipping:"}</td>
                                    <td className="receipt_td">
                                        {hasCart ? `$${cartDetails.purchase_units[0].amount.value}` : "$0.00"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td">{hasCart ? "Shipping:" : "Total:"}</td>
                                    <td className="receipt_td">{hasCart ? "$0.00" : "$0.00"}</td>
                                </tr>
                                {hasCart && (
                                    <tr>
                                        <td className="receipt_td"></td>
                                        <td className="receipt_td"></td>
                                        <td className="receipt_td">Total:</td>
                                        <td className="receipt_td">
                                            <h3>${cartDetails.purchase_units[0].amount.value}</h3>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <hr className="spacer" />
                    <h2 className="thanks">
                        Thanks for shopping with Ticket Forum{hasCart ? "" : "!"}
                    </h2>
                </div>

                <div className="close_container">
                    <a className="link" href="/">
                        <button className="close">
                            {hasCart ? "Close Receipt" : "Home Page"}
                        </button>
                    </a>
                </div>
            </div>
        </Layout>
    );
};

export default Receipt;
