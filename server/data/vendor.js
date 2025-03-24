const vendors = [
  {
      name: "ABC Supplies Pvt Ltd",
      gstin: "29ABCDE1234F1Z5",
      address: {
          street: "Commercial Street",
          area: "MG Road",
          city: "Bengaluru",
          country: "India",
          pincode: "560001"
      },
      phone: "9876543210",
      email: "contact@abcsupplies.com"
  },
  {
      name: "Sharma Traders",
      gstin: "07BCDEF5678G2Y6",
      address: {
          street: "Chandni Chowk",
          area: "Old Delhi",
          city: "New Delhi",
          country: "India",
          pincode: "110006"
      },
      phone: "9811122233",
      email: "sharmatraders@gmail.com"
  },
  {
      name: "Global Tech Solutions",
      gstin: "22HIJK9012L3X4",
      address: {
          street: "IT Park Road",
          area: "Hinjewadi",
          city: "Pune",
          country: "India",
          pincode: "411057"
      },
      phone: "9876549876",
      email: "info@globaltech.com"
  },
  {
      name: "Patel Distributors",
      gstin: "27LMNOP3456Q7W8",
      address: {
          street: "Main Market",
          area: "Andheri West",
          city: "Mumbai",
          country: "India",
          pincode: "400053"
      },
      phone: "9123456789",
      email: "patel.distributors@yahoo.com"
  },
  {
      name: "RK Electricals",
      gstin: "19QRST7890U1V2",
      address: {
          street: "College Street",
          area: "Esplanade",
          city: "Kolkata",
          country: "India",
          pincode: "700073"
      },
      phone: "9830011223",
      email: "rkelectricals@gmail.com"
  },
  {
      name: "Mehta Builders",
      gstin: "06WXYZ1234A5B6",
      address: {
          street: "Linking Road",
          area: "Bandra",
          city: "Mumbai",
          country: "India",
          pincode: "400050"
      },
      phone: "9988994455",
      email: "contact@mehtabuilders.com"
  },
  {
      name: "Tiwari Agro Products",
      gstin: "08CDEF5678G9H0",
      address: {
          street: "Mandi Road",
          area: "Gomti Nagar",
          city: "Lucknow",
          country: "India",
          pincode: "226010"
      },
      phone: "9797979797",
      email: "sales@tiwariagro.com"
  },
  {
      name: "Agarwal Steel Works",
      gstin: "30IJKL9012M3N4",
      address: {
          street: "Guindy Industrial Area",
          area: "Guindy",
          city: "Chennai",
          country: "India",
          pincode: "600032"
      },
      phone: "9876123456",
      email: "agarwalsteel@gmail.com"
  },
  {
      name: "Reddy Constructions",
      gstin: "36OPQR3456S7T8",
      address: {
          street: "Madhapur",
          area: "Hitech City",
          city: "Hyderabad",
          country: "India",
          pincode: "500081"
      },
      phone: "9845671234",
      email: "info@reddyconstructions.com"
  },
  {
      name: "Kapoor Textiles",
      gstin: "09UVWX7890Y1Z2",
      address: {
          street: "Sector 17",
          area: "Chandigarh",
          city: "Chandigarh",
          country: "India",
          pincode: "160017"
      },
      phone: "9812345678",
      email: "kapoor.textiles@yahoo.com"
  },
  {
      name: "Malhotra Food Suppliers",
      gstin: "10ABC1234D5E6F",
      address: {
          street: "Brigade Road",
          area: "Shivajinagar",
          city: "Bengaluru",
          country: "India",
          pincode: "560025"
      },
      phone: "9876789123",
      email: "malhotrafoods@gmail.com"
  },
  {
      name: "Desai Chemicals",
      gstin: "11GHJK5678L9M0",
      address: {
          street: "SG Highway",
          area: "Thaltej",
          city: "Ahmedabad",
          country: "India",
          pincode: "380054"
      },
      phone: "9933445566",
      email: "contact@desaichemicals.com"
  },
  {
      name: "Nair Pharmaceuticals",
      gstin: "12NOPQR9012S3T4",
      address: {
          street: "Marine Drive",
          area: "Fort",
          city: "Mumbai",
          country: "India",
          pincode: "400001"
      },
      phone: "9898989898",
      email: "nairpharma@gmail.com"
  },
  {
      name: "Joshi Engineering Works",
      gstin: "13UVWX3456Y7Z8",
      address: {
          street: "Civil Lines",
          area: "Allahabad",
          city: "Prayagraj",
          country: "India",
          pincode: "211001"
      },
      phone: "9877654321",
      email: "joshi.engworks@example.com"
  },
  {
      name: "Bajpai Stationers",
      gstin: "14ABCDE1234F5G6",
      address: {
          street: "Main Road",
          area: "Fraser Road",
          city: "Patna",
          country: "India",
          pincode: "800001"
      },
      phone: "9765432109",
      email: "bajpaistationers@gmail.com"
  },
  {
      name: "Yadav Transport Services",
      gstin: "15HIJKL7890M1N2",
      address: {
          street: "Transport Nagar",
          area: "NH-30",
          city: "Patna",
          country: "India",
          pincode: "800020"
      },
      phone: "9876453210",
      email: "info@yadavtransport.com"
  },
  {
      name: "Goyal Hardware",
      gstin: "16OPQRS3456T7U8",
      address: {
          street: "Market Road",
          area: "Alkapuri",
          city: "Vadodara",
          country: "India",
          pincode: "390007"
      },
      phone: "9876540987",
      email: "goyalhardware@gmail.com"
  },
  {
      name: "Iyer Electronics",
      gstin: "17VWXYZ7890A1B2",
      address: {
          street: "Anna Salai",
          area: "T. Nagar",
          city: "Chennai",
          country: "India",
          pincode: "600017"
      },
      phone: "9922334455",
      email: "iyerelectronics@example.com"
  },
  {
      name: "Menon Printing Press",
      gstin: "18CDEF1234G5H6I",
      address: {
          street: "Gachibowli",
          area: "Kondapur",
          city: "Hyderabad",
          country: "India",
          pincode: "500032"
      },
      phone: "9876504321",
      email: "menonprinting@gmail.com"
  },
  {
      name: "Saxena Wood Works",
      gstin: "19JKLM5678N9O0P",
      address: {
          street: "Najafgarh Road",
          area: "Kirti Nagar",
          city: "New Delhi",
          country: "India",
          pincode: "110015"
      },
      phone: "9911223344",
      email: "saxenawoodworks@gmail.com"
  }
];

export default vendors;
