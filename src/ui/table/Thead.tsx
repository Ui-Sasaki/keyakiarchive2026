import { twMerge } from "tailwind-merge";

export function Thead({
  cols,
  className,
}: {
  cols: string[];
  className?: string;
}) {
  return (
    <thead
      className={twMerge(
        "text-xs text-gray-700 uppercase bg-gray-50",
        className || "",
      )}
    >
      <tr>
        {cols.map((x, i) => (
          <th scope="col" key={i} className="px-3 lg:px-6 py-3">
            {x.startsWith("_") ? (
              <span className="sr-only">{x.slice(1)}</span>
            ) : (
              x
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}
