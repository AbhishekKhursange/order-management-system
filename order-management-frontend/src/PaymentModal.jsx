import { useState } from "react";

function PaymentModal({ total, onSuccess, onClose }) {
    const [method, setMethod] = useState("card");
    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState({
        number: "", name: "", expiry: "", cvv: ""
    });
    const [upiId, setUpiId] = useState("abhishekkhursange139@okaxis");
    const [bank, setBank] = useState("");
    const [copied, setCopied] = useState(false);

    const formatCardNumber = (value) => {
        return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    };

    const formatExpiry = (value) => {
        const cleaned = value.replace(/\D/g, "").slice(0, 4);
        if (cleaned.length >= 2) return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
        return cleaned;
    };

    const handlePay = () => {
        // Validate based on method
        if (method === "card") {
            const rawNum = cardData.number.replace(/\s/g, "");
            if (rawNum.length < 16) return alert("Enter valid 16-digit card number");
            if (!cardData.name.trim()) return alert("Enter cardholder name");
            if (cardData.expiry.length < 5) return alert("Enter valid expiry date");
            if (cardData.cvv.length < 3) return alert("Enter valid CVV");
        }
        if (method === "upi") {
            if (!upiId.includes("@")) return alert("Enter valid UPI ID (e.g. name@upi)");
        }
        if (method === "netbanking") {
            if (!bank) return alert("Please select a bank");
        }

        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            onSuccess();
        }, 2000);
    };

    const banks = [
        "State Bank of India", "HDFC Bank", "ICICI Bank",
        "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank",
        "Bank of Baroda", "Canara Bank", "IndusInd Bank", "Yes Bank"
    ];

    return (
        <div style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem"
        }}>
            <div className="card border-0 shadow-lg w-100" style={{ maxWidth: "480px", borderRadius: "20px" }}>
                <div className="card-body p-0">

                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
                        <div>
                            <h5 className="fw-bold mb-0">Complete Payment</h5>
                            <p className="text-secondary mb-0 small">Amount: <span className="fw-bold text-primary">₹{total?.toLocaleString("en-IN")}</span></p>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary"
                            style={{ borderRadius: "8px" }} onClick={onClose}>✕</button>
                    </div>

                    {/* Payment Method Tabs */}
                    <div className="d-flex border-bottom">
                        {[
                            { id: "card", icon: "💳", label: "Card" },
                            { id: "upi", icon: "📱", label: "UPI" },
                            { id: "netbanking", icon: "🏦", label: "Net Banking" },
                        ].map((tab) => (
                            <button key={tab.id}
                                onClick={() => setMethod(tab.id)}
                                style={{
                                    flex: 1, border: "none", padding: "0.85rem 0.5rem",
                                    background: method === tab.id ? "#f0f9ff" : "white",
                                    borderBottom: method === tab.id ? "2px solid #0ea5e9" : "2px solid transparent",
                                    color: method === tab.id ? "#0ea5e9" : "#64748b",
                                    fontWeight: method === tab.id ? 600 : 400,
                                    fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s"
                                }}>
                                <div>{tab.icon}</div>
                                <div>{tab.label}</div>
                            </button>
                        ))}
                    </div>

                    <div className="p-4">

                        {/* ── CARD FORM ── */}
                        {method === "card" && (
                            <div className="d-flex flex-column gap-3">

                                {/* Card Preview */}
                                <div className="p-3 rounded-3 text-white mb-2"
                                    style={{
                                        background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
                                        minHeight: "80px"
                                    }}>
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>CARD NUMBER</span>
                                        <span style={{ fontSize: "1.2rem" }}>💳</span>
                                    </div>
                                    <div className="fw-bold" style={{ letterSpacing: "2px", fontSize: "0.95rem" }}>
                                        {cardData.number || "•••• •••• •••• ••••"}
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                                            {cardData.name || "CARDHOLDER NAME"}
                                        </span>
                                        <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                                            {cardData.expiry || "MM/YY"}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label fw-semibold small">Card Number</label>
                                    <input className="form-control" placeholder="1234 5678 9012 3456"
                                        value={cardData.number}
                                        onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                                        style={{ borderRadius: "8px", letterSpacing: "1px" }}
                                        maxLength={19} />
                                </div>

                                <div>
                                    <label className="form-label fw-semibold small">Cardholder Name</label>
                                    <input className="form-control" placeholder="Name as on card"
                                        value={cardData.name}
                                        onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                                        style={{ borderRadius: "8px" }} />
                                </div>

                                <div className="row g-3">
                                    <div className="col-6">
                                        <label className="form-label fw-semibold small">Expiry Date</label>
                                        <input className="form-control" placeholder="MM/YY"
                                            value={cardData.expiry}
                                            onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                                            style={{ borderRadius: "8px" }} maxLength={5} />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-semibold small">CVV</label>
                                        <input className="form-control" placeholder="•••"
                                            type="password"
                                            value={cardData.cvv}
                                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                                            style={{ borderRadius: "8px" }} maxLength={4} />
                                    </div>
                                </div>

                                {/* Accepted cards */}
                                <div className="d-flex gap-2 align-items-center">
                                    <span className="text-secondary small">Accepted:</span>
                                    {["VISA", "MC", "AMEX", "RuPay"].map((c) => (
                                        <span key={c} className="badge bg-light text-dark border"
                                            style={{ fontSize: "0.65rem" }}>{c}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── UPI FORM ── */}
                        {method === "upi" && (
                            <div className="d-flex flex-column gap-3">

                                {/* QR Code */}
                                <div className="text-center p-4 rounded-3" style={{ background: "#f8fafc" }}>
                                    <div style={{
                                        width: "180px", height: "180px", margin: "0 auto",
                                        background: "white", border: "2px solid #e2e8f0",
                                        borderRadius: "12px", overflow: "hidden", padding: "8px"
                                    }}>
                                        {/* Simulated QR pattern */}
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=abhishekkhursange139@okaxis%26pn=ShopEasy%26am=${total}%26tn=ShopEasyOrder`}
                                            alt="UPI QR Code"
                                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        />
                                    </div>
                                    <p className="text-secondary small mt-2 mb-0">
                                        Scan with any UPI app
                                    </p>
                                </div>

                                <div className="text-center text-secondary small">— or pay using UPI ID —</div>

                                <div>
                                    <label className="form-label fw-semibold small">Pay to UPI ID</label>
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            value="abhishekkhursange139@okaxis"
                                            readOnly
                                            style={{
                                                borderRadius: "8px 0 0 8px",
                                                background: "#f8fafc",
                                                color: "#0f172a",
                                                fontWeight: 500,
                                                cursor: "default"
                                            }}
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            style={{ borderRadius: "0 8px 8px 0" }}
                                            onClick={() => {
                                                navigator.clipboard.writeText("abhishekkhursange139@okaxis");
                                                setCopied(true);
                                                setTimeout(() => setCopied(false), 2000);
                                            }}
                                        >
                                            {copied ? "✅ Copied" : "📋 Copy"}
                                        </button>
                                    </div>
                                    <div className="text-secondary mt-1" style={{ fontSize: "0.75rem" }}>
                                        Open any UPI app → Pay → Enter this UPI ID
                                    </div>
                                </div>

                                {/* UPI Apps */}
                                <div>
                                    <p className="fw-semibold small mb-2">Open UPI App</p>
                                    <div className="d-flex gap-2 flex-wrap">
                                        {[
                                            { name: "GPay", emoji: "🟢" },
                                            { name: "PhonePe", emoji: "🟣" },
                                            { name: "Paytm", emoji: "🔵" },
                                            { name: "BHIM", emoji: "🟠" },
                                        ].map((app) => (
                                            <div key={app.name}
                                                className="px-3 py-2 rounded-3 text-center"
                                                style={{
                                                    background: "#f1f5f9",
                                                    fontSize: "0.8rem",
                                                    fontWeight: 500,
                                                    color: "#334155"
                                                }}>
                                                {app.emoji} {app.name}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-secondary mt-2 mb-0" style={{ fontSize: "0.75rem" }}>
                                        Open any app above → Scan QR or enter UPI ID → Pay ₹{total?.toLocaleString("en-IN")}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ── NET BANKING FORM ── */}
                        {method === "netbanking" && (
                            <div className="d-flex flex-column gap-3">
                                <p className="text-secondary small mb-0">
                                    Select your bank to proceed with net banking payment.
                                </p>

                                {/* Popular Banks Grid */}
                                <div className="row g-2">
                                    {["SBI", "HDFC", "ICICI", "Axis"].map((b) => (
                                        <div className="col-6" key={b}>
                                            <button
                                                onClick={() => setBank(b)}
                                                className="btn w-100 text-start"
                                                style={{
                                                    borderRadius: "10px", padding: "0.75rem",
                                                    border: bank === b ? "2px solid #0ea5e9" : "1px solid #e2e8f0",
                                                    background: bank === b ? "#f0f9ff" : "white",
                                                    color: bank === b ? "#0ea5e9" : "#1e293b",
                                                    fontWeight: bank === b ? 600 : 400,
                                                    transition: "all 0.2s"
                                                }}>
                                                🏦 {b}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <label className="form-label fw-semibold small">Or select other bank</label>
                                    <select className="form-select" value={bank}
                                        onChange={(e) => setBank(e.target.value)}
                                        style={{ borderRadius: "8px" }}>
                                        <option value="">-- Select Bank --</option>
                                        {banks.map((b) => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </div>

                                {bank && (
                                    <div className="p-3 rounded-3 d-flex align-items-center gap-2"
                                        style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
                                        <span>🏦</span>
                                        <span className="small">You will be redirected to <strong>{bank}</strong> portal to complete payment.</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Pay Button */}
                        <button
                            className="btn w-100 fw-bold text-white border-0 mt-4"
                            style={{
                                background: loading ? "#94a3b8" : "linear-gradient(135deg, #22c55e, #16a34a)",
                                borderRadius: "10px", padding: "0.85rem", fontSize: "1rem"
                            }}
                            onClick={handlePay}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="d-flex align-items-center justify-content-center gap-2">
                                    <span className="spinner-border spinner-border-sm"></span>
                                    Processing Payment...
                                </span>
                            ) : (
                                `Pay ₹${total?.toLocaleString("en-IN")}`
                            )}
                        </button>

                        {/* Security badge */}
                        <div className="text-center mt-3">
                            <span className="text-secondary" style={{ fontSize: "0.75rem" }}>
                                🔒 Secured by 256-bit SSL encryption
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentModal;