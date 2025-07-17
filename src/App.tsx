import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.5 },
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [direction, setDirection] = useState(0);

  const nextPlease = () => {
    setDirection(1);
    setVisible((prev) => (prev % 10) + 1);
  };

  const prevPlease = () => {
    setDirection(-1);
    setVisible((prev) => (prev === 1 ? 10 : prev - 1));
  };

  return (
    <Wrapper>
      <AnimatePresence mode="wait" custom={direction}>
        <Box
          variants={boxVariants}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button>
    </Wrapper>
  );
}

export default App;
