const DocumentList = ({ list, type }) => {
    return (
        <>
            {list.length === 0 ? (
                <h1>No {type}&apos;s raised yet</h1>
            ) : (
                <table className="text-center w-[90%]">
                    <thead className="border-b-2">
                        <tr>
                            <th className="font-semibold pb-2">
                                {type.toUpperCase()} No.
                            </th>
                            <th className="font-semibold pb-2">
                                Delivery Address
                            </th>
                            <th className="font-semibold pb-2">Amount</th>
                            <th className="font-semibold pb-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((doc, index) => {
                            const number =
                                type === "po" ? doc.poNo : doc.invoiceNo;
                            const amount =
                                type === "po" ? doc.total : doc.amount?.total;

                            return (
                                <tr key={index}>
                                    <td className="py-4">{number}</td>
                                    <td className="py-4">
                                        {doc.deliveryTo?.address}
                                    </td>
                                    <td className="py-4">
                                        ₹{amount?.toLocaleString()}
                                    </td>
                                    <td className="py-4">
                                        {new Date(
                                            doc.updatedAt
                                        ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default DocumentList;
