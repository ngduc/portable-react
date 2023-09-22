import React from 'react';

import { Button, Dropdown, Accordion, Modal, Toast, Field, Tooltip, ProgressBar, SearchInput } from 'portable-react';
import 'portable-react/dist/index.css';

const App = () => {
  const [modalShowed, setModalShowed] = React.useState(false);
  const [toastShowed, setToastShowed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="p-4">
      <h3>Playground: Button, Dropdown, Accordion, Modal, Toast, Form Field, Spinner, Tooltip, ProgressBar, SearchInput and more. Work on responsive / mobile screens.</h3>
      <p>
        Star this on Github ★ <a href="https://github.com/ngduc/portable-react">Back to portable-react</a>
      </p>

      <div className="space-y-4 mt-6">
        <div className="lg:w-1/6">
          <Accordion label="Accordion" openValue={true}>
            <div>Some Content</div>
          </Accordion>
        </div>

        <Tooltip content="Tooltip: Show Modal">
          <Button primary onClick={() => setModalShowed(true)}>
            Show Modal
          </Button>
        </Tooltip>

        <Button className="ml-4" data-id="any-testid" onClick={() => setToastShowed(true)}>
          Show Toast
        </Button>

        <Button className="ml-4" isLoading={isLoading} onClick={() => setIsLoading(true)}>
          Show Spinner
        </Button>

        <Dropdown label="Dropdown">
          <div>Option 1</div>
          <div>Option 2</div>
        </Dropdown>

        {modalShowed && <Modal title="Modal Title" content={<p>Modal Content</p>} confirmLabel="Confirm" onCancel={() => setModalShowed(false)} onConfirm={() => setModalShowed(false)} />}

        {toastShowed && <Toast content="Toast Content" error onDismiss={() => setToastShowed(false)} autoDismiss={2000} />}

        <div className="lg:w-1/6 py-2">
          <SearchInput value={''} placeholder={'Search...'} onSearch={console.log} />
        </div>

        <form
          className="lg:w-1/3 sm:w-full p-4 border bg-gray-100"
          onSubmit={(ev) => {
            ev.preventDefault();
            const formData = new FormData(ev.currentTarget as HTMLFormElement);
            alert(JSON.stringify(Object.fromEntries(formData)));
          }}
        >
          <ProgressBar total={100} value={25} />

          <Field label="Name" name="name" defaultValue="John" autoFocus={true} />
          <Field label="Email*" name="email" type="email" placeholder="john@email.com" required={true} />
          <Field label="Birthday" type="date" name="birthday" placeholder="" />
          <Field label="Favourite Color" name="color" className="my-2" fieldClassName="inline space-x-4 ml-4">
            <label>
              <input type="radio" name="color" value="RED" /> Red
            </label>
            <label>
              <input type="radio" name="color" value="BLUE" /> Blue
            </label>
          </Field>
          <Button primary type="submit">
            Submit
          </Button>
          <Button className="ml-2" type="reset">
            Reset
          </Button>
        </form>
      </div>
    </div>
  );
};

export default App;
