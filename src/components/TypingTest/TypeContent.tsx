import { Card, Input } from "antd";
import { useContext, useEffect, useRef } from "react";
import { ContextValueType, TypingContext } from ".";

const TypeContent = () => {
  const inputRef = useRef();
  const { typingTestData, dispatch } = useContext(
    TypingContext
  ) as ContextValueType;

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleInputChange = (event) => {
    const input = event.target.value[event.target.value.length - 1];
    const currIndex = typingTestData.idx;
    if (currIndex >= typingTestData.text.length) {
      return;
    }
    if (currIndex === typingTestData.text.length - 1) {
      clearInterval(typingTestData.timeInterval);
      dispatch({ type: "STOP_TYPING" });
    }

    if (typingTestData.text[currIndex] === input) {
      dispatch({ type: "TEXT_INPUT", payload: { text: input } });
    }
  };

  return (
    <>
      <Card
        style={{
          maxWidth: 800,
          fontSize: "30px",
          fontWeight: "450",
          backgroundColor: "white",
        }}
      >
        <span style={{ color: "white", backgroundColor: "green" }}>
          {typingTestData.correctText}
        </span>
        <span style={{ color: "black" }}>
          {typingTestData.text.substring(typingTestData.idx)}
        </span>
        <br />
        <br />
        <Input
          value={typingTestData.correctText}
          onChange={handleInputChange}
          placeholder="Start Typing Here..."
          autoCorrect="off"
          ref={inputRef}
          disabled={!typingTestData.isStarted}
        />
      </Card>
    </>
  );
};

export default TypeContent;
