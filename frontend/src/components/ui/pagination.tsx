import PaginationComponent from 'rc-pagination'
import '../../../styles/pagination.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
type PaginationProps = {
  pageSize: number
  onChangePage: any
  count: number
  current_page: number
  onSizeChange: any
}

const Pagination: React.FC<PaginationProps> = ({ pageSize, onChangePage, count, current_page, onSizeChange }) => {
  return (
    <div className='pagination flex gap-10'>
      <PaginationComponent
        showSizeChanger
        onChange={onChangePage}
        current={current_page}
        pageSize={pageSize}
        prevIcon={<ChevronLeft className='mx-auto h-full' />}
        nextIcon={<ChevronRight className='mx-auto h-full' />}
        showTitle={false}
        className='flex gap-1'
        total={count}
      />
      <Select value={`${pageSize}`} onValueChange={onSizeChange}>
        <SelectTrigger>
          <SelectValue placeholder={`${pageSize} kết quả`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'10'}>10 Kết quả</SelectItem>
          <SelectItem value='20'>20 Kết quả</SelectItem>
          <SelectItem value='50'>50 Kết quả</SelectItem>
          {/* <SelectItem value="system">System</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  )
}

export default Pagination
