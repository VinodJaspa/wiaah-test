
  
  const VoucherTable = ({vouchers}) => {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Voucher History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-xl border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Voucher Code</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">View</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((v, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{v.code}</td>
                  <td className="p-3">{v.date}</td>
                  <td className="p-3">{v.amount}</td>
                  <td className="p-3">
                    <span className="bg-gray-100 px-4 py-1 rounded-full text-sm">
                      {v.status}
                    </span>
                  </td>
                  <td className="p-3 text-green-600 font-medium cursor-pointer">
                    View
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default VoucherTable;
  