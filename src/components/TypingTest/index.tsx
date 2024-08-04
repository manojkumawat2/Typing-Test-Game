// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createContext, Dispatch, useEffect, useReducer } from "react";
import TypeContent from "./TypeContent";
import texts from "./texts";
import StartGame from "./StartGame";

interface TypingDataType {
  text: string;
  correctIdx: number;
  time: number;
  timeInterval: number | undefined;
  idx: number;
  isStarted: boolean;
}

interface TypingTestAction {
  type: string;
  payload: { text: string; interval: number; type: string };
}

export interface ContextValueType {
  typingTestData: TypingDataType;
  dispatch: Dispatch<unknown>;
}

const initialTypingData: TypingDataType = {
  text: "",
  correctIdx: -1,
  time: 0,
  idx: 0,
  isStarted: false,
  timeInterval: undefined,
};

const reducer = (state: TypingDataType, action: TypingTestAction) => {
  switch (action.type) {
    case "SET_TEXT": {
      return { ...state, text: action.payload.text };
    }
    case "TEXT_INPUT": {
      return {
        ...state,
        idx: state.idx + 1,
        correctIdx: state.correctIdx + 1,
      };
    }
    case "START_TYPING": {
      return {
        ...state,
        isStarted: true,
        timeInterval: action.payload.interval,
        correctIdx: -1,
        time: 0,
        idx: 0,
      };
    }
    case "STOP_TYPING": {
      return {
        ...state,
        isStarted: false,
      };
    }
    case "UPDATE_TIME": {
      return {
        ...state,
        time: state.time + 1,
      };
    }
    case "UPDATE_INCORRECT_TEXT": {
      let idx = state.idx;
      if (action.payload.type === "ADD") {
        idx += 1;
      } else {
        if (state.correctIdx === idx - 1) return state;
        idx -= 1;
      }
      return {
        ...state,
        idx,
      };
    }
    default: {
      return state;
    }
  }
};

export const TypingContext = createContext({});

const TypingTest = () => {
  const [typingTestData, dispatch] = useReducer(reducer, initialTypingData);

  useEffect(() => {
    const allTexts = texts;
    const randomText =
      allTexts[Math.floor(Math.random() * allTexts.length)].paragraph;

    dispatch({
      type: "SET_TEXT",
      payload: { text: randomText },
    });
  }, []);

  return (
    <TypingContext.Provider value={{ typingTestData, dispatch }}>
      <div className="type-container">
        <StartGame />
        <TypeContent />
      </div>
    </TypingContext.Provider>
  );
};

export default TypingTest;
