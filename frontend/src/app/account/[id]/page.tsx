import AccountDetail from '@/container/detail'
import Header from '@/layouts/header'
type DetailProps = {}

const Detail: React.FC<DetailProps> = () => {
  return (
    <>
      <div className='mb-[var(--header-height)]'>
        <Header />
      </div>
      <AccountDetail />
    </>
  )
}

export default Detail
