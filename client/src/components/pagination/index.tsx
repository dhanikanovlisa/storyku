import {
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
} from "../ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  handlePrev: () => void;
  handleNext: () => void;
  length: number;
  last_page: number;
  setPage: (page: number) => void;
}
const PaginationComponent = ({
  page,
  handlePrev,
  handleNext,
  length,
  last_page,
  setPage,
}: PaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" onClick={handlePrev}>
            <ChevronLeft />
          </PaginationLink>
        </PaginationItem>
        {/* Page Numbers with Ellipsis */}
        {page > 2 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => setPage(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {Array.from({ length: length }, (_, i) => {
          const pageNumber = i + 1;
          if (
            pageNumber === page || // Current page
            pageNumber === page - 1 || // Previous page
            pageNumber === page + 1 // Next page
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  onClick={() => setPage(pageNumber)}
                  isActive={page === pageNumber}
                  className={
                    page === pageNumber
                      ? "bg-black text-white border-2 border-neutral-500"
                      : ""
                  }
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          }
          return null;
        })}

        {page < last_page - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page < last_page - 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => setPage(last_page)}>
              {last_page}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next and Last Buttons */}
        <PaginationItem>
          <PaginationLink href="#" onClick={handleNext}>
            <ChevronRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
