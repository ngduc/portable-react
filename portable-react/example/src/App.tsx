import React from 'react'

import { Button, Dropdown, Accordion, Modal } from 'portable-react'
import 'portable-react/dist/index.css'

const App = () => {
  const [modalShowed, setModalShowed] = React.useState(false)

  return (
    <div className='p-4'>
      <h3>Playground: Accordion, Button, Modal, Dropdown</h3>

      <div className='space-y-4 mt-2'>
        <div className='w-1/6'>
          <Accordion label='Accordion' openValue={true}>
            <div>Some Content</div>
          </Accordion>
        </div>

        <Button onClick={() => setModalShowed(true)}>Show Modal</Button>

        <Button primary className="ml-4">Primary Button</Button>

        <Dropdown label='Dropdown'>
          <div>Option 1</div>
          <div>Option 2</div>
        </Dropdown>

        {modalShowed && (
          <Modal
            title='Modal Title'
            content={<p>Modal Content</p>}
            onCancel={() => setModalShowed(false)}
            onConfirm={() => setModalShowed(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App
