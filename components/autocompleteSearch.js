// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// const Auto = ({ data }) => {
//   const [display, setDisplay] = useState(false);
//   const [options, setOptions] = useState([]);
//   const [search, setSearch] = useState("");
//   const [award, setAward] = useState("");
//   const wrapperRef = useRef(null);
//   const dispatch = useDispatch();

// //   useEffect(() => {
// //     window.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       window.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   });

// //   const handleClickOutside = (event) => {
// //     const { current: wrap } = wrapperRef;
// //     if (wrap && !wrap.contains(event.target)) {
// //       setDisplay(false);
// //     }
// //   };
//   const handleChange = (e) => {
//     setSearch(e.target.value);
//   };
//   useEffect(() => {
//     dispatch(awardSearchResult(search));
//   }, [search, award]);

//   const updateSearchValue = (poke, id, value) => {
//     setSearch(poke);
//     setDisplay(false);
//     setAward(id);
//     dispatch(clearForm());
//     dispatch(clearApplication());
//     dispatch(clearCategory());
//     const season = seasons.seasons.filter((season) => season.category === id);
//     // dispatch(
//     //   createApplication(
//     //     { form: value.form, season: season[0].id, category: value.id },
//     //     language
//     //   )
//     // ).then((res) =>
//     //   localStorage.setItem("applicationId", res.data.application.id)
//     // );

//     if (
//       applicationsReducer.userApplications.find(
//         (application) =>
//           application.category === value.id && application.form === value.form
//       )
//     ) {
//       applicationsReducer.userApplications.find(
//         (application) =>
//           application.category === value.id && application.form === value.form
//       )
//         ? router.push(
//             `applicationForms/${
//               applicationsReducer.userApplications.find(
//                 (application) =>
//                   application.category === value.id &&
//                   application.form === value.form
//               ).id
//             }`
//           )
//         : "";
//     } else {
//       dispatch(
//         createApplication(
//           {
//             form: value.form,
//             season: season[0].id,
//             category: value.id,
//           },
//           language
//         )
//       ).then((res) => {
//         console.log(res);
//         if (res.status !== 200) {
//           setAlertMessage({
//             active: true,
//             message: "لا يمكنك  التسجيل باكثر من جائزة من نفس الفئة",
//             type: "dan",
//           });
//           setSameCategoryModal(true);
//         } else {
//           router.push(`applicationForms/${res.data.application.id}`);
//         }
//       });
//     }
//   };
//   const handleClick = () => {
//     setDisplay(!display);
//     setOptions(awards);
//   };

//   return (
//     <div ref={wrapperRef} className="flex-container flex-column pos-rel w-full">
//       <input
//         className={`rounded-3xl w-full border py-1 px-5 outline-none focus:outline-none ${
//           language === "en" ? "" : "text-right"
//         } `}
//         onClick={handleClick}
//         placeholder={`${language === "en" ? `Search...` : `بحث...`}`}
//         value={search}
//         onChange={handleChange}
//         type="search"
//       />
//       {display && (
//         <div className="autoContainer">
//           {options
//             .filter((option) =>
//               option.name.toLowerCase().includes(search.toLowerCase())
//             )
//             .map((value, i) => {
//               return (
//                 <div
//                   onClick={() => updateSearchValue(value.name, value.id, value)}
//                   className="option hover:bg-gray-200 cursor-pointer text-gray-600 font-semibold"
//                   key={i}
//                   tabIndex="0"
//                   dir="rtl"
//                 >
//                   <span className={"text-xs "}> {value.name} </span>
//                 </div>
//               );
//             })}
//         </div>
//       )}
//       <Modal
//         show={sameCategoryModal}
//         close={setSameCategoryModal}
//         title="إخطار!!"
//         body={alertMessage.message}
//         type={alertMessage.type}
//         actionButton={false}
//         actionButtonString="Yes"
//         // closeEvent={setSameCategoryModal}
//         language="ar"
//         closeBottunName="إغلاق"
//       />
//     </div>
//   );
// };

// function autoComplete({ language, awards, categories }) {
//   return (
//     <div className="App">
//       <div className="auto-container">
//         <Auto language={language} awards={awards} categories={categories} />
//       </div>
//     </div>
//   );
// }

// export default autoComplete;
