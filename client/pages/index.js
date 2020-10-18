import React from 'react';

function Home() {
  return (
    <div>
      <h1>Heading</h1>
    </div>
  )
}

export default  Home

// hot-dev-client.js?647e:126 ./pages/index.js
// Anonymous arrow functions cause Fast Refresh to not preserve local component state.
// Please add a name to your function, for example:

// Before
// export default () => <div />;

// After
// const Named = () => <div />;
// export default Named;

// A codemod is available to fix the most common cases: https://nextjs.link/codemod-ndc