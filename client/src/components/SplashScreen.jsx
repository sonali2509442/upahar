// import React, { useEffect } from "react";
// import { motion } from "framer-motion";

// const SplashScreen = ({ onFinish }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onFinish();
//     }, 4000); // show for 4 seconds
//     return () => clearTimeout(timer);
//   }, [onFinish]);

//   // Animation variants
//   const imageVariants = {
//     hidden: (direction) => {
//       switch (direction) {
//         case "topLeft":
//           return { x: -200, y: -200, opacity: 0 };
//         case "topRight":
//           return { x: 200, y: -200, opacity: 0 };
//         case "bottomLeft":
//           return { x: -200, y: 200, opacity: 0 };
//         case "bottomRight":
//           return { x: 200, y: 200, opacity: 0 };
//         default:
//           return { opacity: 0 };
//       }
//     },
//     visible: {
//       x: 0,
//       y: 0,
//       opacity: 1,
//       transition: { duration: 1, type: "spring", stiffness: 100 },
//     },
//   };

//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-rose-100 z-50 overflow-hidden">
//       <div className="relative w-40 h-40 mb-6">
//         {/* Four gift images flying in */}
//         <motion.img
//           src="\src\assets\frontviewimg.png"
//           alt="Upahar"
//           className="absolute w-40 h-40 rounded-full shadow-lg"
//           custom="topLeft"
//           variants={imageVariants}
//           initial="hidden"
//           animate="visible"
//         />
//         <motion.img
//           src="\src\assets\frontviewimg.png"
//           alt="Upahar"
//           className="absolute w-40 h-40 rounded-full shadow-lg"
//           custom="topRight"
//           variants={imageVariants}
//           initial="hidden"
//           animate="visible"
//         />
//         <motion.img
//           src="\src\assets\frontviewimg.png"
//           alt="Upahar"
//           className="absolute w-40 h-40 rounded-full shadow-lg"
//           custom="bottomLeft"
//           variants={imageVariants}
//           initial="hidden"
//           animate="visible"
//         />
//         <motion.img
//           src="\src\assets\frontviewimg.png"
//           alt="Upahar"
//           className="absolute w-40 h-40 rounded-full shadow-lg"
//           custom="bottomRight"
//           variants={imageVariants}
//           initial="hidden"
//           animate="visible"
//         />
//       </div>

//       {/* Fade-in text */}
//       <motion.h1
//         className="text-3xl font-bold text-rose-600 tracking-wide"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 2, duration: 1 }}
//       >
//         Welcome to <span className="text-pink-500">Upahar</span>
//       </motion.h1>
//     </div>
//   );
// };

// export default SplashScreen;
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 via-rose-100 to-pink-200 z-50 overflow-hidden">
      {/* ✨ Floating Sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-pink-300 rounded-full blur-sm"
          initial={{
            x: Math.random() * window.innerWidth - window.innerWidth / 2,
            y: Math.random() * window.innerHeight - window.innerHeight / 2,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: [null, Math.random() * -50],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        />
      ))}

      {/* 🎁 Floating Gift Elements */}
      <motion.img
        src="/images/flobou-removebg-preview.png"
        alt="Bouquet"
        initial={{ x: "-100vw", y: "-100vh", rotate: -45, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
        className="w-60 md:w-72 absolute top-10 left-10 drop-shadow-2xl"
      />

      <motion.img
        src="/images/redg-removebg-preview.png"
        alt="Gift Box"
        initial={{ x: "100vw", y: "-100vh", rotate: 45, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.3,
          type: "spring",
          bounce: 0.4,
        }}
        className="w-60 md:w-72 absolute top-10 right-10 drop-shadow-2xl"
      />

      <motion.img
        src="/images/chocolo-removebg-preview.png"
        alt="Chocolate"
        initial={{ x: "-100vw", y: "100vh", rotate: -30, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.6,
          type: "spring",
          bounce: 0.4,
        }}
        className="w-60 md:w-72 absolute bottom-10 left-10 drop-shadow-2xl"
      />

      <motion.img
        src="/images/envp-removebg-preview.png"
        alt="Greeting Card"
        initial={{ x: "100vw", y: "100vh", rotate: 30, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.9,
          type: "spring",
          bounce: 0.4,
        }}
        className="w-60 md:w-72 absolute bottom-10 right-10 drop-shadow-2xl"
      />

      {/* 🌸 Center Logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.15, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8, type: "spring" }}
        className="relative flex items-center justify-center mt-8"
      >
        <img
          src="/images/gift-box-flowers-close-up.jpg"
          alt="Upahar Logo"
          className="w-52 h-52 md:w-64 md:h-64 rounded-full shadow-2xl ring-4 ring-rose-200"
        />
      </motion.div>

      {/* 💖 Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-[#CD2C58] mt-6 tracking-wide text-center"
      >
        Welcome to{" "}
        <span className="font-[Dancing Script] text-[#F75270] text-5xl md:text-6xl">
          Upahar
        </span>
      </motion.h1>
    </div>
  );
};

export default SplashScreen;
