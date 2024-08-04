import { Button, Card, Typography } from "antd";
import { useContext } from "react";
import { ContextValueType, TypingContext } from ".";

const StartGame = () => {
  const { typingTestData, dispatch } = useContext(
    TypingContext
  ) as ContextValueType;

  const handleStartGame = () => {
    const interval = setInterval(() => {
      dispatch({ type: "UPDATE_TIME" });
    }, 1000);
    dispatch({ type: "START_TYPING", payload: { interval } });
  };

  const speed = Math.ceil(
    typingTestData.correctText.length / 5 / (typingTestData.time / 60)
  );

  return (
    <Card style={{ textAlign: "center", width: 400 }}>
      <Button
        type="primary"
        onClick={handleStartGame}
        disabled={typingTestData.isStarted}
      >
        Start Typing
      </Button>
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        Time Taken: {typingTestData.time}
      </Typography.Title>
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        Speed: {isNaN(speed) ? 0 : speed} WPM
      </Typography.Title>
    </Card>
  );
};

export default StartGame;
