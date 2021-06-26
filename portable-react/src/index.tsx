import React, { CSSProperties } from 'react';
import styles from './styles.module.css';

type BaseProps = {
  children?: React.ReactElement[] | React.ReactElement | string;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  style?: object;
  [x: string]: any;
};

/* Icons.IconName */
export const Icons = {
  Cross: ({ className, ...others }: BaseProps) => (
    <svg className={`fill-current text-gray-600 ${className}`} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...others}>
      <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
    </svg>
  ),
};

/* <Button type="button" onClick={}>label</Button> */
export type ButtonProps = BaseProps & {
  type?: 'button' | 'submit' | 'reset' | undefined;
  primary?: boolean;
  width?: number;
};
export const Button = ({ className, type, onClick, children, isLoading, primary, width, style, ...others }: ButtonProps) => {
  const common = `w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;
  let cn = `${common} hover:bg-gray-200 focus:bg-gray-200`;
  if (primary) {
    cn = `${common} text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700`;
  } else {
    cn = `${common} text-gray-700 bg-white`
  }
  return (
    <span className="inline-flex items-center">
      <button type={type || 'button'} onClick={onClick} className={`${cn} ${className}`} style={{ width: width || 'auto', ...style }} {...others}>
        {children}
      </button>
      {isLoading ? <Spinner /> : null}
    </span>
  );
};

/* <Dropdown label={'name'}><Child1 />...</Dropdown> */
type DropdownProps = BaseProps & { label?: React.ReactElement | string; itemClassName?: string };
export const Dropdown = ({ className, label = 'label', itemClassName, children, ...others }: DropdownProps) => {
  return (
    <div className={className} {...others}>
      <div className={`${styles.dropdown} inline-block relative`}>
        <button className="py-2 px-4 rounded inline-flex items-center rounded-md border border-gray-300">
          <span className="mr-1">{label}</span>
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{' '}
          </svg>
        </button>
        <ul className={`${styles.dropdownMenu} absolute hidden text-gray-700 pt-1`}>
          {React.Children.map(children, (child: any) => (
            <li className={itemClassName}>
              <span className="rounded-b bg-gray-100 hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap cursor-pointer">{child}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* <Spinner /> */
export const Spinner = ({ className, ...others }: BaseProps) => (
  <svg className={`animate-spin ml-2 mr-2 h-5 w-5 text-gray ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...others}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

/* <Accordion openValue={true} label="Heading">Content</Accordion> */
export const Accordion = ({
  className,
  openValue,
  label,
  children,
  ...others
}: BaseProps & {
  openValue: boolean;
  label: React.ReactElement | string;
  children: React.ReactElement;
}) => {
  // source: https://codepen.io/QJan84/pen/zYvRMMw
  const openCount = React.useRef(0);
  const [open, setOpen] = React.useState(openValue);
  React.useEffect(() => {
    setOpen(openValue);
    if (openValue) {
      openCount.current++;
    }
  }, [openValue]);
  return (
    <div className={className} x-data="{selected:null}" {...others}>
      <ul className="shadow-box">
        <li className="relative border-b border-gray-200">
          <button
            type="button"
            className="w-full"
            onClick={() => {
              setOpen(!open);
              if (openValue) {
                openCount.current++;
              }
            }}
          >
            <div className="flex items-center justify-between">
              <span>{label}</span>
              <span>{open ? '-' : '+'}</span>
            </div>
          </button>
          <div className={`relative overflow-hidden max-h-0 ${openCount.current > 1 ? 'transition-all duration-700' : ''}`} x-ref="container1" style={{ maxHeight: open ? 200 : 0 }}>
            {children}
          </div>
        </li>
      </ul>
    </div>
  );
};

// <Modal title="Modal Title" content={<p>Modal Content</p>} onCancel={() => setModalShowed(false)} onConfirm={() => setModalShowed(false)} />
export const Modal = ({ className, title, content, onCancel, onConfirm, cancelLabel, confirmLabel, ...others }:
  BaseProps & { title?: string; content?: any; onCancel?: () => void; onConfirm?: () => void, cancelLabel?: React.ReactElement | string, confirmLabel?: React.ReactElement | string }) => {
  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${className}`} aria-labelledby="modal-title" role="dialog" aria-modal="true" {...others}>
      <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onCancel}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className={`${styles.modalMain} inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
              <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {title || 'Title'}
                </h3>
                <div className="mt-2">{content || 'Content'}</div>
              </div>
            </div>
          </div>
          <div className="mb-4 bg-gray-50 px-4 sm:px-6 sm:flex sm:flex-row-reverse">
            {onConfirm && (
              <Button primary onClick={onConfirm} width={100}>
                {confirmLabel || 'OK'}
              </Button>
            )}
            {onCancel && (
              <Button className="mr-2" onClick={onCancel} width={100}>
                {cancelLabel || 'Cancel'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  // html: https://tailwindui.com/components/application-ui/overlays/modals
};

// <Toast content="Toast Content" success onDismiss={() => setToastShowed(false)} />}
export type ToastProps = BaseProps & {
  success?: boolean;
  error?: boolean;
  icon?: any;
  title?: string;
  content?: any;
  onDismiss?: () => void;
  autoDismiss?: number; // in (ms)
};
export const Toast = ({ className, success, error, title, content, icon, onDismiss, autoDismiss, ...others }: ToastProps) => {
  const svgIcon = icon || (
    <svg className="h-6 w-6 text-teal mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
    </svg>
  );
  const base = `bg-teal-lightest border-t-4 rounded-b text-teal-darkest px-4 py-3 shadow-md my-2`;
  let cn = `${base} border-teal`;
  if (success) {
    cn = `${base} border-green-200`;
  } else if (error) {
    cn = `${base} border-red-200`;
  }
  const timerRef = React.useRef(0);
  React.useEffect(() => {
    if ((autoDismiss || 0) > 0) {
      timerRef.current = setTimeout(() => (onDismiss ? onDismiss() : ''), autoDismiss);
    }
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className={`fixed bottom-4 right-4 w-5/6 md:w-full max-w-sm ${cn} ${className}`} role="alert" {...others}>
      <div className="flex" onClick={onDismiss}>
        {svgIcon}
        <div>
          <p className="font-bold">{title || 'Title'}</p>
          {content || 'Content'}
        </div>
      </div>
    </div>
  );
  // html: https://www.tailwindtoolbox.com/components/alerts
};

// <Field label="Email" type="email" placeholder="john@email.com" />
export type FieldProps = BaseProps & {
  label?: string;
  type?: string;
  placeholder?: string;
  fieldClassName?: string;
  value?: string;
  defaultValue?: string;
  children?: any;
};
export const Field = ({ className, label, type, placeholder, children, defaultValue, value, fieldClassName, ...others }: FieldProps) => {
  return (
    <label className={`block mt-2 ${className}`}>
      <span>{label || 'Label'}</span>
      {children ? (
        <div className={fieldClassName}>{children}</div>
      ) : (
        <input
          type={type}
          className={`form-input mt-1 block w-full p-2 border rounded-md border-gray-300 ${fieldClassName}`}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          {...others}
        />
      )}
    </label>
  );
  // html: https://tailwindcss-custom-forms.netlify.app
};

// <Tooltip content="Email">...</Tooltip>
export const Tooltip = ({ content, className, children }: BaseProps & { content: any; children: any }) => {
  return (
    <div className={`relative inline-flex flex flex-col items-center ${styles.group} ${className}`}>
      {children}
      <div className={`absolute bottom-0 flex flex-col items-center hidden mb-10 ${styles.groupHover}`}>
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap rounded-md bg-black shadow-lg">
          {content}
        </span>
        <div className={`w-3 h-3 -mt-2 bg-black ${styles.rotate45}`}></div>
      </div>
    </div>
  );
  // html: https://codepen.io/robstinson/details/eYZLRdv
};

// <ProgressBar total={100} value={30} />
export const ProgressBar = ({ value, total, valueStyle, totalStyle }:{ value: number, total: number, valueStyle?: CSSProperties, totalStyle?: CSSProperties }) => {
  const pct = value / total * 100;
  return (
    <div className={styles.progressBar} style={{ ...totalStyle }}>
      <div className={styles.progressBar} style={{ width: `${pct}%`, backgroundColor: '#00c300', ...valueStyle }} />
    </div>
  )
}
