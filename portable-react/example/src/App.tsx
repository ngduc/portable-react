import React from 'react';

import { Button, Dropdown, Accordion, Modal, Toast, Field } from 'portable-react';
import 'portable-react/dist/index.css';

const App = () => {
  const [modalShowed, setModalShowed] = React.useState(false);
  const [toastShowed, setToastShowed] = React.useState(false);

  return (
    <div className="p-4">
      <h3>Playground: Button, Dropdown, Accordion, Modal, Toast, Form Field</h3>

      <div className="space-y-4 mt-2">
        <div className="w-1/6">
          <Accordion label="Accordion" openValue={true}>
            <div>Some Content</div>
          </Accordion>
        </div>

        <Button onClick={() => setModalShowed(true)}>Show Modal</Button>

        <Button className="ml-4" onClick={() => setToastShowed(true)}>
          Show Toast
        </Button>

        <Button primary className="ml-4">
          Primary Button
        </Button>

        <Dropdown label="Dropdown">
          <div>Option 1</div>
          <div>Option 2</div>
        </Dropdown>

        {modalShowed && (
          <Modal title="Modal Title" content={<p>Modal Content</p>} onCancel={() => setModalShowed(false)} onConfirm={() => setModalShowed(false)} />
        )}

        {toastShowed && <Toast content="Toast Content" success onDismiss={() => setToastShowed(false)} />}

        <form className="lg:w-1/6 sm:w-full p-4 border bg-gray-100">
          <Field label="Name" defaultValue="John" />
          <Field label="Email" type="email" placeholder="john@email.com" />
          <Field
            label="Favourite Color"
            className="my-2"
            fieldClassName="inline space-x-4 ml-4"
            field={
              <>
                <label>
                  <input type="radio" name="color" value="RED" /> Red
                </label>
                <label>
                  <input type="radio" name="color" value="BLUE" /> Blue
                </label>
              </>
            }
          />
          <Button primary type="submit">
            Submit
          </Button>
          <Button className="ml-2" type="reset">
            Clear
          </Button>
        </form>
      </div>
    </div>
  );
};

export default App;
