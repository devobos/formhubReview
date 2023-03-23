import React from "react";
import CodeBlock from "./codeblock";
const Implement = ({ url, formid }) => {
  return (
    <>
      <CodeBlock
        code={`<form method="POST" action="http://${url}/api/form/${formid}">
    <input type="text" name="input1"></input>
    <input type="text" name="input2"></input>
    <button type="submit">Button Text</button>
</form>`}
      />

      <p>
        To learn more, have a look at our{" "}
        <a className="text-red-300" href="/docs">
          docs
        </a>
      </p>
    </>
  );
};

export default Implement;
