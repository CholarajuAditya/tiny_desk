const customers = [
    {
        name: "Rajesh Kumar",
        gstin: "29ABCDE1234F1Z5",
        address: {
            street: "MG Road",
            area: "Indiranagar",
            city: "Bengaluru",
            country: "India",
            pincode: "560038"
        },
        phone: "9876543210",
        email: "rajesh.kumar@example.com"
    },
    {
        name: "Suresh Verma",
        gstin: "07BCDEF5678G2Y6",
        address: {
            street: "Connaught Place",
            area: "Central Delhi",
            city: "New Delhi",
            country: "India",
            pincode: "110001"
        },
        phone: "9876012345",
        email: "suresh.verma@example.com"
    },
    {
        name: "Anjali Sharma",
        gstin: "22HIJK9012L3X4",
        address: {
            street: "FC Road",
            area: "Shivaji Nagar",
            city: "Pune",
            country: "India",
            pincode: "411005"
        },
        phone: "9988776655",
        email: "anjali.sharma@example.com"
    },
    {
        name: "Vikram Patil",
        gstin: "27LMNOP3456Q7W8",
        address: {
            street: "Baner Road",
            area: "Baner",
            city: "Pune",
            country: "India",
            pincode: "411045"
        },
        phone: "9123456789",
        email: "vikram.patil@example.com"
    },
    {
        name: "Ravi Gupta",
        gstin: "19QRST7890U1V2",
        address: {
            street: "Esplanade",
            area: "Park Street",
            city: "Kolkata",
            country: "India",
            pincode: "700016"
        },
        phone: "9830011223",
        email: "ravi.gupta@example.com"
    },
    {
        name: "Sunita Mehta",
        gstin: "06WXYZ1234A5B6",
        address: {
            street: "Marine Drive",
            area: "Churchgate",
            city: "Mumbai",
            country: "India",
            pincode: "400020"
        },
        phone: "9988994455",
        email: "sunita.mehta@example.com"
    },
    {
        name: "Amit Tiwari",
        gstin: "08CDEF5678G9H0",
        address: {
            street: "Hazratganj",
            area: "Lucknow",
            city: "Lucknow",
            country: "India",
            pincode: "226001"
        },
        phone: "9797979797",
        email: "amit.tiwari@example.com"
    },
    {
        name: "Pooja Agarwal",
        gstin: "30IJKL9012M3N4",
        address: {
            street: "Gandhi Nagar",
            area: "Adyar",
            city: "Chennai",
            country: "India",
            pincode: "600020"
        },
        phone: "9876123456",
        email: "pooja.agarwal@example.com"
    },
    {
        name: "Harish Reddy",
        gstin: "36OPQR3456S7T8",
        address: {
            street: "Madhapur Road",
            area: "Hitech City",
            city: "Hyderabad",
            country: "India",
            pincode: "500081"
        },
        phone: "9845671234",
        email: "harish.reddy@example.com"
    },
    {
        name: "Neha Kapoor",
        gstin: "09UVWX7890Y1Z2",
        address: {
            street: "Sector 18",
            area: "Noida",
            city: "Noida",
            country: "India",
            pincode: "201301"
        },
        phone: "9812345678",
        email: "neha.kapoor@example.com"
    },
    {
        name: "Sandeep Malhotra",
        gstin: "10ABC1234D5E6F",
        address: {
            street: "Lalbagh Road",
            area: "Basavanagudi",
            city: "Bengaluru",
            country: "India",
            pincode: "560004"
        },
        phone: "9876789123",
        email: "sandeep.malhotra@example.com"
    },
    {
        name: "Kiran Desai",
        gstin: "11GHJK5678L9M0",
        address: {
            street: "Ashram Road",
            area: "Navrangpura",
            city: "Ahmedabad",
            country: "India",
            pincode: "380009"
        },
        phone: "9933445566",
        email: "kiran.desai@example.com"
    },
    {
        name: "Meera Nair",
        gstin: "12NOPQR9012S3T4",
        address: {
            street: "MG Road",
            area: "Ernakulam",
            city: "Kochi",
            country: "India",
            pincode: "682016"
        },
        phone: "9898989898",
        email: "meera.nair@example.com"
    },
    {
        name: "Arvind Joshi",
        gstin: "13UVWX3456Y7Z8",
        address: {
            street: "Civil Lines",
            area: "Allahabad",
            city: "Prayagraj",
            country: "India",
            pincode: "211001"
        },
        phone: "9877654321",
        email: "arvind.joshi@example.com"
    },
    {
        name: "Sneha Bajpai",
        gstin: "14ABCDE1234F5G6",
        address: {
            street: "Kankarbagh",
            area: "Patna",
            city: "Patna",
            country: "India",
            pincode: "800020"
        },
        phone: "9765432109",
        email: "sneha.bajpai@example.com"
    },
    {
        name: "Manoj Yadav",
        gstin: "15HIJKL7890M1N2",
        address: {
            street: "Boring Road",
            area: "Patliputra",
            city: "Patna",
            country: "India",
            pincode: "800013"
        },
        phone: "9876453210",
        email: "manoj.yadav@example.com"
    },
    {
        name: "Nitin Goyal",
        gstin: "16OPQRS3456T7U8",
        address: {
            street: "Alkapuri",
            area: "Vadodara",
            city: "Vadodara",
            country: "India",
            pincode: "390007"
        },
        phone: "9876540987",
        email: "nitin.goyal@example.com"
    },
    {
        name: "Divya Iyer",
        gstin: "17VWXYZ7890A1B2",
        address: {
            street: "Anna Nagar",
            area: "Chennai",
            city: "Chennai",
            country: "India",
            pincode: "600040"
        },
        phone: "9922334455",
        email: "divya.iyer@example.com"
    },
    {
        name: "Ashok Menon",
        gstin: "18CDEF1234G5H6I",
        address: {
            street: "Gachibowli",
            area: "Hitech City",
            city: "Hyderabad",
            country: "India",
            pincode: "500032"
        },
        phone: "9876504321",
        email: "ashok.menon@example.com"
    },
    {
        name: "Rohit Saxena",
        gstin: "19JKLM5678N9O0P",
        address: {
            street: "Janakpuri",
            area: "West Delhi",
            city: "New Delhi",
            country: "India",
            pincode: "110058"
        },
        phone: "9911223344",
        email: "rohit.saxena@example.com"
    }
];

export default customers;
