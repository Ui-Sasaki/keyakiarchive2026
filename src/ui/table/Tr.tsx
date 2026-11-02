export function Tr({ children }: { children: React.ReactNode }) {
  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b last:border-b-0">
      {children}
    </tr>
  );
}
