import React from 'react'
import styles from './styles.module.css'

// version: 0.2.0 - 04/29/2021

type BaseProps = {
  children?: React.ReactElement[] | React.ReactElement | string
  className?: string
  onClick?: () => void
  isLoading?: boolean
  style?: object
}

/* <Button>label</Button> */
export type ButtonProps = BaseProps & {
  type?: 'button' | 'submit' | undefined
  primary?: boolean
  width?: number
}
export const Button = ({
  type,
  onClick,
  children,
  className,
  isLoading,
  primary,
  width,
  style
}: ButtonProps) => {
  let cn =
    'mt-3 w-full inline-flex justify-center rounded-sm border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
  if (primary) {
    cn = `w-full inline-flex justify-center rounded-sm border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm`
  }
  return (
    <span className='inline-flex items-center'>
      <button
        type={type || 'button'}
        onClick={onClick}
        className={`${cn} ${className}`}
        style={{ width: width || 'auto', ...style }}
      >
        {children}
      </button>
      {isLoading ? <Spinner /> : null}
    </span>
  )
}

/* <Dropdown label={'name'}><Child1 />...</Dropdown> */
type DropdownProps = BaseProps & {
  label?: React.ReactElement | string
}
export const Dropdown = ({ label = 'label', children }: DropdownProps) => {
  return (
    <div>
      <div className={`${styles.dropdown} inline-block relative`}>
        <button className='font-semibold pt-1 pb-2 px-4 rounded inline-flex items-center rounded-sm border border-gray-300'>
          <span className='mr-1'>{label}</span>
          <svg
            className='fill-current h-4 w-4 mt-1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />{' '}
          </svg>
        </button>
        <ul
          className={`${styles.dropdownMenu} absolute hidden text-gray-700 pt-1`}
        >
          {React.Children.map(children, (child: any) => (
            <li className=''>
              <a
                className='rounded-b bg-gray-100 hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap'
                href='#'
              >
                {child}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* <Spinner /> */
export const Spinner = () => (
  <svg
    className='animate-spin ml-2 mr-2 h-5 w-5 text-gray'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    ></circle>
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    ></path>
  </svg>
)

/* <Accordion openValue={true} /> */
export const Accordion = ({
  openValue,
  label,
  children
}: {
  openValue: boolean
  label: React.ReactElement | string
  children: React.ReactElement
}) => {
  // source: https://codepen.io/QJan84/pen/zYvRMMw
  const openCount = React.useRef(0)
  const [open, setOpen] = React.useState(openValue)
  React.useEffect(() => {
    setOpen(openValue)
    if (openValue) {
      openCount.current++
    }
  }, [openValue])
  return (
    <div className='' x-data='{selected:null}'>
      <ul className='shadow-box'>
        <li className='relative border-b border-gray-200'>
          <button
            type='button'
            className='w-full'
            onClick={() => {
              setOpen(!open)
              if (openValue) {
                openCount.current++
              }
            }}
          >
            <div className='flex items-center justify-between'>
              <span>{label}</span>
              <span>{open ? '-' : '+'}</span>
            </div>
          </button>
          <div
            className={`relative overflow-hidden max-h-0 ${
              openCount.current > 1 ? 'transition-all duration-700' : ''
            }`}
            x-ref='container1'
            style={{ maxHeight: open ? 200 : 0 }}
          >
            {children}
          </div>
        </li>
      </ul>
    </div>
  )
}

// source: https://tailwindui.com/components/application-ui/overlays/modals
export const Modal = ({
  title,
  content,
  onCancel,
  onConfirm
}: {
  title?: string
  content?: any
  onCancel?: () => void
  onConfirm?: () => void
}) => {
  return (
    <div
      className='fixed z-10 inset-0 overflow-y-auto'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          aria-hidden='true'
          onClick={onCancel}
        ></div>
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className=''>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  className='text-lg leading-6 font-medium text-gray-900'
                  id='modal-title'
                >
                  {title || 'Title'}
                </h3>
                <div className='mt-2'>{content || 'Content'}</div>
              </div>
            </div>
          </div>
          <div className='mb-4 bg-gray-50 px-4 sm:px-6 sm:flex sm:flex-row-reverse'>
            <Button primary onClick={onConfirm} width={100}>
              OK
            </Button>
            <Button className='mr-2' onClick={onCancel} width={100}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
