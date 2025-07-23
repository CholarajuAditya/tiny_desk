const Regex = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    GSTIN: /^[A-Za-z0-9]{15}$/,
    pincode: /^[0-9]{6}$/,
    phone: /^[6-9]\d{9}$/,
};

export { Regex };
