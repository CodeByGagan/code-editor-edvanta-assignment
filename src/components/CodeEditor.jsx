import React, { Fragment, useState, useEffect } from "react";
import "./CodeEditor.css";

const CodeEditor = () => {
  const [code, setCode] = useState(localStorage.getItem("savedCode") || "");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const savedCode = localStorage.getItem("savedCode");
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleSave = () => {
    localStorage.setItem("savedCode", code);
    alert("Code saved successfully!");
  };

  const handleLockUnlock = () => {
    setLocked(!locked);
  };

  const handleTabKey = (event) => {
    if (!locked && event.key === "Tab") {
      event.preventDefault();
      const { selectionStart, selectionEnd } = event.target;
      const newCode = `${code.substring(0, selectionStart)}\t${code.substring(
        selectionEnd
      )}`;
      setCode(newCode);
    }
  };

  return (
    <Fragment>
      <h1 className="center-x ">Basic Code Editor</h1>
      <div className={`code-editor ${locked ? "locked" : ""}`}>
        <textarea
          value={code}
          onChange={(e) => !locked && setCode(e.target.value)}
          onKeyDown={handleTabKey}
          readOnly={locked}
        />
      </div>

      <div className="center-x  btn-grp">
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleLockUnlock}>{locked ? "Unlock" : "Lock"}</button>
      </div>
    </Fragment>
  );
};

export default CodeEditor;
