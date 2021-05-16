# portable-react

Simple React components written in Typescript using Tailwind CSS, all in one index.tsx file ~ 200 lines of code.

- [Live Example](https://portable-react-example.vercel.app/)
- [Live Code](https://stackblitz.com/edit/portable-react-example?file=index.tsx)
- Components: Playground: Button, Dropdown, Accordion, Modal, Toast, Form Field, Spinner, and more. Work on responsive / mobile screens.

### Usage

Just copy [index.tsx](./portable-react/src/index.tsx) file to your project to use it.

Include tailwind.min.css in your index.html using: https://cdnjs.com/libraries/tailwindcss

### Motivation

This is not another component library, rather a set of building blocks, all in one file. So you can jump in quickly, look at a few line of codes, tweak it, or do whatever you want, which is very useful for small projects.

> Oftentimes, when starting a new project, I need to quickly use some basic React components but I don't want to spend time to install, set up, import and RTFM to use a full-fledged Component Library yet. Inspired by PortableApps I used in the past (which you can just copy and use one application file anywhere), I created this collection of simple React components, all in one index.tsx file. You can just copy that file to any React project and start using it, tweak it immediately.

> P/S: I'm aware of some opinions about the downside of copying code manually, best practices, etc. This is just an experiment for my pet projects. I don't recommend this to be used in any big project. 

### Using npm

For those who want to use npm, install it by running: npm install portable-react --save

### Development

- Open the "portable-react" directory, run: yarn start.
- Open the "example" directory (CRA project), run: yarn start.