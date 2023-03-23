import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
function CodeBlock({ code }) {
  return (
    <SyntaxHighlighter
      className="rounded"
      children={code}
      style={dracula}
      language="html"
    ></SyntaxHighlighter>
  );
}

export default CodeBlock;
