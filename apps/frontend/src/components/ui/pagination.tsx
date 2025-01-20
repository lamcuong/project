import PaginationComponent from 'rc-pagination'
// import '../../../styles/pagination.css'
import '@expense-management/frontend/styles/pagination.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
type PaginationProps = {
  pageSize: number;
  onChangePage: any;
  count?: number;
  currentPage?: number;
  onSizeChange: any;
};

const Pagination: React.FC<PaginationProps> = ({
  pageSize,
  onChangePage,
  count,
  currentPage,
  onSizeChange,
}) => {
  return (
    <div className="pagination flex gap-10">
      <PaginationComponent
        showSizeChanger
        onChange={onChangePage}
        current={currentPage}
        pageSize={pageSize}
        prevIcon={<ChevronLeft className="mx-auto h-full" />}
        nextIcon={<ChevronRight className="mx-auto h-full" />}
        showTitle={false}
        className="flex gap-1"
        total={count}
      />
    </div>
  );
};

export default Pagination
