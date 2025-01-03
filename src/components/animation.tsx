import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimationExample = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <motion.div
        onClick={() => setClicked(!clicked)}
        initial={{ opacity: 1, x: 0 }}
        animate={{
          opacity: clicked ? 0.5 : 1,
          x: clicked ? 100 : 0,
          backgroundColor: clicked ? 'tomato' : 'blue'
        }}
        transition={{ duration: 0.5 }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'teal',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        Clique-moi
      </motion.div>
    </div>
  );
};

export default AnimationExample