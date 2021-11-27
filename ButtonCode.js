{/* <PayPalButton
    createOrder={(data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: "10.00"
                },
                description: "Bacon",
            }]
        });
    }}
    onSuccess={(details, data) => {
        alert("Transaction completed by " + details.payer.name.given_name);
        console.log("Transaction completed by " + details.payer.name.given_name);
    }}
    currency = "USD"
    options={{
        clientId: "AYz9JKsZ_TEo5elY-FFAuJRZBg9Nz5cbIhDQp-kGWX_W9SOA5_mAy0TAQ8ZQ1puEWkYJ9czpV9m_2deL",
        currency: "USD"
    }}
/> */}