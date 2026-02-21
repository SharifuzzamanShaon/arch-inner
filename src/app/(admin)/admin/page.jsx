
export default function page() {
  return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">Recent Transactions</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-xs uppercase">
              <th className="p-4">Customer</th>
              <th className="p-4">Status</th>
              <th className="p-4">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="p-4 text-sm">Alex Rivera</td>
              <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Completed</span></td>
              <td className="p-4 text-sm font-medium">$120.00</td>
            </tr>
            <tr>
              <td className="p-4 text-sm">Sarah Chen</td>
              <td className="p-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Pending</span></td>
              <td className="p-4 text-sm font-medium">$850.00</td>
            </tr>
          </tbody>
        </table>
      </div>
  );
}