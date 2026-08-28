import{j as n}from"./index-D9nRK7hE.js";import{r as a}from"./vendor-react-uYDHyRUA.js";const u=a.memo(function({checked:t,onChange:r,disabled:o=!1,activeColor:s}){const e=s||"#f43f5e";return n.jsx("button",{type:"button",role:"switch","aria-checked":t,onClick:()=>!o&&r(!t),className:`
        relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-[2px]
        transition-all duration-300 ease-out focus:outline-none select-none
        ${t?"":"bg-white/[0.14] hover:bg-white/[0.22]"}
        ${o?"opacity-40 cursor-not-allowed":"cursor-pointer hover:scale-105 active:scale-90"}
      `,style:t?{backgroundColor:e,boxShadow:`0 0 16px ${e}90`}:{},disabled:o,children:n.jsx("span",{className:`
          pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md
          transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${t?"translate-x-4 shadow-[0_2px_8px_rgba(0,0,0,0.35)]":"translate-x-0"}
        `})})});export{u as S};
