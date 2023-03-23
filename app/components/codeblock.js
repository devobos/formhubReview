import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
function CodeBlock({ code }) {
  return (
    <div className="rounded p-5 bg-gray-300">
      <SyntaxHighlighter
        children={code}
        style={dracula}
        language="html"
      ></SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
