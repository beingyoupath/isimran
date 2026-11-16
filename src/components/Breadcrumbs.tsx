import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-2.5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <ol className="flex items-center flex-wrap gap-1 text-xs text-stone-700">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="hover:text-[#0B3A42] inline-flex items-center gap-1 transition-colors min-h-[44px] sm:min-h-0 px-1"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.url} className="inline-flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" aria-hidden="true" />
              {isLast ? (
                <span
                  className="text-[#0B3A42] font-semibold truncate max-w-[220px] sm:max-w-none px-1"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-[#0B3A42] transition-colors truncate max-w-[200px] sm:max-w-none min-h-[44px] sm:min-h-0 inline-flex items-center px-1"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
