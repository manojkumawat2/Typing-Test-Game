// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Card, Input } from "antd";
import { useContext, useEffect, useRef } from "react";
import { ContextValueType, TypingContext } from ".";

const TypeContent = () => {
  const inputRef = useRef<HTMLElement>(null);
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

    if (event.nativeEvent.inputType === "deleteContentBackward") {
      if (typingTestData.correctIdx !== typingTestData.idx)
        dispatch({
          type: "UPDATE_INCORRECT_TEXT",
          payload: { type: "REMOVE" },
        });
      return;
    }

    if (
      currIndex === typingTestData.text.length - 1 &&
      typingTestData.correctIdx === typingTestData.idx - 1
    ) {
      clearInterval(typingTestData.timeInterval);
      dispatch({ type: "STOP_TYPING" });
    }

    if (
      typingTestData.text[currIndex] === input &&
      typingTestData.correctIdx === typingTestData.idx - 1
    ) {
      dispatch({ type: "TEXT_INPUT", payload: { text: input } });
    } else {
      dispatch({
        type: "UPDATE_INCORRECT_TEXT",
        payload: { type: "ADD" },
      });
    }
  };

  return (
    <>
      <Card
        style={{
          maxWidth: 800,
          fontSize: "30px",
          fontWeight: "300",
          backgroundColor: "white",
          letterSpacing: 1,
        }}
      >
        <span style={{ color: "white", backgroundColor: "green" }}>
          {typingTestData.text.substring(0, typingTestData.correctIdx + 1)}
        </span>
        <span style={{ color: "white", backgroundColor: "red" }}>
          {typingTestData.text.substring(
            typingTestData.correctIdx + 1,
            typingTestData.idx
          )}
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
