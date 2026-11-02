export function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
    >
      {children}
    </th>
  );
}
