/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize:{
      "h1":[
        "36px",{
          fontWeight:"bold",
          lineHeight:"60px"
        }
      ],
      "h2":[
        "30px",{
          fontWeight:"bold",
          lineHeight:"42px"
        }
      ],
      "h3":[
        "24px",{
          fontWeight:"semibold",
          lineHeight:"36px"
        }
      ],
      "big-title":[
        "18px",{
          fontWeight:"semibold",
          lineHeight:"28px"
        }
      ],
      "title":[
        "16px",{
          fontWeight:"semibold",
          lineHeight:"24px"
        }
      ],
      "caption":[
        "14px",{
          fontWeight:"regular",
          lineHeight:"20px"
        }
      ],
      "big-button":[
        "14px",{
          fontWeight:"semibold",
        }
      ],
      "small-button":[
        "12px",{
          fontWeight:"semibold",
        }
      ],
      "small-text":[
        "12px",{
          fontWeight:"regular"
        }
      ]
    },
    colors:{
      "primary" : "#4E74FA",
      "cyan" : "#12C6FF",
      "yellow" : "#FEAE37",
      "white": "#FFFFFF",
      "dark" : "#242B42",
      "gray":"#7E8CA0",
      "silver":" #E6E9ED",
      "gray-soft"  :" #F6F7FA",
      "red" : " #D93C3C",
      "green" : "#0ab91c",
      
    },
    backgroundImage: {
      'shade1': "linear-gradient(to right, #4E74FA , #7190fb , #839efc , #95acfc , #b8c7fd )",
      'shade2': "linear-gradient(to right, #12C6FF,  #41d1ff ,  #71ddff ,  #89e3ff ,  #b8eeff )",
      'shade3': "linear-gradient(to right, #FEAE37,  #FBB05B ,  #FEC583 ,  #FFD9AC ,  #FFF3E5 )",
    },
    scrollbar: {
      hidden: {
        'scrollbar-width': 'none', /* Firefox */
        '-ms-overflow-style': 'none', /* IE 10+ */
        '&::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari, Edge */
        },
      },
    },
  },
  plugins: [
    import('tailwind-scrollbar-hide'), 
  ],
  },
}